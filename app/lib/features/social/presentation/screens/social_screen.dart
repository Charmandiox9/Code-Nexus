import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/network/graphql_provider.dart';
import '../../../../core/providers/auth_provider.dart';
import '../providers/social_provider.dart';

class SocialScreen extends ConsumerStatefulWidget {
  const SocialScreen({super.key});

  @override
  ConsumerState<SocialScreen> createState() => _SocialScreenState();
}

class _SocialScreenState extends ConsumerState<SocialScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Comunidad', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primary,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textSecondary,
          tabs: const [
            Tab(text: 'Feed de Amigos'),
            Tab(text: 'Clasificación'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildFeed(),
          _buildLeaderboard(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddFriendDialog(context),
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.person_add),
      ),
      bottomNavigationBar: _buildBottomNav(context),
    );
  }

  void _showAddFriendDialog(BuildContext context) {
    final controller = TextEditingController();
    bool isSubmitting = false;

    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (context, setState) {
          return AlertDialog(
            backgroundColor: AppColors.surface,
            title: Text('Agregar Amigo', style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold)),
            content: TextField(
              controller: controller,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(
                hintText: 'Nombre de usuario',
                hintStyle: TextStyle(color: Colors.white54),
                enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: AppColors.primary)),
                focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: AppColors.accent)),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancelar', style: TextStyle(color: AppColors.textSecondary)),
              ),
              isSubmitting 
                ? const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2)),
                  )
                : TextButton(
                    onPressed: () async {
                      if (controller.text.isEmpty) return;
                      setState(() => isSubmitting = true);
                      try {
                        final client = ref.read(graphqlClientProvider);
                        final result = await client.mutate(MutationOptions(
                          document: gql(r'''
                            mutation SendFriendRequest($userId: String!, $targetUsername: String!) {
                              sendFriendRequest(userId: $userId, targetUsername: $targetUsername)
                            }
                          '''),
                          variables: {
                            'userId': ref.read(authUserIdProvider),
                            'targetUsername': controller.text,
                          },
                        ));
                        
                        if (result.hasException) {
                          throw Exception(result.exception?.graphqlErrors.firstOrNull?.message ?? 'Error desconocido');
                        }
                        
                        if (!ctx.mounted) return;
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('¡Solicitud de amistad enviada!')));
                      } catch (e) {
                        setState(() => isSubmitting = false);
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))));
                      }
                    },
                    child: const Text('Agregar', style: TextStyle(color: AppColors.primary)),
                  ),
            ],
          );
        }
      ),
    );
  }

  Widget _buildBottomNav(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: AppColors.background,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
      currentIndex: 3,
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 0) context.go('/');
        if (index == 1) context.go('/lab');
        if (index == 2) context.go('/store');
        // if (index == 3) it's social
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

  Widget _buildFeed() {
    final feedAsync = ref.watch(socialFeedProvider);
    return feedAsync.when(
      data: (feed) {
        if (feed.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.people_outline, size: 64, color: AppColors.textSecondary.withOpacity(0.5)),
                const SizedBox(height: 16),
                Text(
                  'Aún no tienes amigos agregados',
                  style: GoogleFonts.inter(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                Text(
                  '¡Agrega amigos para ver su actividad aquí!',
                  style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 14),
                ),
              ],
            ),
          );
        }
        return ListView.builder(
          itemCount: feed.length,
          itemBuilder: (context, index) {
            final activity = feed[index];
            return Card(
              color: AppColors.surface,
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: AppColors.primary.withValues(alpha: 0.2),
                  child: const Icon(Icons.flash_on, color: AppColors.primary),
                ),
                title: Text('${activity['user']['username']} logró algo nuevo!', style: const TextStyle(color: Colors.white)),
                subtitle: Text('Tipo: ${activity['type']}', style: const TextStyle(color: Colors.white70)),
              ),
            );
          },
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, st) => Center(child: Text('Error: $e', style: const TextStyle(color: Colors.red))),
    );
  }

  Widget _buildLeaderboard() {
    final leaderboardAsync = ref.watch(leaderboardProvider);
    final selectedLanguage = ref.watch(leaderboardLanguageProvider);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Clasificación de tu Liga',
                style: GoogleFonts.inter(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
        Expanded(
          child: leaderboardAsync.when(
            data: (board) {
              if (board.isEmpty) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.sports_esports, size: 64, color: AppColors.textSecondary.withOpacity(0.5)),
                      const SizedBox(height: 16),
                      Text(
                        'Aún no has jugado esta semana',
                        style: GoogleFonts.inter(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Completa lecciones para entrar a una liga.',
                        style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 14),
                      ),
                    ],
                  ),
                );
              }
              
              return ListView.builder(
                itemCount: board.length,
                itemBuilder: (context, index) {
                  final entry = board[index];
                  final league = entry['league'] ?? 'Bronce';
                  Color leagueColor = Colors.grey;
                  if (league == 'Plata') leagueColor = Colors.blueGrey;
                  if (league == 'Oro') leagueColor = Colors.orange;
                  if (league == 'Diamante') leagueColor = Colors.cyan;

                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: leagueColor.withValues(alpha: 0.2),
                      child: Text('#${index + 1}', style: TextStyle(color: leagueColor, fontWeight: FontWeight.bold)),
                    ),
                    title: Text(entry['user']['username'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    subtitle: Text('Liga $league', style: TextStyle(color: leagueColor, fontSize: 12)),
                    trailing: Text('${entry['xp']} XP', style: const TextStyle(color: AppColors.warning, fontWeight: FontWeight.bold)),
                  );
                },
              );
            },
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, st) => Center(child: Text('Error: $e', style: const TextStyle(color: Colors.red))),
          ),
        ),
      ],
    );
  }
}
