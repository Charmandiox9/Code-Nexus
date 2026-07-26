import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../../core/theme/app_colors.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../gamification/providers/gamification_provider.dart';
import '../../../learning/providers/learning_map_provider.dart';
import '../../../../core/network/graphql_provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../ide/providers/editor_theme_provider.dart';
import 'physical_lab_screen.dart';
import 'premium_screen.dart';
import 'pet_nursery_screen.dart';
class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  int _equippedPetIndex = 0;

  @override
  Widget build(BuildContext context) {
    // Simulando que el usuario logueado es user-123
    final profileAsync = ref.watch(gamificationProfileProvider(ref.watch(authUserIdProvider)));
    final learningMapAsync = ref.watch(learningMapProvider);
    final allConcepts = learningMapAsync.value ?? [];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Mi Perfil', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white70),
            tooltip: 'Cerrar Sesión',
            onPressed: () async {
              final prefs = await SharedPreferences.getInstance();
              await prefs.clear();
              ref.read(authUserIdProvider.notifier).set('');
              ref.read(authTokenProvider.notifier).set('');
              if (context.mounted) {
                context.go('/login');
              }
            },
          )
        ],
      ),
      body: profileAsync.when(
        data: (profile) {
          if (profile == null) {
            return const Center(child: Text('Error al cargar el perfil', style: TextStyle(color: Colors.white)));
          }

          final level = profile['level'] as int;
          final xp = profile['xp'] as int;
          final currentLevelXP = (level - 1) * (level - 1) * 100;
          final nextLevelXP = level * level * 100;
          final progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);

          final languageMastery = _calculateLanguageMastery(profile['completedLessons'] as List<dynamic>?, allConcepts);
          List<dynamic> dynamicPets = _generatePetsFromMastery(languageMastery);
          if (dynamicPets.isEmpty && profile['pets'] != null) {
            dynamicPets = profile['pets'] as List<dynamic>;
          }

          // Aplicar la selección de mascota
          if (dynamicPets.isNotEmpty) {
            for (int i = 0; i < dynamicPets.length; i++) {
              dynamicPets[i] = Map<String, dynamic>.from(dynamicPets[i]);
              dynamicPets[i]['isEquipped'] = (i == _equippedPetIndex % dynamicPets.length);
            }
          }

          final calculatedSkills = _calculateSkillsDomain(profile['completedLessons'] as List<dynamic>?, allConcepts);

          final updatedProfile = Map<String, dynamic>.from(profile);
          updatedProfile['pets'] = dynamicPets;
          updatedProfile['languageMastery'] = languageMastery;
          
          final user = profile['user'] as Map<String, dynamic>?;
          final username = user?['username'] ?? 'Usuario';
          final avatarUrl = user?['avatarUrl'];
          final isPremium = user?['plan'] == 'PREMIUM';

          return SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Avatar y Nombre de Usuario Editables
                GestureDetector(
                  onTap: () => _showEditProfileDialog(context, user),
                  child: Column(
                    children: [
                      Stack(
                        alignment: Alignment.bottomRight,
                        children: [
                          CircleAvatar(
                            radius: 50,
                            backgroundColor: AppColors.primary,
                            backgroundImage: avatarUrl != null && avatarUrl.isNotEmpty 
                                ? (avatarUrl.startsWith('data:image') 
                                    ? MemoryImage(base64Decode(avatarUrl.split(',').last)) as ImageProvider
                                    : NetworkImage(avatarUrl)) 
                                : null,
                            child: avatarUrl == null || avatarUrl.isEmpty ? const Icon(Icons.person, size: 60, color: Colors.white) : null,
                          ),
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: const BoxDecoration(
                              color: AppColors.accent,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.edit, size: 16, color: Colors.black),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primary.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.primary.withOpacity(0.5)),
                        ),
                        child: Text(
                          _getEquippedTitle(profile['titles'] as List<dynamic>?),
                          style: GoogleFonts.inter(
                            fontSize: 12,
                            color: AppColors.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            username,
                            style: GoogleFonts.inter(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          const SizedBox(width: 8),
                          const Icon(Icons.edit, size: 18, color: AppColors.textSecondary),
                        ],
                      ),
                    ],
                  ),
                ),
                if (isPremium)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.star, color: Colors.black, size: 16),
                          const SizedBox(width: 4),
                          Text('PRO', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: Colors.black)),
                        ],
                      ),
                    ),
                  )
                else
                  Padding(
                    padding: const EdgeInsets.only(top: 12),
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const PremiumScreen()),
                        );
                      },
                      icon: const Icon(Icons.diamond, color: Colors.white, size: 18),
                      label: Text('Mejorar a PRO', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: Colors.white)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.accent,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                      ),
                    ),
                  ),
                const SizedBox(height: 8),
                Text(
                  'Nivel $level',
                  style: GoogleFonts.inter(
                    fontSize: 16,
                    color: AppColors.accent,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 32),

                // XP Progress Bar
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Progreso hacia Nivel ${level + 1}', 
                            style: GoogleFonts.inter(color: AppColors.textSecondary)),
                          Text('$xp / $nextLevelXP XP', 
                            style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      LinearProgressIndicator(
                        value: progress.clamp(0.0, 1.0),
                        backgroundColor: AppColors.background,
                        color: AppColors.accent,
                        minHeight: 12,
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Stats Grid
                Row(
                  children: [
                    _buildStatCard('Cristales', '${profile['crystals']}', Icons.diamond, Colors.cyan),
                    const SizedBox(width: 16),
                    _buildStatCard('Racha', '${profile['currentStreak']} días', Icons.local_fire_department, Colors.orange),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    _buildStatCard('Total XP', '$xp', Icons.star, Colors.yellow),
                    const SizedBox(width: 16),
                    _buildStatCard('Lecciones', '${(profile['completedLessons'] as List?)?.length ?? 0}', Icons.check_circle, Colors.green),
                  ],
                ),
                const SizedBox(height: 32),

                // Code Pet
                if (dynamicPets.isNotEmpty) ...[
                  _buildSectionTitle('Tu Mascota de Código'),
                  const SizedBox(height: 16),
                  _buildCodePet(dynamicPets),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => PhysicalLabScreen(profile: updatedProfile),
                          ),
                        );
                      },
                      icon: const Icon(Icons.business_center),
                      label: Text(
                        'Entrar al Laboratorio Físico',
                        style: GoogleFonts.inter(fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary.withOpacity(0.2),
                        foregroundColor: AppColors.primary,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: AppColors.primary.withOpacity(0.5)),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const PetNurseryScreen(),
                          ),
                        );
                      },
                      icon: const Icon(Icons.pets),
                      label: Text(
                        'Entrar al Vivero de Mascotas',
                        style: GoogleFonts.inter(fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.pink.withOpacity(0.2),
                        foregroundColor: Colors.pinkAccent,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: Colors.pinkAccent.withOpacity(0.5)),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],

                // Inventario de Temas
                _buildSectionTitle('Temas de Editor'),
                const SizedBox(height: 16),
                _buildThemesInventory(context, profile['inventory'] as List<dynamic>?),
                const SizedBox(height: 32),

                // Dominio de Lenguajes
                _buildSectionTitle('Dominio de Lenguajes'),
                const SizedBox(height: 16),
                _buildMasteryList(_calculateLanguageMastery(profile['completedLessons'] as List<dynamic>?, allConcepts)),
                
                const SizedBox(height: 32),

                // Dominio de Habilidades
                _buildSectionTitle('Dominio de Habilidades'),
                const SizedBox(height: 16),
                _buildMasteryList(calculatedSkills),
                
                const SizedBox(height: 32),

                // Logros
                _buildSectionTitle('Logros Desbloqueados'),
                const SizedBox(height: 16),
                _buildAchievementsGrid(profile['achievements'] as List<dynamic>?),
                
                const SizedBox(height: 32),
              ],
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
        error: (err, stack) => Center(child: Text('Error: $err', style: const TextStyle(color: Colors.red))),
      ),
      bottomNavigationBar: _buildBottomNav(context),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color iconColor) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Icon(icon, color: iconColor, size: 32),
            const SizedBox(height: 12),
            Text(value, style: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
            const SizedBox(height: 4),
            Text(label, style: GoogleFonts.inter(fontSize: 12, color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }

  Widget _buildCodePet(List<dynamic> pets) {
    if (pets.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.primary.withOpacity(0.5)),
        ),
        child: const Center(
          child: Text('No tienes ninguna mascota desbloqueada.', style: TextStyle(color: Colors.white70)),
        ),
      );
    }

    final pet = pets.firstWhere((p) => p['isEquipped'] == true, orElse: () => pets.first);

    IconData getPetIcon(String type) {
      switch (type) {
        case 'SNAKE': return Icons.gesture;
        case 'COFFEE_CUP': return Icons.local_cafe;
        case 'GOPHER': return Icons.adb;
        case 'CRAB': return Icons.bug_report;
        default: return Icons.smart_toy;
      }
    }

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withOpacity(0.5)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.background,
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.accent, width: 2),
                ),
                child: Icon(getPetIcon(pet['type'] as String), size: 48, color: AppColors.accent),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          pet['name'],
                          style: GoogleFonts.inter(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            'Evolución ${pet['evolutionStage']} - Lv ${pet['level']}',
                            style: GoogleFonts.inter(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                        )
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        const Icon(Icons.favorite, size: 16, color: Colors.redAccent),
                        const SizedBox(width: 4),
                        Expanded(
                          child: LinearProgressIndicator(
                            value: (pet['health'] as num) / 100,
                            backgroundColor: AppColors.background,
                            color: Colors.redAccent,
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Icon(Icons.mood, size: 16, color: Colors.orange),
                        const SizedBox(width: 4),
                        Expanded(
                          child: LinearProgressIndicator(
                            value: (pet['happiness'] as num) / 100,
                            backgroundColor: AppColors.background,
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Sube tu racha para mantener a ${pet['name']} feliz.',
                      style: GoogleFonts.inter(fontSize: 12, color: AppColors.textSecondary),
                    )
                  ],
                ),
              )
            ],
          ),
          if (pets.length > 1) ...[
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => _showPetSelectionSheet(context, pets),
                icon: const Icon(Icons.sync),
                label: const Text('Cambiar Mascota'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.primary,
                  side: BorderSide(color: AppColors.primary.withOpacity(0.5)),
                ),
              ),
            )
          ]
        ],
      ),
    );
  }

  void _showPetSelectionSheet(BuildContext context, List<dynamic> pets) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Selecciona una Mascota',
                style: GoogleFonts.inter(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: pets.length,
                  itemBuilder: (context, index) {
                    final pet = pets[index];
                    final isEquipped = index == _equippedPetIndex;

                    IconData getPetIcon(String type) {
                      switch (type) {
                        case 'SNAKE': return Icons.gesture;
                        case 'COFFEE_CUP': return Icons.local_cafe;
                        case 'GOPHER': return Icons.adb;
                        case 'CRAB': return Icons.bug_report;
                        default: return Icons.smart_toy;
                      }
                    }

                    return ListTile(
                      leading: Icon(getPetIcon(pet['type'] as String), color: AppColors.accent),
                      title: Text(pet['name'], style: GoogleFonts.inter(color: AppColors.textPrimary)),
                      subtitle: Text('Nv. ${pet['level']}', style: GoogleFonts.inter(color: AppColors.textSecondary)),
                      trailing: isEquipped 
                        ? const Icon(Icons.check_circle, color: AppColors.primary)
                        : null,
                      onTap: () {
                        setState(() {
                          _equippedPetIndex = index;
                        });
                        Navigator.pop(context);
                      },
                    );
                  },
                ),
              )
            ],
          ),
        );
      },
    );
  }

  String _getEquippedTitle(List<dynamic>? titles) {
    if (titles == null || titles.isEmpty) return 'Sin Título';
    final equipped = titles.firstWhere((t) => t['isEquipped'] == true, orElse: () => null);
    if (equipped != null) {
      return equipped['title']['name'];
    }
    return 'Sin Título';
  }

  Widget _buildSectionTitle(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: AppColors.textPrimary,
        ),
      ),
    );
  }

  Map<String, dynamic> _calculateLanguageMastery(List<dynamic>? completedLessons, List<dynamic> concepts) {
    if (completedLessons == null || completedLessons.isEmpty) return {};
    
    Map<String, int> counts = {};
    Map<String, int> totals = {};
    for (var concept in concepts) {
      if (concept['lessons'] != null) {
        for (var lesson in concept['lessons']) {
          final slug = lesson['language']?['slug'];
          String? langName;
          if (slug == 'python') langName = 'Python';
          else if (slug == 'javascript') langName = 'JavaScript';
          else langName = slug;
          
          if (langName != null) {
            totals[langName] = (totals[langName] ?? 0) + 1;
            if (completedLessons.contains(lesson['id'])) {
              counts[langName] = (counts[langName] ?? 0) + 1;
            }
          }
        }
      }
    }
    
    Map<String, dynamic> mastery = {};
    counts.forEach((lang, count) {
      final total = totals[lang] ?? 1;
      mastery[lang] = (count / total * 100).clamp(0.0, 100.0);
    });
    
    return mastery;
  }

  Map<String, dynamic> _calculateSkillsDomain(List<dynamic>? completedLessons, List<dynamic> concepts) {
    Map<String, double> skills = {
      'POO': 0,
      'Lógica': 0,
      'Algoritmos': 0,
      'Estructuras de Datos': 0,
      'Debugging': 0,
    };

    if (completedLessons == null || completedLessons.isEmpty) return skills;

    for (var concept in concepts) {
      if (concept['lessons'] != null) {
        for (var lesson in concept['lessons']) {
          if (completedLessons.contains(lesson['id'])) {
            final type = lesson['type'] ?? 'INTRO';
            switch (type) {
              case 'INTRO':
                skills['Lógica'] = (skills['Lógica']! + 5);
                break;
              case 'EXERCISE_GUIDED':
                skills['Lógica'] = (skills['Lógica']! + 5);
                skills['Estructuras de Datos'] = (skills['Estructuras de Datos']! + 2);
                break;
              case 'EXERCISE_FREE':
                skills['Lógica'] = (skills['Lógica']! + 10);
                skills['Algoritmos'] = (skills['Algoritmos']! + 5);
                break;
              case 'BOSS':
                skills['Lógica'] = (skills['Lógica']! + 15);
                skills['Debugging'] = (skills['Debugging']! + 10);
                skills['POO'] = (skills['POO']! + 5);
                break;
              case 'PROJECT':
                skills['POO'] = (skills['POO']! + 15);
                skills['Algoritmos'] = (skills['Algoritmos']! + 10);
                skills['Debugging'] = (skills['Debugging']! + 5);
                break;
              default:
                skills['Lógica'] = (skills['Lógica']! + 2);
            }
          }
        }
      }
    }

    skills.forEach((key, value) {
      skills[key] = value.clamp(0.0, 100.0);
    });

    return skills;
  }

  List<dynamic> _generatePetsFromMastery(Map<String, dynamic> mastery) {
    List<dynamic> pets = [];
    if (mastery.containsKey('Python') && (mastery['Python'] as double) > 0) {
      pets.add({
        'type': 'SNAKE',
        'name': 'PySnake',
        'level': ((mastery['Python'] as double) / 10).ceil(),
        'evolutionStage': ((mastery['Python'] as double) / 33).ceil(),
        'health': 100,
        'happiness': 100,
        'isEquipped': true
      });
    }
    if (mastery.containsKey('JavaScript') && (mastery['JavaScript'] as double) > 0) {
      pets.add({
        'type': 'GOPHER',
        'name': 'JSNinja',
        'level': ((mastery['JavaScript'] as double) / 10).ceil(),
        'evolutionStage': ((mastery['JavaScript'] as double) / 33).ceil(),
        'health': 100,
        'happiness': 100,
        'isEquipped': pets.isEmpty // equip if first
      });
    }
    return pets;
  }

  Widget _buildMasteryList(Map<String, dynamic>? skills) {
    if (skills == null || skills.isEmpty) {
      return const Text('Aún no tienes registros suficientes', style: TextStyle(color: Colors.white70));
    }
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: skills.entries.map((e) {
          final skillName = e.key.toUpperCase();
          final skillValue = (e.value as num).toDouble();
          return Padding(
            padding: const EdgeInsets.only(bottom: 12.0),
            child: Row(
              children: [
                SizedBox(
                  width: 100,
                  child: Text(skillName, style: GoogleFonts.inter(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
                ),
                Expanded(
                  child: LinearProgressIndicator(
                    value: skillValue / 100,
                    backgroundColor: AppColors.background,
                    color: AppColors.primary,
                    minHeight: 8,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                const SizedBox(width: 12),
                Text('${skillValue.toInt()}', style: GoogleFonts.inter(color: AppColors.textPrimary)),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildAchievementsGrid(List<dynamic>? userAchievements) {
    if (userAchievements == null || userAchievements.isEmpty) {
      return const Text('Sigue aprendiendo para desbloquear logros', style: TextStyle(color: Colors.white70));
    }
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 0.85,
      ),
      itemCount: userAchievements.length,
      itemBuilder: (context, index) {
        final ach = userAchievements[index]['achievement'];
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.accent.withOpacity(0.3)),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.accent.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(Icons.star_rounded, size: 36, color: AppColors.accent),
              ),
              const SizedBox(height: 12),
              Text(
                ach['name'],
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary),
              ),
              const SizedBox(height: 4),
              Text(
                ach['description'],
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(fontSize: 10, color: AppColors.textSecondary),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildThemesInventory(BuildContext context, List<dynamic>? inventory) {
    final themes = (inventory ?? []).where((i) => i.toString().startsWith('Tema')).toList();
    if (!themes.contains('Tema Default')) {
      themes.insert(0, 'Tema Default');
    }
    
    final currentTheme = ref.watch(editorThemeProvider);
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.surfaceHighlight),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.color_lens, color: AppColors.primary, size: 32),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Equipado actualmente:',
                  style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 12),
                ),
                const SizedBox(height: 4),
                Text(
                  currentTheme,
                  style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          ElevatedButton(
            onPressed: () {
              showModalBottomSheet(
                context: context,
                backgroundColor: AppColors.surface,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                ),
                builder: (ctx) {
                  return SafeArea(
                    bottom: true,
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Tus Temas', style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 20)),
                          const SizedBox(height: 16),
                          Flexible(
                            child: SingleChildScrollView(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: themes.map((theme) {
                                  final isEq = ref.watch(editorThemeProvider) == theme.toString();
                                  return ListTile(
                                    leading: Icon(Icons.brush, color: isEq ? AppColors.primary : AppColors.textSecondary),
                                    title: Text(theme.toString(), style: GoogleFonts.inter(color: AppColors.textPrimary)),
                                    trailing: isEq 
                                      ? const Icon(Icons.check_circle, color: AppColors.primary)
                                      : OutlinedButton(
                                          onPressed: () {
                                            ref.read(editorThemeProvider.notifier).setTheme(theme.toString());
                                            Navigator.pop(ctx);
                                          },
                                          child: const Text('Equipar'),
                                        ),
                                  );
                                }).toList(),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary.withOpacity(0.2),
              foregroundColor: AppColors.primary,
              elevation: 0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            ),
            child: const Text('Cambiar'),
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
      currentIndex: 4, // Perfil
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 0) context.go('/');
        if (index == 1) context.go('/lab');
        if (index == 2) context.go('/store');
        if (index == 3) context.go('/social');
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

  void _showEditProfileDialog(BuildContext context, Map<String, dynamic>? user) {
    if (user == null) return;
    
    final usernameCtrl = TextEditingController(text: user['username'] ?? '');
    String currentAvatar = user['avatarUrl'] ?? '';
    bool isLoading = false;
    String? errorMessage;

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              backgroundColor: AppColors.surface,
              title: Text('Editar Perfil', style: GoogleFonts.inter(color: Colors.white)),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: AppColors.primary,
                    backgroundImage: currentAvatar.isNotEmpty 
                        ? (currentAvatar.startsWith('data:image')
                            ? MemoryImage(base64Decode(currentAvatar.split(',').last)) as ImageProvider
                            : NetworkImage(currentAvatar))
                        : null,
                    child: currentAvatar.isEmpty ? const Icon(Icons.person, size: 40, color: Colors.white) : null,
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary.withOpacity(0.2),
                      foregroundColor: AppColors.primary,
                    ),
                    onPressed: () async {
                      final picker = ImagePicker();
                      final image = await picker.pickImage(source: ImageSource.gallery, imageQuality: 50, maxWidth: 400);
                      if (image != null) {
                        final bytes = await image.readAsBytes();
                        final base64Img = 'data:image/jpeg;base64,${base64Encode(bytes)}';
                        setState(() {
                          currentAvatar = base64Img;
                        });
                      }
                    },
                    icon: const Icon(Icons.photo_library),
                    label: const Text('Cambiar Foto'),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: usernameCtrl,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      labelText: 'Nombre de usuario',
                      labelStyle: TextStyle(color: AppColors.textSecondary),
                      enabledBorder: const UnderlineInputBorder(borderSide: BorderSide(color: AppColors.primary)),
                      focusedBorder: const UnderlineInputBorder(borderSide: BorderSide(color: AppColors.accent)),
                    ),
                  ),
                  if (errorMessage != null) ...[
                    const SizedBox(height: 8),
                    Text(errorMessage!, style: const TextStyle(color: Colors.red, fontSize: 12)),
                  ]
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('Cancelar', style: TextStyle(color: AppColors.textSecondary)),
                ),
                isLoading
                    ? const CircularProgressIndicator(color: AppColors.accent)
                    : ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
                        onPressed: () async {
                          setState(() => isLoading = true);
                          try {
                            final client = ref.read(graphqlClientProvider);
                            final result = await client.mutate(
                              MutationOptions(
                                document: gql('''
                                  mutation UpdateUser(\$id: String!, \$username: String, \$avatarUrl: String) {
                                    updateUser(input: {id: \$id, username: \$username, avatarUrl: \$avatarUrl}) {
                                      id
                                      username
                                      avatarUrl
                                    }
                                  }
                                '''),
                                variables: {
                                  'id': user['id'],
                                  'username': usernameCtrl.text.isNotEmpty ? usernameCtrl.text : null,
                                  'avatarUrl': currentAvatar.isNotEmpty ? currentAvatar : null,
                                },
                              ),
                            );
                            
                            if (result.hasException) {
                              setState(() {
                                errorMessage = result.exception?.graphqlErrors.firstOrNull?.message ?? 'Error al actualizar';
                                isLoading = false;
                              });
                            } else {
                              // Success
                              Navigator.pop(ctx);
                              ref.invalidate(gamificationProfileProvider(ref.read(authUserIdProvider)));
                            }
                          } catch (e) {
                            setState(() {
                              errorMessage = 'Error de conexión';
                              isLoading = false;
                            });
                          }
                        },
                        child: const Text('Guardar'),
                      ),
              ],
            );
          }
        );
      },
    );
  }
}
