import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../gamification/providers/gamification_provider.dart';

import 'package:shared_preferences/shared_preferences.dart';
import '../../providers/learning_map_provider.dart';
import '../../../../core/providers/language_provider.dart';
import '../../../profile/presentation/screens/premium_screen.dart';

class LearningMapScreen extends ConsumerStatefulWidget {
  const LearningMapScreen({super.key});

  @override
  ConsumerState<LearningMapScreen> createState() => _LearningMapScreenState();
}

class _LearningMapScreenState extends ConsumerState<LearningMapScreen> {
  @override
  Widget build(BuildContext context) {
    // Usamos un ID por defecto para pruebas
    final profileAsync = ref.watch(gamificationProfileProvider(ref.watch(authUserIdProvider)));
    final learningMapAsync = ref.watch(learningMapProvider);
    final _selectedLanguageSlug = ref.watch(languageProvider);

    return Scaffold(
      appBar: AppBar(
        title: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: AppColors.primary.withOpacity(0.5)),
          ),
          child: PopupMenuButton<String>(
            initialValue: _selectedLanguageSlug,
            color: AppColors.surfaceHighlight,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
              side: BorderSide(color: AppColors.primary.withOpacity(0.3)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  _getLangIcon(_selectedLanguageSlug),
                  color: _getLangColor(_selectedLanguageSlug),
                  size: 24,
                ),
                const SizedBox(width: 8),
                Text(
                  _getLangName(_selectedLanguageSlug),
                  style: GoogleFonts.inter(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    letterSpacing: -0.5,
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(width: 4),
                const Icon(Icons.keyboard_arrow_down, color: AppColors.primary, size: 20),
              ],
            ),
            onSelected: (String newValue) {
              final isPremium = profileAsync.value?['user']?['plan'] == 'PREMIUM';
              final premiumLangs = ['java', 'cpp', 'typescript', 'rust', 'sql'];
              
              if (premiumLangs.contains(newValue) && !isPremium) {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const PremiumScreen()),
                );
                return;
              }
              
              ref.read(languageProvider.notifier).setLanguage(newValue);
            },
            itemBuilder: (BuildContext context) {
              final isPremium = profileAsync.value?['user']?['plan'] == 'PREMIUM';
              
              PopupMenuItem<String> _buildLangItem(String value, String name, IconData icon, Color iconColor, {bool isPremiumOnly = false}) {
                return PopupMenuItem(
                  value: value,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(icon, color: iconColor, size: 20),
                          const SizedBox(width: 12),
                          Text(name, style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      if (isPremiumOnly && !isPremium)
                        const Icon(Icons.lock, color: Colors.amber, size: 16),
                    ],
                  ),
                );
              }

