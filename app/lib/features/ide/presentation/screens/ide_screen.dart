import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/auth_provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../../../../core/theme/app_colors.dart';
import '../../../../core/network/graphql_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';
import '../../providers/editor_theme_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../../../profile/presentation/screens/premium_screen.dart';
import '../../../../core/services/local_notifications_service.dart';

class IdeScreen extends ConsumerStatefulWidget {
  final String lessonId;
  final String language;
  final String title;
  final String initialCode;
  final String instructions;
  final String? expectedOutput;
  final String? theory;
  final int? rewardXp;
  final int? rewardCrystals;
  final List<String>? quizOptions;
  final int? correctOptionIndex;

  const IdeScreen({
    super.key,
    required this.lessonId,
    required this.language,
    required this.title,
    required this.initialCode,
    required this.instructions,
    this.expectedOutput,
    this.theory,
    this.rewardXp,
    this.rewardCrystals,
    this.quizOptions,
    this.correctOptionIndex,
  });

  @override
  ConsumerState<IdeScreen> createState() => _IdeScreenState();
}

class _IdeScreenState extends ConsumerState<IdeScreen> {
  late TextEditingController _codeController;
  
  bool _isRunning = false;
  String _terminalOutput = 'Esperando ejecución...\n';
  List<Map<String, String>> _memory = [];
  String? _mentorHint;
  
  late IO.Socket socket;

  String _lastText = '';

  @override
  void initState() {
    super.initState();
    _codeController = TextEditingController(text: widget.initialCode);
    _lastText = widget.initialCode;
    socket = IO.io(dotenv.env['WS_URL'] ?? 'http://10.0.2.2:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
    });

    socket.onConnect((_) {
      print('Socket connected');
    });

    socket.on('executionUpdate', (data) {
      if (mounted) {
        setState(() {
          _terminalOutput = data['output'] ?? 'Ejecutando...';
        });
      }
    });

    socket.on('executionResult', (data) async {
      if (mounted) {
        final status = data['status'];
        final stdout = data['stdout'] ?? '';
        final stderr = data['stderr'] ?? '';
        final memoryDump = data['memoryDump'];

        setState(() {
          _terminalOutput = status == 'SUCCESS' ? stdout : stderr;
          if (status == 'SUCCESS') {
            _mentorHint = null;
            
            // Check expected output if it exists
            if (widget.expectedOutput != null) {
              final isMatch = stdout.trim() == widget.expectedOutput!.trim();
              if (!isMatch) {
                _terminalOutput += '\n\n[CodeNexus] Resultado incorrecto.\nEsperado: ${widget.expectedOutput!.trim()}\nObtenido: ${stdout.trim()}';
              } else {
                _terminalOutput += '\n\n[CodeNexus] ¡Lección completada con éxito!';
                if (widget.rewardXp != null) {
                  _terminalOutput += ' +${widget.rewardXp} XP';
                  _addRewards(widget.rewardXp!, widget.rewardCrystals ?? 0);
                }
                _markMissionCompleted();
              }
            } else {
                _terminalOutput += '\n\n[CodeNexus] ¡Código ejecutado con éxito!';
            }
          }
          if (memoryDump != null && memoryDump.isNotEmpty) {
            try {
              final List<dynamic> parsed = jsonDecode(memoryDump);
              _memory = parsed.map((e) => {
                'name': e['name'].toString(),
                'type': e['type'].toString(),
                'value': e['value'].toString(),
              }).toList();
            } catch (_) { }
          }
          _isRunning = false;
        });

        if (status == 'ERROR') {
          _fetchMentorHint(stderr);
        }
      }
    });

