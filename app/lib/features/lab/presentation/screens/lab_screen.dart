import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/auth_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/providers/language_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';
import '../../data/lab_missions.dart';
import '../../../ide/providers/editor_theme_provider.dart';
import '../../../profile/presentation/screens/physical_lab_screen.dart';

class LabScreen extends ConsumerStatefulWidget {
  const LabScreen({super.key});

  @override
  ConsumerState<LabScreen> createState() => _LabScreenState();
}

class _LabScreenState extends ConsumerState<LabScreen> {
  String _selectedMode = 'sandbox'; // 'sandbox', 'missions', 'physical'
  
  final TextEditingController _codeController = TextEditingController(
    text: '# Bienvenido al Laboratorio\n# Experimenta libremente aquí\n\ndef saludar(nombre):\n    return f"¡Hola {nombre} desde el lab!"\n\nprint(saludar("Nexus"))'
  );
  
  bool _isRunning = false;
  String _terminalOutput = 'Esperando ejecución...\n';
  List<Map<String, String>> _memory = [];
  List<String> _completedMissions = [];
  
  late IO.Socket socket;

  String _lastText = '';

  @override
  void initState() {
    super.initState();
    _loadCompletedMissions();
    
    // Conectar a Socket.IO
    socket = IO.io(dotenv.env['WS_URL'] ?? 'http://10.0.2.2:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
    });

    socket.on('executionUpdate', (data) {
      if (mounted) setState(() => _terminalOutput = data['output'] ?? 'Ejecutando...');
    });