              return [
                _buildLangItem('python', 'Python', Icons.code, AppColors.primary),
                _buildLangItem('javascript', 'JavaScript', Icons.javascript, Colors.yellow),
                _buildLangItem('typescript', 'TypeScript', Icons.data_object, Colors.blue, isPremiumOnly: true),
                _buildLangItem('java', 'Java', Icons.coffee, Colors.orange, isPremiumOnly: true),
                _buildLangItem('cpp', 'C++', Icons.developer_board, Colors.blueAccent, isPremiumOnly: true),
                _buildLangItem('rust', 'Rust', Icons.settings_applications, Colors.deepOrange, isPremiumOnly: true),
                _buildLangItem('sql', 'SQL', Icons.storage, Colors.lightBlue, isPremiumOnly: true),
              ];
            },
          ),
        ),
        actions: [
          profileAsync.when(
            data: (profile) => profile != null 
                ? Row(
                    children: [
                      _buildHeaderBadge(Icons.diamond, AppColors.secondary, profile['crystals'].toString()),
                      const SizedBox(width: 8),
                      _buildHeaderBadge(Icons.local_fire_department, AppColors.warning, profile['currentStreak'].toString()),
                    ],
                  )
                : const SizedBox.shrink(),
            loading: () => const Center(child: CircularProgressIndicator(strokeWidth: 2)),
            error: (_, __) => const Icon(Icons.error, color: AppColors.error),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: learningMapAsync.when(
        data: (allConcepts) {
          final concepts = allConcepts.where((c) {
            final lessons = c['lessons'] as List;
            if (lessons.isEmpty) return false;
            // Solo mantener conceptos que tengan al menos una lección del lenguaje seleccionado
            return lessons.any((l) => l['language']?['slug'] == _selectedLanguageSlug);
          }).map((c) {
            // Filtrar las lecciones dentro de este concepto para que solo queden las del lenguaje seleccionado
            final filteredLessons = (c['lessons'] as List)
                .where((l) => l['language']?['slug'] == _selectedLanguageSlug)
                .toList();
            return {
              ...c,
              'lessons': filteredLessons,
            };
          }).toList();
          
          // Re-calcular allLessons basado solo en los conceptos filtrados para la ruta actual
          final allLessons = concepts.expand((c) => c['lessons'] as List).toList();

          if (concepts.isEmpty) {
            return const Center(child: Text('No hay niveles disponibles para este lenguaje', style: TextStyle(color: Colors.white)));
          }

          final completedLessons = profileAsync.value?['completedLessons'] as List? ?? [];
          
          return SingleChildScrollView(
            padding: const EdgeInsets.symmetric(vertical: 32),
            child: Column(
              children: concepts.map<Widget>((concept) {
                final lessons = concept['lessons'] as List;
                return Column(
                  children: [
                    _buildSectionHeader(concept['title']),
                    const SizedBox(height: 32),
                    ...lessons.asMap().entries.map((entry) {
                      final index = entry.key;
                      final lesson = entry.value;
                      final globalIndex = allLessons.indexOf(lesson);
                      
                      final isCompleted = completedLessons.contains(lesson['id']);
                      bool isCurrent = false;
                      if (!isCompleted) {
                        if (globalIndex == 0) {
                          isCurrent = true;
                        } else {
                          final prevLesson = allLessons[globalIndex - 1];
                          if (completedLessons.contains(prevLesson['id'])) {
                            isCurrent = true;
                          }
                        }
                      }
                      
                      Alignment align = Alignment.center;
                      if (globalIndex % 3 == 1) align = Alignment.centerLeft;
                      if (globalIndex % 3 == 2) align = Alignment.centerRight;

                      final icon = lesson['type'] == 'BOSS' ? Icons.security : Icons.code;
                      final langSlug = lesson['language']?['slug'] ?? 'python';

                      return Column(
                        children: [
                          _buildLevelNode(context, ref, lesson['title'], lesson['id'], icon, isCompleted, isCurrent, align, lesson['content'], langSlug, lesson['content']?['expectedOutput']),
                          if (index < lessons.length - 1) _buildPathLine(isCompleted),
                        ],
                      );
                    }).toList(),
                    const SizedBox(height: 48), // Espacio entre conceptos
                  ],
                );
              }).toList(),
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
        error: (err, _) => Center(child: Text('Error cargando mapa: $err', style: const TextStyle(color: Colors.red))),
      ),
      bottomNavigationBar: _buildBottomNav(context),
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

  Widget _buildSectionHeader(String title) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.surfaceHighlight),
      ),
      child: Text(
        title,
        style: GoogleFonts.inter(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildPathLine(bool isCompleted) {
    return Container(
      height: 40,
      width: 6,
      decoration: BoxDecoration(
        color: isCompleted ? AppColors.secondary : AppColors.surfaceHighlight,
        borderRadius: BorderRadius.circular(3),
        boxShadow: isCompleted ? [
          BoxShadow(color: AppColors.secondary.withOpacity(0.5), blurRadius: 10, spreadRadius: 1)
        ] : [],
      ),
    );
  }

  Color _getNodeColor(bool isCompleted, bool isCurrent) => isCompleted 
      ? AppColors.secondary 
      : (isCurrent ? AppColors.primary : AppColors.surfaceHighlight);

  Color _getIconColor(bool isCompleted, bool isCurrent) => (isCompleted || isCurrent) ? AppColors.background : AppColors.textSecondary;

  IconData _getLessonIcon(String? type) => type == 'BOSS' ? Icons.security : Icons.code;

  String _getLangName(String slug) {
    switch (slug) {
      case 'javascript': return 'JavaScript';
      case 'typescript': return 'TypeScript';
      case 'java': return 'Java';
      case 'cpp': return 'C++';
      case 'rust': return 'Rust';
      case 'sql': return 'SQL';
      case 'python': 
      default: return 'Python';
    }
  }

  IconData _getLangIcon(String slug) {
    switch (slug) {
      case 'javascript': return Icons.javascript;
      case 'typescript': return Icons.data_object;
      case 'java': return Icons.coffee;
      case 'cpp': return Icons.developer_board;
      case 'rust': return Icons.settings_applications;
      case 'sql': return Icons.storage;
      case 'python': 
      default: return Icons.code;
    }
  }

  Color _getLangColor(String slug) {
    switch (slug) {
      case 'javascript': return Colors.yellow;
      case 'typescript': return Colors.blue;
      case 'java': return Colors.orange;
      case 'cpp': return Colors.blueAccent;
      case 'rust': return Colors.deepOrange;
      case 'sql': return Colors.lightBlue;
      case 'python': 
      default: return AppColors.primary;
    }
  }

  Widget _buildLevelNode(BuildContext context, WidgetRef ref, String title, String lessonId, IconData icon, bool isCompleted, bool isCurrent, Alignment alignment, dynamic content, String langSlug, String? expectedOutput) {
    final Color nodeColor = _getNodeColor(isCompleted, isCurrent);
    final Color iconColor = _getIconColor(isCompleted, isCurrent);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 8),
      child: Align(
        alignment: alignment,
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: (isCurrent || isCompleted) ? () async {
            final initialCode = content?['initialCode'] ?? '';
            final instructions = content?['instructions'] ?? '';
            await context.push(
              '/ide?lessonId=$lessonId&language=$langSlug',
              extra: {'title': title, 'initialCode': initialCode, 'instructions': instructions, 'expectedOutput': expectedOutput, 'theory': content?['theory']},
            );
            // Refrescar los datos de gamificación al volver del IDE
            ref.invalidate(gamificationProfileProvider(ref.read(authUserIdProvider)));
          } : null,
          child: Column(
            children: [
              Container(
                width: 70,
                height: 70,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isCurrent ? nodeColor : nodeColor.withValues(alpha: isCompleted ? 1.0 : 0.2),
                  border: Border.all(
                    color: isCurrent || isCompleted ? nodeColor.withValues(alpha: 0.5) : Colors.transparent,
                    width: isCurrent || isCompleted ? 6 : 0,
                  ),
                  boxShadow: (isCurrent || isCompleted) ? [
                    BoxShadow(
                      color: nodeColor.withValues(alpha: 0.4),
                      blurRadius: isCurrent ? 15 : 8,
                      spreadRadius: isCurrent ? 2 : 1,
                    )
                  ] : [],
                ),
                child: Icon(icon, color: iconColor, size: 32),
              ),
              const SizedBox(height: 8),
              SizedBox(
                width: 140,
                child: Column(
                  children: [
                    Text(
                      title,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.inter(
                        color: isCurrent ? AppColors.textPrimary : AppColors.textSecondary,
                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                        fontSize: 12,
                      ),
                    ),
                    if (content?['theory'] != null && (isCurrent || isCompleted)) ...[
                      const SizedBox(height: 4),
                      GestureDetector(
                        onTap: () => _showTheoryDialog(context, title, content['theory']),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.menu_book, color: AppColors.primary, size: 14),
                            const SizedBox(width: 4),
                            Text('Teoría', style: GoogleFonts.inter(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      )
                    ]
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showTheoryDialog(BuildContext context, String title, String theory) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('Teoría: $title', style: GoogleFonts.inter(color: AppColors.primary, fontWeight: FontWeight.bold)),
        content: SingleChildScrollView(
          child: Text(theory, style: GoogleFonts.inter(color: AppColors.textPrimary)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Entendido', style: TextStyle(color: AppColors.primary)),
          )
        ],
      )
    );
  }

  Widget _buildBottomNav(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: AppColors.background,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
      currentIndex: 0,
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 1) context.go('/lab');
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
}