    socket.on('executionError', (data) {
      if (mounted) {
        setState(() {
          _terminalOutput = 'Error: ${data['message']}';
          _isRunning = false;
        });
      }
    });
  }



  @override
  void dispose() {
    _codeController.dispose();
    socket.dispose();
    super.dispose();
  }

  Future<void> _fetchMentorHint(String errorMessage) async {
    final client = ref.read(graphqlClientProvider);
    final mentorQuery = r'''
      query GetMentorHint($code: String!, $errorMessage: String!) {
        getMentorHint(code: $code, errorMessage: $errorMessage)
      }
    ''';
    try {
      final mentorResult = await client.query(QueryOptions(
        document: gql(mentorQuery),
        variables: {
          'code': _codeController.text,
          'errorMessage': errorMessage,
        },
      ));
      if (!mentorResult.hasException && mounted) {
        setState(() {
          _mentorHint = mentorResult.data?['getMentorHint'];
        });
      }
    } catch (e) {}
  }

  Future<void> _fetchProMentorAnalysis() async {
    final userId = ref.read(authUserIdProvider);
    final profileData = ref.read(gamificationProfileProvider(userId)).value;
    final isPremium = profileData?['user']?['plan'] == 'PREMIUM';

    if (!isPremium) {
      Navigator.push(context, MaterialPageRoute(builder: (context) => PremiumScreen()));
      return;
    }

    setState(() {
      _mentorHint = '🤖 Analizando profundamente...';
    });

    final client = ref.read(graphqlClientProvider);
    const mentorQuery = r'''
      query GetProMentorAnalysis($userId: String!, $code: String!, $task: String!, $errorMessage: String!) {
        getProMentorAnalysis(userId: $userId, code: $code, task: $task, errorMessage: $errorMessage)
      }
    ''';
    try {
      final mentorResult = await client.query(QueryOptions(
        document: gql(mentorQuery),
        variables: {
          'userId': userId,
          'code': _codeController.text,
          'task': widget.title,
          'errorMessage': _terminalOutput,
        },
      ));
      if (!mentorResult.hasException && mounted) {
        setState(() {
          _mentorHint = mentorResult.data?['getProMentorAnalysis'];
        });
      }
    } catch (e) {}
  }

  Future<void> _markMissionCompleted() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final completed = prefs.getStringList('completed_missions') ?? [];
      final key = widget.lessonId == 'sandbox_mission' ? widget.title : widget.lessonId;
      if (!completed.contains(key)) {
        completed.add(key);
        await prefs.setStringList('completed_missions', completed);
      }
    } catch (_) {}
  }

  Future<void> _addRewards(int xp, int crystals) async {
    final client = ref.read(graphqlClientProvider);
      try {
        if (xp > 0) {
          final addXpMutation = r'''
            mutation AddXp($userId: String!, $xp: Int!) {
              addXp(userId: $userId, xp: $xp) {
                xp
              }
            }
          ''';
          await client.mutate(MutationOptions(
            document: gql(addXpMutation),
            variables: {'userId': ref.read(authUserIdProvider), 'xp': xp},
          ));
          
          // Programar notificación de recordatorio para 24h después de completar la lección
          await LocalNotificationsService().scheduleDailyPracticeReminder();
        }
      
      if (crystals > 0) {
        final addCrystalsMutation = r'''
          mutation AddCrystals($userId: String!, $crystals: Int!) {
            addCrystals(userId: $userId, crystals: $crystals) {
              crystals
            }
          }
        ''';
        await client.mutate(MutationOptions(
          document: gql(addCrystalsMutation),
          variables: {'userId': ref.read(authUserIdProvider), 'crystals': crystals},
        ));
      }
      
      ref.invalidate(gamificationProfileProvider(ref.read(authUserIdProvider)));
    } catch (_) {}
  }

  void _runCode() {
    setState(() {
      _isRunning = true;
      _terminalOutput = 'Conectando para ejecutar...';
      _memory = [];
    });

    socket.emit('executeCode', {
      'code': _codeController.text,
      'language': widget.language,
      'lessonId': widget.lessonId,
      'userId': ref.read(authUserIdProvider),
      'expectedOutput': widget.expectedOutput,
    });
  }

  void _submitQuizAnswer(int index) async {
    if (widget.correctOptionIndex == null) return;
    
    if (index == widget.correctOptionIndex) {
      bool alreadyCompleted = false;
      final prefs = await SharedPreferences.getInstance();
      final completed = prefs.getStringList('completed_missions') ?? [];
      final key = widget.lessonId == 'sandbox_mission' ? widget.title : widget.lessonId;
      alreadyCompleted = completed.contains(key);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              alreadyCompleted 
                ? '¡Respuesta correcta! (Ya completada)'
                : '¡Respuesta correcta! Misión completada.',
              style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold),
            ),
            backgroundColor: Colors.green,
            duration: const Duration(seconds: 3),
          ),
        );
      }

      if (!alreadyCompleted) {
        if (widget.rewardXp != null || widget.rewardCrystals != null) {
          _addRewards(widget.rewardXp ?? 0, widget.rewardCrystals ?? 0);
        }
        _markMissionCompleted();
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Respuesta incorrecta. Inténtalo de nuevo.', style: GoogleFonts.inter(color: Colors.white)),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(context),
      body: SafeArea(
        bottom: true,
        child: LayoutBuilder(
        builder: (context, constraints) {
          final isDesktop = constraints.maxWidth > 800;
          if (widget.quizOptions != null) {
             return _buildCodeEditor();
          }

          if (isDesktop) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(flex: 3, child: _buildCodeEditor()),
                Container(width: 1, color: AppColors.surfaceHighlight),
                Expanded(flex: 2, child: _buildVisualDebugger()),
              ],
            );
          } else {
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(
                    height: widget.quizOptions != null ? 600 : 350,
                    child: _buildCodeEditor(),
                  ),
                  Container(height: 1, color: AppColors.surfaceHighlight),
                  _buildVisualDebuggerMobile(),
                  const SizedBox(height: 40),
                ],
              ),
            );
          }
        },
      ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: const Icon(Icons.arrow_back),
        onPressed: () => context.pop(),
      ),
      title: Row(
        children: [
          const Icon(Icons.code, color: AppColors.primary),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              widget.title,
              style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
      actions: [
        if (widget.theory != null && widget.theory!.isNotEmpty)
          IconButton(
            onPressed: () {
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  backgroundColor: AppColors.surface,
                  title: Text('Teoría / Resumen', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.primary)),
                  content: SingleChildScrollView(
                    padding: const EdgeInsets.only(bottom: 120.0),
                    child: Text(widget.theory!, style: GoogleFonts.inter(color: AppColors.textPrimary)),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context), 
                      child: const Text('Entendido', style: TextStyle(color: AppColors.accent))
                    ),
                  ],
                ),
              );
            },
            icon: const Icon(Icons.menu_book, color: AppColors.primary),
            tooltip: 'Ver Teoría',
          ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
          child: widget.quizOptions != null
            ? const SizedBox()
            : _isRunning 
              ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.secondary))
              : IconButton(
                  onPressed: _runCode,
                  icon: const Icon(Icons.play_arrow),
                  color: AppColors.background,
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.secondary,
                  ),
                  tooltip: 'Ejecutar',
                ),
        )
      ],
    );
  }

  Widget _buildCodeEditor() {
    final themeData = ref.watch(editorThemeDataProvider);
    return Container(
      color: themeData.background,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header del editor con las instrucciones
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: themeData.surface,
              border: Border(bottom: BorderSide(color: themeData.surfaceHighlight)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.description, color: AppColors.textSecondary, size: 16),
                    const SizedBox(width: 8),
                    Text(
                      'Instrucciones',
                      style: GoogleFonts.inter(
                        color: AppColors.textSecondary,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  widget.instructions.isNotEmpty ? widget.instructions : 'Escribe tu código para resolver el ejercicio.',
                  style: GoogleFonts.inter(
                    color: AppColors.textPrimary,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          // Área de código
          Expanded(
            flex: widget.quizOptions != null ? 1 : 2,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: TextField(
                controller: _codeController,
                maxLines: null,
                expands: true,
                readOnly: widget.quizOptions != null,
                style: GoogleFonts.jetBrainsMono(
                  color: themeData.textPrimary,
                  fontSize: 14,
                  height: 1.5,
                ),
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Escribe tu código aquí...',
                  hintStyle: TextStyle(color: themeData.textPrimary.withOpacity(0.5)),
                ),
                inputFormatters: [AutoIndentFormatter()],
              ),
            ),
          ),
          if (widget.quizOptions != null)
            Expanded(
              flex: 2,
              child: Container(
                color: themeData.surface,
                padding: const EdgeInsets.all(16),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Selecciona la respuesta correcta:', style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),
                      ...widget.quizOptions!.asMap().entries.map((entry) {
                        final index = entry.key;
                        final option = entry.value;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 8.0),
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.background,
                              foregroundColor: AppColors.textPrimary,
                              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                                side: const BorderSide(color: AppColors.surfaceHighlight),
                              ),
                              alignment: Alignment.centerLeft,
                            ),
                            onPressed: () => _submitQuizAnswer(index),
                            child: Text(option, style: GoogleFonts.inter(fontSize: 14)),
                          ),
                        );
                      }).toList(),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildVisualDebugger() {
    return Container(
      color: AppColors.surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildDebuggerHeader(),
          Expanded(
            flex: 3,
            child: _buildMemoryBlock('Memoria (Variables)', _memory.isNotEmpty ? _memory : [{'name': '-', 'value': '-', 'type': '-'}]),
          ),
          Container(height: 1, color: AppColors.surfaceHighlight),
          if (_mentorHint != null) _buildMentorCard(),
          Expanded(
            flex: 2,
            child: _buildTerminalOutput(_terminalOutput),
          ),
        ],
      ),
    );
  }

  Widget _buildVisualDebuggerMobile() {
    return Container(
      color: AppColors.surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildDebuggerHeader(),
          _buildMemoryBlockMobile('Memoria', _memory.isNotEmpty ? _memory : [{'name': '-', 'value': '-', 'type': '-'}]),
          Container(height: 1, color: AppColors.surfaceHighlight),
          if (_mentorHint != null) _buildMentorCard(),
          _buildTerminalOutputMobile(_terminalOutput),
        ],
      ),
    );
  }

  Widget _buildDebuggerHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: const BoxDecoration(
        color: AppColors.surfaceHighlight,
        border: Border(bottom: BorderSide(color: AppColors.background, width: 2)),
      ),
      child: Row(
        children: [
          const Icon(Icons.memory, color: AppColors.accent, size: 20),
          const SizedBox(width: 8),
          Text(
            'Visual Debugger',
            style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary),
          ),
        ],
      ),
    );
  }

  Widget _buildMemoryBlock(String title, List<Map<String, String>> variables) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 12, bottom: 8),
          child: Text(title, style: GoogleFonts.inter(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
        ),
        Expanded(
          child: Container(
            margin: const EdgeInsets.only(left: 16, right: 16, bottom: 12),
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: AppColors.surfaceHighlight),
            ),
            child: ListView.separated(
              padding: EdgeInsets.zero,
              itemCount: variables.length,
              separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.surfaceHighlight),
              itemBuilder: (context, index) {
                final v = variables[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Row(
                    children: [
                      Text(v['name']!, style: GoogleFonts.jetBrainsMono(color: AppColors.primary)),
                      const Text(' : ', style: TextStyle(color: AppColors.textSecondary)),
                      Text(v['type']!, style: GoogleFonts.jetBrainsMono(color: AppColors.accent, fontSize: 12)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          v['value']!,
                          style: GoogleFonts.jetBrainsMono(color: AppColors.secondary, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTerminalOutput(String output) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 12, bottom: 8),
          child: Text('Terminal Output', style: GoogleFonts.inter(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
        ),
        Expanded(
          child: Container(
            width: double.infinity,
            margin: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.black,
              borderRadius: BorderRadius.circular(8),
            ),
            child: SingleChildScrollView(
              child: Text(
                output,
                style: GoogleFonts.jetBrainsMono(color: AppColors.textPrimary, fontSize: 13),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMemoryBlockMobile(String title, List<Map<String, String>> variables) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 12, bottom: 8),
          child: Text(title, style: GoogleFonts.inter(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
        ),
        Container(
          margin: const EdgeInsets.only(left: 16, right: 16, bottom: 12),
          decoration: BoxDecoration(
            color: AppColors.background,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: AppColors.surfaceHighlight),
          ),
          child: ListView.separated(
            padding: EdgeInsets.zero,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: variables.length,
            separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.surfaceHighlight),
            itemBuilder: (context, index) {
              final v = variables[index];
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    Text(v['name']!, style: GoogleFonts.jetBrainsMono(color: AppColors.primary)),
                    const Text(' : ', style: TextStyle(color: AppColors.textSecondary)),
                    Text(v['type']!, style: GoogleFonts.jetBrainsMono(color: AppColors.accent, fontSize: 12)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        v['value']!,
                        style: GoogleFonts.jetBrainsMono(color: AppColors.secondary, fontWeight: FontWeight.bold),
                        textAlign: TextAlign.right,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildTerminalOutputMobile(String output) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 8, bottom: 8),
          child: Text('Terminal Output', style: GoogleFonts.inter(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
        ),
        Container(
          width: double.infinity,
          constraints: const BoxConstraints(minHeight: 150),
          margin: const EdgeInsets.only(left: 16, right: 16, bottom: 20),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            output,
            style: GoogleFonts.jetBrainsMono(color: AppColors.textPrimary, fontSize: 13),
          ),
        ),
      ],
    );
  }

  Widget _buildMentorCard() {
    return Container(
      margin: const EdgeInsets.all(12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceHighlight.withOpacity(0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.accent.withOpacity(0.3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.accent.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.smart_toy, color: AppColors.accent, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Nexus Mentor (IA)',
                  style: GoogleFonts.inter(
                    color: AppColors.accent,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 4),
                  Text(
                    _mentorHint!,
                    style: GoogleFonts.firaCode(
                      color: AppColors.textPrimary,
                      fontSize: 13,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: _fetchProMentorAnalysis,
                    icon: const Icon(Icons.psychology, size: 16, color: Colors.black),
                    label: const Text('Análisis Profundo (PRO)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black, fontSize: 12)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.amber,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      minimumSize: Size.zero,
                    ),
                  ),
                ],
              ),
          ),
          GestureDetector(
            onTap: () => setState(() => _mentorHint = null),
            child: const Icon(Icons.close, color: AppColors.textSecondary, size: 18),
          ),
        ],
      ),
    );
  }
}

class AutoIndentFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    if (newValue.text.length == oldValue.text.length + 1) {
      final cursorOffset = newValue.selection.baseOffset;
      if (cursorOffset > 0 && newValue.text[cursorOffset - 1] == '\n') {
        final beforeNewline = newValue.text.substring(0, cursorOffset - 1);
        final lines = beforeNewline.split('\n');
        final lastLine = lines.isNotEmpty ? lines.last : '';
        
        String indent = '';
        for (int i = 0; i < lastLine.length; i++) {
          if (lastLine[i] == ' ' || lastLine[i] == '\t') {
            indent += lastLine[i];
          } else {
            break;
          }
        }
        
        final trimmed = lastLine.trim();
        if (trimmed.endsWith(':') || trimmed.endsWith('{')) {
          indent += '    ';
        }
        
        if (indent.isNotEmpty) {
          final newText = newValue.text.substring(0, cursorOffset) + indent + newValue.text.substring(cursorOffset);
          return TextEditingValue(
            text: newText,
            selection: TextSelection.collapsed(offset: cursorOffset + indent.length),
          );
        }
      }
    }
    return newValue;
  }
}
