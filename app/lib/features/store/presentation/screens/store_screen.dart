import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/auth_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/network/graphql_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';
import '../../../ide/providers/editor_theme_provider.dart';
import '../../../profile/presentation/screens/premium_screen.dart';

class StoreScreen extends ConsumerWidget {
  const StoreScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(gamificationProfileProvider(ref.watch(authUserIdProvider)));

    return Scaffold(
      appBar: AppBar(
        title: Text('Nexus Store', style: GoogleFonts.inter(fontWeight: FontWeight.bold)),
        actions: [
          profileAsync.when(
            data: (profile) {
              if (profile == null) return const SizedBox.shrink();
              
              final activeBoosts = List<String>.from(profile['activeBoosts'] ?? []);
              final inventory = List<String>.from(profile['inventory'] ?? []);
              final shieldsCount = inventory.where((b) => b == 'Escudo de Racha').length;
              final hasXpBoost = activeBoosts.contains('XP x2 (24 hrs)');

              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    if (hasXpBoost) ...[
                      const Icon(Icons.bolt, color: Colors.amber, size: 20),
                      const SizedBox(width: 4),
                      Text('x2', style: GoogleFonts.inter(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 16)),
                      const SizedBox(width: 16),
                    ],
                    if (shieldsCount > 0) ...[
                      const Icon(Icons.shield, color: Colors.blueAccent, size: 20),
                      const SizedBox(width: 4),
                      Text(shieldsCount.toString(), style: GoogleFonts.inter(color: Colors.blueAccent, fontWeight: FontWeight.bold, fontSize: 16)),
                      const SizedBox(width: 16),
                    ],
                    const Icon(Icons.diamond, color: AppColors.secondary, size: 20),
                    const SizedBox(width: 4),
                    Text(
                      profile['crystals'].toString(),
                      style: GoogleFonts.inter(
                        color: AppColors.secondary,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              );
            },
            loading: () => const SizedBox.shrink(),
            error: (_, __) => const SizedBox.shrink(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Aspectos de Editor',
              style: GoogleFonts.inter(
                color: AppColors.textPrimary,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            profileAsync.when(
              data: (profile) => Column(
                children: [
                  _buildThemeItem(context, ref, 'Tema Default', 'El tema clásico por defecto', 0, Icons.brush, profile),
                  _buildThemeItem(context, ref, 'Tema Cyberpunk', 'Colores de neón para tu código', 500, Icons.color_lens, profile),
                  _buildThemeItem(context, ref, 'Tema Matrix', 'Verde hacker clásico', 300, Icons.terminal, profile),
                ],
              ),
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (_, __) => const Text('Error al cargar saldo'),
            ),
            
            const SizedBox(height: 32),
            Text(
              'Potenciadores',
              style: GoogleFonts.inter(
                color: AppColors.textPrimary,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            profileAsync.when(
              data: (profile) => Column(
                children: [
                  _buildBoostItem(context, ref, 'Escudo de Racha', 'Protege tu racha de un día sin programar', 200, Icons.shield, profile),
                  _buildBoostItem(context, ref, 'XP x2 (24 hrs)', 'Gana el doble de experiencia por 24 horas', 1000, Icons.bolt, profile),
                ],
              ),
              loading: () => const SizedBox.shrink(),
              error: (_, __) => const SizedBox.shrink(),
            ),
            const SizedBox(height: 32),
            Text(
              'Laboratorio Físico',
              style: GoogleFonts.inter(
                color: AppColors.textPrimary,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            profileAsync.when(
              data: (profile) => Column(
                children: [
                  _buildLabStoreItem(context, ref, 'Planta de Oficina', 'Decora tu laboratorio y reduce el estrés', 150, Icons.eco, profile),
                  _buildLabStoreItem(context, ref, 'Pizarra Blanca', 'Planifica tus proyectos de desarrollo', 200, Icons.developer_board, profile),
                  _buildLabStoreItem(context, ref, 'Máquina Arcade', 'Relájate jugando unos clásicos', 800, Icons.videogame_asset, profile),
                ],
              ),
              loading: () => const SizedBox.shrink(),
              error: (_, __) => const SizedBox.shrink(),
            ),
            const SizedBox(height: 32),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.amber.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.amber.withOpacity(0.5)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.star, color: Colors.amber),
                  const SizedBox(width: 8),
                  Text(
                    'Zona VIP (PRO)',
                    style: GoogleFonts.inter(
                      color: Colors.amber,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            profileAsync.when(
              data: (profile) => Column(
                children: [
                  _buildVipStoreItem(context, ref, 'Mascota Legendaria: Dragón', 'Exclusivo PRO: Un dragón mascota para tu lab', 2000, Icons.pets, profile),
                  _buildVipStoreItem(context, ref, 'Estación Hacker', '4 Monitores para programar como un dios', 1500, Icons.desktop_windows, profile),
                  _buildVipStoreItem(context, ref, 'Tema Synthwave PRO', 'Colores de neón ultra brillantes', 1200, Icons.color_lens, profile),
                ],
              ),
              loading: () => const SizedBox.shrink(),
              error: (_, __) => const SizedBox.shrink(),
            ),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomNav(context),
    );
  }

  Widget _buildThemeItem(BuildContext context, WidgetRef ref, String title, String description, int cost, IconData icon, Map<String, dynamic>? profile) {
    final inventory = List<String>.from(profile?['inventory'] ?? []);
    final isOwned = inventory.contains(title);
    final hasEnough = profile != null && profile['crystals'] >= cost;
    final currentTheme = ref.watch(editorThemeProvider);
    final isEquipped = currentTheme == title;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
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
            child: Icon(icon, color: AppColors.primary, size: 32),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 13),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          if (isEquipped)
            ElevatedButton(
              onPressed: null,
              style: ElevatedButton.styleFrom(
                disabledBackgroundColor: Colors.grey.withOpacity(0.2),
                disabledForegroundColor: Colors.grey,
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              child: const Text('Equipado', style: TextStyle(fontWeight: FontWeight.bold)),
            )
          else if (isOwned || title == 'Tema Default')
            ElevatedButton(
              onPressed: () {
                ref.read(editorThemeProvider.notifier).setTheme(title);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.accent.withOpacity(0.2),
                foregroundColor: AppColors.accent,
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              child: const Text('Equipar', style: TextStyle(fontWeight: FontWeight.bold)),
            )
          else
            ElevatedButton(
              onPressed: hasEnough ? () => _buyItem(context, ref, title, cost) : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.secondary.withOpacity(0.2),
                foregroundColor: AppColors.secondary,
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.diamond, size: 16),
                  const SizedBox(width: 4),
                  Text(cost.toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildBoostItem(BuildContext context, WidgetRef ref, String title, String description, int cost, IconData icon, Map<String, dynamic>? profile) {
    final inventory = List<String>.from(profile?['inventory'] ?? []);
    final count = inventory.where((i) => i == title).length;
    final hasEnough = profile != null && profile['crystals'] >= cost;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
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
            child: Icon(icon, color: AppColors.primary, size: 32),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 13),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Column(
            children: [
              if (count > 0 && title != 'Escudo de Racha')
                ElevatedButton(
                  onPressed: () => _useItem(context, ref, title),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.accent,
                    foregroundColor: AppColors.surface,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  ),
                  child: Text('Usar ($count)', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                ),
              if (count > 0 && title == 'Escudo de Racha')
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.blueAccent.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text('Automático ($count)', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.blueAccent)),
                ),
              if (count > 0) const SizedBox(height: 8),
              ElevatedButton(
                onPressed: hasEnough ? () => _buyItem(context, ref, title, cost) : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.secondary.withOpacity(0.2),
                  foregroundColor: AppColors.secondary,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.diamond, size: 16),
                    const SizedBox(width: 4),
                    Text(cost.toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLabStoreItem(BuildContext context, WidgetRef ref, String title, String description, int cost, IconData icon, Map<String, dynamic>? profile) {
    final inventory = List<String>.from(profile?['inventory'] ?? []);
    final count = inventory.where((i) => i == title).length;
    final hasEnough = profile != null && profile['crystals'] >= cost;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
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
            child: Icon(icon, color: AppColors.primary, size: 32),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.inter(color: AppColors.textPrimary, fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: GoogleFonts.inter(color: AppColors.textSecondary, fontSize: 13),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Column(
            children: [
              if (count > 0)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text('Comprado', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.primary)),
                )
              else
                ElevatedButton(
                  onPressed: hasEnough ? () => _buyItem(context, ref, title, cost) : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.secondary.withOpacity(0.2),
                    foregroundColor: AppColors.secondary,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.diamond, size: 16),
                      const SizedBox(width: 4),
                      Text(cost.toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildVipStoreItem(BuildContext context, WidgetRef ref, String title, String description, int cost, IconData icon, Map<String, dynamic>? profile) {
    final inventory = List<String>.from(profile?['inventory'] ?? []);
    final count = inventory.where((i) => i == title).length;
    final hasEnough = profile != null && profile['crystals'] >= cost;
    final isPremium = profile?['user']?['plan'] == 'PREMIUM';
    
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.amber.withOpacity(0.5)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.amber.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.amber, size: 32),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: GoogleFonts.inter(color: Colors.amber.withOpacity(0.8), fontSize: 13),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Column(
            children: [
              if (!isPremium)
                ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const PremiumScreen()),
                    );
                  },
                  icon: const Icon(Icons.lock, size: 16, color: Colors.black),
                  label: const Text('PRO', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  ),
                )
              else if (count > 0)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text('Comprado', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppColors.primary)),
                )
              else
                ElevatedButton(
                  onPressed: hasEnough ? () => _buyItem(context, ref, title, cost) : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber.withOpacity(0.2),
                    foregroundColor: Colors.amber,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.diamond, size: 16),
                      const SizedBox(width: 4),
                      Text(cost.toString(), style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _buyItem(BuildContext context, WidgetRef ref, String item, int cost) async {
    final client = ref.read(graphqlClientProvider);
    const query = r'''
      mutation SpendCrystals($userId: String!, $amount: Int!, $itemName: String!) {
        spendCrystals(userId: $userId, amount: $amount, itemName: $itemName) {
          crystals
          inventory
          activeBoosts
        }
      }
    ''';
    
    try {
      final result = await client.mutate(MutationOptions(
        document: gql(query),
        variables: {
          'userId': ref.read(authUserIdProvider),
          'amount': cost,
          'itemName': item,
        },
      ));

      if (result.hasException) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: ${result.exception.toString()}')));
        throw Exception(result.exception.toString());
      }

      if (!context.mounted) return;
      ref.invalidate(gamificationProfileProvider(ref.read(authUserIdProvider)));
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('¡Has comprado $item!')),
      );
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al comprar: $e')),
      );
    }
  }

  Future<void> _useItem(BuildContext context, WidgetRef ref, String item) async {
    final client = ref.read(graphqlClientProvider);
    const query = r'''
      mutation UseItem($userId: String!, $itemName: String!) {
        useItem(userId: $userId, itemName: $itemName) {
          crystals
          inventory
          activeBoosts
        }
      }
    ''';

    try {
      final userId = ref.read(authUserIdProvider);
      final result = await client.mutate(
        MutationOptions(
          document: gql(query),
          variables: {
            'userId': userId,
            'itemName': item,
          },
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception.toString());
      }

      if (!context.mounted) return;
      ref.invalidate(gamificationProfileProvider(userId));
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('¡Has usado $item!')),
      );
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al usar el objeto: $e')),
      );
    }
  }

  Widget _buildBottomNav(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: AppColors.background,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
      currentIndex: 2,
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 0) context.go('/');
        if (index == 1) context.go('/lab');
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
