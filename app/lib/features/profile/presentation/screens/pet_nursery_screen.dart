import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/network/graphql_provider.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';

class PetNurseryScreen extends ConsumerStatefulWidget {
  const PetNurseryScreen({super.key});

  @override
  ConsumerState<PetNurseryScreen> createState() => _PetNurseryScreenState();
}

class _PetNurseryScreenState extends ConsumerState<PetNurseryScreen> {
  bool _isInteracting = false;

  Future<void> _interactWithPet(String petId, String action, int cost) async {
    final userId = ref.read(authUserIdProvider);
    final profile = ref.read(gamificationProfileProvider(userId)).value;
    
    if (profile == null) return;
    
    final crystals = profile['crystals'] as int? ?? 0;
    if (crystals < cost) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('No tienes suficientes cristales.'), backgroundColor: Colors.red),
        );
      }
      return;
    }

    setState(() => _isInteracting = true);
    final client = ref.read(graphqlClientProvider);

    const mutation = '''
      mutation InteractWithPet(\$userId: String!, \$petId: String!, \$action: String!) {
        interactWithPet(userId: \$userId, petId: \$petId, action: \$action) {
          id
          happiness
          xp
          level
          evolutionStage
        }
      }
    ''';

    try {
      final result = await client.mutate(
        MutationOptions(
          document: gql(mutation),
          variables: {
            'userId': userId,
            'petId': petId,
            'action': action,
          },
        ),
      );

      if (result.hasException) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: \${result.exception.toString()}'), backgroundColor: Colors.red),
          );
        }
      } else {
        // Refrescar perfil para ver cambios
        ref.invalidate(gamificationProfileProvider(userId));
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(action == 'FEED' ? '¡Has alimentado a tu mascota! +20 Felicidad' : '¡Has jugado con tu mascota! +30 Felicidad'),
              backgroundColor: Colors.green,
            ),
          );
        }
      }
    } finally {
      if (mounted) setState(() => _isInteracting = false);
    }
  }

  void _showPetDetails(BuildContext context, Map<String, dynamic> pet) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) {
        final happiness = pet['happiness'] as int;
        final level = pet['level'] as int;
        final evolution = pet['evolutionStage'] as int;
        
        return Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(pet['name'], style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              Text('Fase $evolution - Nivel $level', style: GoogleFonts.inter(color: AppColors.primary)),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Column(
                    children: [
                      const Icon(Icons.favorite, color: Colors.pink, size: 32),
                      const SizedBox(height: 8),
                      Text('Felicidad: $happiness%', style: const TextStyle(color: Colors.white)),
                    ],
                  ),
                  Column(
                    children: [
                      const Icon(Icons.star, color: Colors.amber, size: 32),
                      const SizedBox(height: 8),
                      Text('XP: ${pet['xp']}', style: const TextStyle(color: Colors.white)),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 32),
              SafeArea(
                child: Padding(
                  padding: EdgeInsets.only(bottom: MediaQuery.of(context).padding.bottom),
                  child: Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green.shade700,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          onPressed: _isInteracting ? null : () {
                            Navigator.pop(ctx);
                            _interactWithPet(pet['id'], 'FEED', 10);
                          },
                          icon: const Icon(Icons.restaurant),
                          label: const Text('Alimentar (10💎)'),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue.shade700,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          onPressed: _isInteracting ? null : () {
                            Navigator.pop(ctx);
                            _interactWithPet(pet['id'], 'PLAY', 20);
                          },
                          icon: const Icon(Icons.sports_esports),
                          label: const Text('Jugar (20💎)'),
                        ),
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),
        );
      }
    );
  }

  Widget _buildPetVisuals(String type, int stage, double size) {
    if (stage >= 4) {
      if (type == 'SNAKE') return Image.asset('assets/images/pets/python_ai_leviathan.jpg', width: size, height: size, fit: BoxFit.cover);
      if (type == 'COFFEE_CUP') return Image.asset('assets/images/pets/java_caffeine_mech.jpg', width: size, height: size, fit: BoxFit.cover);
      if (type == 'CRAB' || type == 'CPP' || type == 'C') return Image.asset('assets/images/pets/cpp_quantum_rocket.jpg', width: size, height: size, fit: BoxFit.cover);
      if (type == 'JS' || type == 'JAVASCRIPT') return Image.asset('assets/images/pets/js_dragon.jpg', width: size, height: size, fit: BoxFit.cover);
    }
    
    IconData icon;
    switch (stage) {
      case 1: icon = Icons.egg; break;
      case 2: icon = Icons.bug_report; break;
      case 3: icon = Icons.smart_toy; break;
      case 4: icon = Icons.rocket_launch; break;
      default: icon = Icons.adb; break;
    }
    return Icon(icon, size: size, color: stage >= 4 ? Colors.amber : AppColors.primary);
  }

  @override
  Widget build(BuildContext context) {
    final userId = ref.watch(authUserIdProvider);
    final profileAsync = ref.watch(gamificationProfileProvider(userId));

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Vivero de Mascotas', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: profileAsync.when(
        data: (profile) {
          if (profile == null) return const Center(child: Text('Error cargando perfil'));
          
          final pets = profile['pets'] as List<dynamic>? ?? [];
          
          if (pets.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.pets, size: 80, color: Colors.white.withOpacity(0.2)),
                  const SizedBox(height: 16),
                  Text('No tienes mascotas aún.', style: GoogleFonts.inter(color: Colors.white70, fontSize: 18)),
                  const SizedBox(height: 8),
                  Text('Completa lecciones para incubar una.', style: GoogleFonts.inter(color: Colors.white54)),
                ],
              ),
            );
          }

          return GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 0.85,
            ),
            itemCount: pets.length,
            itemBuilder: (context, index) {
              final pet = pets[index] as Map<String, dynamic>;
              final evolution = pet['evolutionStage'] as int;
              
              return InkWell(
                onTap: () => _showPetDetails(context, pet),
                borderRadius: BorderRadius.circular(16),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.primary.withOpacity(0.3)),
                    boxShadow: [
                      BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 10, spreadRadius: 1)
                    ],
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: _buildPetVisuals(pet['type'] as String? ?? 'BOT', evolution, 64),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        pet['name'],
                        style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Nivel ${pet['level']} • Fase $evolution',
                        style: GoogleFonts.inter(color: Colors.white54, fontSize: 12),
                      ),
                      const SizedBox(height: 8),
                      LinearProgressIndicator(
                        value: (pet['happiness'] as int) / 100,
                        backgroundColor: Colors.white12,
                        color: Colors.pink,
                      )
                    ],
                  ),
                ),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
        error: (err, stack) => Center(child: Text('Error: \$err', style: const TextStyle(color: Colors.red))),
      ),
    );
  }
}