    socket.on('executionResult', (data) {
      if (mounted) {
        final status = data['status'];
        final stdout = data['stdout'] ?? '';
        final stderr = data['stderr'] ?? '';
        final memoryDump = data['memoryDump'];

        setState(() {
          _terminalOutput = status == 'SUCCESS' ? stdout : stderr;
          if (memoryDump != null && memoryDump.isNotEmpty) {
            try {
              final List<dynamic> parsed = jsonDecode(memoryDump);
              _memory = parsed.map((e) => {
                'name': e['name'].toString(),
                'type': e['type'].toString(),
                'value': e['value'].toString(),
              }).toList();
            } catch (_) {}
          }
          _isRunning = false;
        });
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

  Future<void> _loadCompletedMissions() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (mounted) {
        setState(() {
          _completedMissions = prefs.getStringList('completed_missions') ?? [];
        });
      }
    } catch (_) {}
  }

  @override
  void dispose() {
    socket.dispose();
    super.dispose();
  }

  void _runCode() {
    setState(() {
      _isRunning = true;
      _terminalOutput = 'Conectando para ejecutar...';
      _memory = [];
    });

    socket.emit('executeCode', {
      'code': _codeController.text,
      'language': ref.read(languageProvider),
      'lessonId': 'sandbox',
      'userId': ref.read(authUserIdProvider)
    });
    
    // Invalidar perfil para actualizar cristales tras ejecución
    ref.invalidate(gamificationProfileProvider(ref.read(authUserIdProvider)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Laboratorio', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Toggle Modes
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedMode = 'sandbox'),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: _selectedMode == 'sandbox' ? AppColors.primary.withOpacity(0.2) : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: _selectedMode == 'sandbox' ? AppColors.primary : AppColors.textSecondary.withOpacity(0.2)),
                      ),
                      alignment: Alignment.center,
                      child: Text('Modo Libre', style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 12, color: _selectedMode == 'sandbox' ? AppColors.primary : AppColors.textSecondary)),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: GestureDetector(
                    onTap: () {
                      _loadCompletedMissions();
                      setState(() => _selectedMode = 'missions');
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: _selectedMode == 'missions' ? AppColors.accent.withOpacity(0.2) : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: _selectedMode == 'missions' ? AppColors.accent : AppColors.textSecondary.withOpacity(0.2)),
                      ),
                      alignment: Alignment.center,
                      child: Text('Misiones', style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 12, color: _selectedMode == 'missions' ? AppColors.accent : AppColors.textSecondary)),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          Expanded(
            child: _selectedMode == 'sandbox' 
                ? _buildSandboxContent() 
                : _buildMissions(context),
          ),
        ],
      ),
    );
  }

  Widget _buildSandboxContent() {
    final globalLang = ref.watch(languageProvider);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: globalLang,
                    icon: const Icon(Icons.arrow_drop_down, color: AppColors.primary),
                    dropdownColor: AppColors.surface,
                    style: GoogleFonts.inter(
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        ref.read(languageProvider.notifier).setLanguage(newValue);
                        setState(() {
                          switch (newValue) {
                            case 'python':
                              _codeController.text = '# Python Sandbox\nprint("Hola Sandbox!")';
                              break;
                            case 'javascript':
                            case 'typescript':
                              _codeController.text = '// JavaScript/TypeScript Sandbox\nconsole.log("Hola Sandbox!");';
                              break;
                            case 'java':
                              _codeController.text = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola Sandbox!");\n    }\n}';
                              break;
                            case 'cpp':
                              _codeController.text = '#include <iostream>\n\nint main() {\n    std::cout << "Hola Sandbox!" << std::endl;\n    return 0;\n}';
                              break;
                            case 'rust':
                              _codeController.text = 'fn main() {\n    println!("Hola Sandbox!");\n}';
                              break;
                            case 'sql':
                              _codeController.text = '-- Sandbox SQL (Pagila DB)\nSELECT * FROM actor LIMIT 5;';
                              break;
                            default:
                              _codeController.text = '// Code Sandbox\n';
                          }
                        });
                      }
                    },
                    items: const [
                      DropdownMenuItem(value: 'python', child: Text('Python')),
                      DropdownMenuItem(value: 'javascript', child: Text('JS')),
                      DropdownMenuItem(value: 'typescript', child: Text('TS')),
                      DropdownMenuItem(value: 'java', child: Text('Java')),
                      DropdownMenuItem(value: 'cpp', child: Text('C++')),
                      DropdownMenuItem(value: 'rust', child: Text('Rust')),
                      DropdownMenuItem(value: 'sql', child: Text('SQL')),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: _isRunning ? null : _runCode,
                  icon: _isRunning 
                    ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.background))
                    : const Icon(Icons.play_arrow),
                  label: Text(_isRunning ? 'Ejecutando...' : 'Ejecutar'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.secondary,
                    foregroundColor: AppColors.background,
                  ),
                )
              ],
            ),
          ),
          Expanded(
            child: LayoutBuilder(
        builder: (context, constraints) {
          final isDesktop = constraints.maxWidth > 800;
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
                  SizedBox(height: 350, child: _buildCodeEditor()),
                  Container(height: 1, color: AppColors.surfaceHighlight),
                  _buildVisualDebuggerMobile(),
                  const SizedBox(height: 80),
                ],
              ),
            );
          }
        },
      ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(context),
    );
  }

  Widget _buildCodeEditor() {
    final themeData = ref.watch(editorThemeDataProvider);
    return Container(
      color: themeData.background,
      child: TextField(
        controller: _codeController,
        maxLines: null,
        style: GoogleFonts.firaCode(
          color: themeData.textPrimary,
          fontSize: 14,
          height: 1.5,
        ),
        decoration: InputDecoration(
          border: InputBorder.none,
          contentPadding: const EdgeInsets.all(16),
          hintText: 'Escribe tu código aquí...',
          hintStyle: TextStyle(color: themeData.textPrimary.withOpacity(0.5)),
        ),
        inputFormatters: [AutoIndentFormatter()],
      ),
    );
  }

  Widget _buildVisualDebugger() {
    return Container(
      color: AppColors.surface,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            color: AppColors.surfaceHighlight.withOpacity(0.5),
            child: Row(
              children: [
                const Icon(Icons.memory, color: AppColors.primary, size: 20),
                const SizedBox(width: 8),
                Text('Memoria del Lab', style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Expanded(
            child: _memory.isEmpty 
              ? Center(child: Text('Sin datos en memoria.', style: GoogleFonts.inter(color: AppColors.textSecondary)))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _memory.length,
                  itemBuilder: (context, index) {
                    final variable = _memory[index];
                    return Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.surfaceHighlight),
                      ),
                      child: Row(
                        children: [
                          Text(variable['name']!, style: GoogleFonts.firaCode(color: AppColors.primary, fontWeight: FontWeight.bold)),
                          const SizedBox(width: 8),
                          Text(':', style: GoogleFonts.firaCode(color: AppColors.textSecondary)),
                          const SizedBox(width: 8),
                          Expanded(child: Text(variable['value']!, style: GoogleFonts.firaCode(color: AppColors.secondary))),
                        ],
                      ),
                    );
                  },
                ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            color: AppColors.background,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    const Icon(Icons.terminal, color: AppColors.textSecondary, size: 16),
                    const SizedBox(width: 8),
                    Text('OUTPUT', style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppColors.surfaceHighlight),
                  ),
                  child: Text(
                    _terminalOutput,
                    style: GoogleFonts.firaCode(color: AppColors.textPrimary, fontSize: 13),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeaderBadge(IconData icon, Color color, String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 18),
          const SizedBox(width: 4),
          Text(
            value,
            style: GoogleFonts.inter(
              color: color,
              fontWeight: FontWeight.bold,
              fontSize: 14,
            ),
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
          Container(
            padding: const EdgeInsets.all(8),
            color: AppColors.background,
            child: Row(
              children: [
                const Icon(Icons.terminal, color: AppColors.textSecondary, size: 16),
                const SizedBox(width: 8),
                Text('OUTPUT', style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 12, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          Container(
            constraints: const BoxConstraints(minHeight: 150),
            padding: const EdgeInsets.all(12),
            color: Colors.black.withOpacity(0.3),
            child: Text(
              _terminalOutput,
              style: GoogleFonts.firaCode(color: AppColors.textPrimary, fontSize: 13),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: AppColors.background,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
      currentIndex: 1,
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 0) context.go('/');
        if (index == 2) context.go('/store');
        if (index == 3) context.go('/social');
        if (index == 4) context.go('/profile');
      },
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Ruta'),
        BottomNavigationBarItem(icon: Icon(Icons.science), label: 'Lab'),
        BottomNavigationBarItem(icon: Icon(Icons.store), label: 'Tienda'),
        BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Social'),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Perfil'),
      ],
    );
  }

  Widget _buildMissions(BuildContext context) {
    final globalLang = ref.watch(languageProvider);
    final profileAsync = ref.watch(gamificationProfileProvider(ref.watch(authUserIdProvider)));
    final profile = profileAsync.value;
    final completedLessons = (profile?['completedLessons'] as List?)?.length ?? 0;

    final filteredMissions = allLabMissions.where((m) => m['language'] == globalLang).toList();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
            child: Text(
              'Misiones disponibles para ${globalLang.toUpperCase()}',
              style: GoogleFonts.inter(color: AppColors.textPrimary, fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(24.0),
              itemCount: filteredMissions.length,
              itemBuilder: (context, index) {
                final mission = filteredMissions[index];
                final reqLessons = mission['reqLessons'] as int;
                final isLocked = completedLessons < reqLessons;
                
                Color diffColor = Colors.green;
                if (mission['difficulty'] == 'Intermedio') diffColor = AppColors.warning;
                if (mission['difficulty'] == 'Avanzado') diffColor = AppColors.error;

                return Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: isLocked 
                          ? [AppColors.surface, AppColors.surface]
                          : [AppColors.surfaceHighlight.withValues(alpha: 0.1), AppColors.surface],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: isLocked ? AppColors.surfaceHighlight : AppColors.accent.withValues(alpha: 0.5)),
                    boxShadow: isLocked ? null : [
                      BoxShadow(color: AppColors.accent.withValues(alpha: 0.1), blurRadius: 10, spreadRadius: 2)
                    ]
                  ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: diffColor.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: diffColor.withValues(alpha: 0.5)),
                          ),
                          child: Text(mission['difficulty'] as String, style: GoogleFonts.inter(fontSize: 12, color: diffColor, fontWeight: FontWeight.bold)),
                        ),
                        if (_completedMissions.contains(mission['title']))
                          Padding(
                            padding: const EdgeInsets.only(left: 8.0),
                            child: Icon(Icons.check_circle, color: Colors.green, size: 20),
                          )
                      ],
                    ),
                    if (isLocked)
                      const Icon(Icons.lock, color: AppColors.textSecondary, size: 20)
                  ],
                ),
                const SizedBox(height: 12),
                Text(mission['title'] as String, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold, color: isLocked ? AppColors.textSecondary : AppColors.textPrimary)),
                const SizedBox(height: 8),
                Text(isLocked ? 'Requiere haber completado $reqLessons lecciones.' : mission['desc'] as String, style: GoogleFonts.inter(color: AppColors.textSecondary, height: 1.5)),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 16),
                        const SizedBox(width: 4),
                        Text('+${mission['rewardXp']} XP', style: GoogleFonts.inter(color: Colors.amber, fontWeight: FontWeight.bold)),
                        const SizedBox(width: 12),
                        const Icon(Icons.diamond, color: Colors.lightBlueAccent, size: 16),
                        const SizedBox(width: 4),
                        Text('+${mission['rewardCrystals']}', style: GoogleFonts.inter(color: Colors.lightBlueAccent, fontWeight: FontWeight.bold)),
                      ],
                    ),
                    ElevatedButton(
                      onPressed: isLocked ? null : () async {
                        await context.push(
                          '/ide?lessonId=sandbox_mission&language=${mission['language'].toString().toLowerCase()}',
                          extra: {
                            'title': mission['title'],
                            'initialCode': mission['initialCode'],
                            'instructions': mission['desc'],
                            'expectedOutput': mission['expectedOutput'],
                            'rewardXp': mission['rewardXp'],
                            'rewardCrystals': mission['rewardCrystals'],
                            'quizOptions': mission['quizOptions'],
                            'correctOptionIndex': mission['correctOptionIndex'],
                          },
                        );
                        _loadCompletedMissions();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.accent,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: Text(_completedMissions.contains(mission['title']) ? 'Repetir' : 'Iniciar'),
                    )
                  ],
                )
              ],
            ),
          );
        },
      ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(context),
    );
  }

  Widget _buildPhysicalLab() {
    final userId = ref.watch(authUserIdProvider);
    final profileAsync = ref.watch(gamificationProfileProvider(userId));

    return profileAsync.when(
      data: (profile) => PhysicalLabScreen(profile: profile ?? {}),
      loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
      error: (_, __) => Center(child: Text('Error cargando laboratorio', style: GoogleFonts.inter(color: AppColors.error))),
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
