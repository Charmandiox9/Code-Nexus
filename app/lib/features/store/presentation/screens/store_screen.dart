import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../../core/network/graphql_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';

const String _getStoreQuery = '''
  query GetDailyStore {
    getDailyStore {
      id
      name
      description
      type
      price
      rarity
      imageUrl
      isRotative
    }
  }
''';

const String _buyItemMutation = '''
  mutation BuyStoreItem(\$userId: String!, \$itemId: String!) {
    buyStoreItem(userId: \$userId, itemId: \$itemId) {
      id
      crystals
      inventory
    }
  }
''';

const String _useItemMutation = '''
  mutation UseItem(\$userId: String!, \$itemName: String!) {
    useItem(userId: \$userId, itemName: \$itemName) {
      id
      inventory
      xpMultiplier
      xpMultiplierUntil
    }
  }
''';

class StoreScreen extends ConsumerStatefulWidget {
  const StoreScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<StoreScreen> createState() => _StoreScreenState();
}

class _StoreScreenState extends ConsumerState<StoreScreen> {
  List<dynamic> _storeItems = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadStoreItems();
  }

  Future<void> _loadStoreItems() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final client = ref.read(graphqlClientProvider);
      final result = await client.query(
        QueryOptions(
          document: gql(_getStoreQuery),
          fetchPolicy: FetchPolicy.networkOnly,
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception.toString());
      }

      if (mounted) {
        setState(() {
          _storeItems = result.data?['getDailyStore'] ?? [];
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = 'Error cargando la tienda: \$e';
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _buyItem(String itemId, int price) async {
    final client = ref.read(graphqlClientProvider);
    final userId = ref.read(authUserIdProvider);
    if (userId == null) return;

    final profile = ref.read(gamificationProfileProvider(userId)).value;
    if (profile == null) return;

    if ((profile['crystals'] as int? ?? 0) < price) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('No tienes suficientes cristales', style: GoogleFonts.inter()),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    try {
      final result = await client.mutate(
        MutationOptions(
          document: gql(_buyItemMutation),
          variables: {
            'userId': userId,
            'itemId': itemId,
          },
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception.toString());
      }

      // Invalidate to refresh crystals and inventory
      ref.invalidate(gamificationProfileProvider(userId));

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('¡Compra realizada con éxito!', style: GoogleFonts.inter()),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al comprar: \$e', style: GoogleFonts.inter()),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  Future<void> _useItem(String itemName) async {
    final client = ref.read(graphqlClientProvider);
    final userId = ref.read(authUserIdProvider);
    if (userId == null) return;

    try {
      final result = await client.mutate(
        MutationOptions(
          document: gql(_useItemMutation),
          variables: {
            'userId': userId,
            'itemName': itemName,
          },
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception.toString());
      }

      ref.invalidate(gamificationProfileProvider(userId));

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('¡Ítem usado con éxito!', style: GoogleFonts.inter()),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al usar ítem: \$e', style: GoogleFonts.inter()),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    }
  }

  Color _getRarityColor(String rarity) {
    switch (rarity) {
      case 'LEGENDARY':
        return Colors.orangeAccent;
      case 'EPIC':
        return Colors.purpleAccent;
      case 'RARE':
        return Colors.lightBlueAccent;
      case 'COMMON':
      default:
        return Colors.grey;
    }
  }

  String _getTypeLabel(String type) {
    switch (type) {
      case 'THEME': return 'Tema de Editor';
      case 'LAB_ITEM': return 'Ítem de Laboratorio';
      case 'PET_ACCESSORY': return 'Accesorio de Mascota';
      default: return 'Objeto';
    }
  }

  @override
  Widget build(BuildContext context) {
    final userId = ref.watch(authUserIdProvider);
    final profileAsync = ref.watch(gamificationProfileProvider(userId ?? ''));

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('Tienda Nexus', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          profileAsync.when(
            data: (profile) {
              if (profile == null) return const SizedBox.shrink();
              final crystals = profile['crystals'] as int? ?? 0;
              final inventory = profile['inventory'] as List<dynamic>? ?? [];
              final shields = inventory.where((i) => i.toString().contains('Escudo')).length;
              return Container(
                margin: const EdgeInsets.only(right: 16),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.surfaceHighlight),
                ),
                child: Row(
                  children: [
                    if (shields > 0) ...[
                      const Icon(Icons.security, color: Colors.orangeAccent, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        '$shields',
                        style: GoogleFonts.inter(
                          color: Colors.orangeAccent,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 12),
                    ],
                    const Icon(Icons.diamond, color: Colors.cyanAccent, size: 16),
                    const SizedBox(width: 6),
                    Text(
                      '$crystals',
                      style: GoogleFonts.inter(
                        color: Colors.cyanAccent,
                        fontWeight: FontWeight.bold,
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
      bottomNavigationBar: _buildBottomNav(context),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: Colors.red)))
              : RefreshIndicator(
                  onRefresh: _loadStoreItems,
                  color: AppColors.primary,
                  child: ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      Container(
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [AppColors.primary.withOpacity(0.8), AppColors.secondary.withOpacity(0.8)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Ofertas del Día',
                              style: GoogleFonts.inter(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Descubre ítems especiales y permanentes.',
                              style: GoogleFonts.inter(
                                fontSize: 14,
                                color: Colors.white.withOpacity(0.9),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),
                      Text('Ítems Permanentes', style: GoogleFonts.inter(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      _buildItemGrid(_storeItems.where((i) => i['isRotative'] == false).toList(), profileAsync),
                      const SizedBox(height: 32),
                      Text('Ofertas del Día', style: GoogleFonts.inter(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      _buildItemGrid(_storeItems.where((i) => i['isRotative'] == true).toList(), profileAsync),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
    );
  }

  Widget _buildItemGrid(List<dynamic> items, AsyncValue<dynamic> profileAsync) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 0.58,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        final rarityColor = _getRarityColor(item['rarity']);
        
        bool alreadyOwned = false;
        int ownedCount = 0;
        profileAsync.whenData((p) {
          final inv = p?['inventory'] as List<dynamic>? ?? [];
          if (item['type'] == 'BOOST' || item['type'] == 'CONSUMABLE' || item['type'] == 'OTHER' || item['name'].contains('Escudo')) {
             ownedCount = inv.where((i) => i == item['name']).length;
             alreadyOwned = false; 
          } else {
             alreadyOwned = inv.contains(item['name']);
          }
        });

        return Container(
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: rarityColor.withOpacity(0.5), width: 2),
            boxShadow: [
              BoxShadow(
                color: rarityColor.withOpacity(0.1),
                blurRadius: 10,
                spreadRadius: 2,
              )
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                decoration: BoxDecoration(
                  color: rarityColor.withOpacity(0.2),
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(14)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        _getTypeLabel(item['type']),
                        style: GoogleFonts.inter(
                          color: rarityColor,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (item['isRotative'] == true)
                      const Icon(Icons.access_time, color: Colors.white70, size: 12),
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Center(
                    child: Icon(
                      item['type'] == 'THEME' ? Icons.color_lens
                          : item['type'] == 'LAB_ITEM' ? Icons.chair
                          : Icons.pets,
                      size: 48,
                      color: Colors.white54,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text(
                  item['name'],
                  style: GoogleFonts.inter(
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 4),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: Text(
                  item['description'],
                  style: GoogleFonts.inter(
                    color: AppColors.textSecondary,
                    fontSize: 10,
                  ),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                ),
              ),
              const Spacer(),
              if (ownedCount > 0 && (item['type'] == 'BOOST' || item['type'] == 'CONSUMABLE' || item['name'].contains('Escudo'))) ...[
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () => _buyItem(item['id'], item['price']),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary,
                            padding: const EdgeInsets.symmetric(horizontal: 4),
                          ),
                          child: Text('Comprar', style: GoogleFonts.inter(fontSize: 12, color: Colors.white)),
                        ),
                      ),
                      const SizedBox(width: 4),
                      if (!item['name'].toString().toLowerCase().contains('escudo'))
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () => _useItem(item['name']),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.secondary,
                              padding: const EdgeInsets.symmetric(horizontal: 4),
                            ),
                            child: Text('Usar ($ownedCount)', style: GoogleFonts.inter(fontSize: 12, color: AppColors.background)),
                          ),
                        )
                      else
                        Expanded(
                          child: Container(
                            alignment: Alignment.center,
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            decoration: BoxDecoration(
                              border: Border.all(color: AppColors.primary.withOpacity(0.5)),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text('Tienes: $ownedCount', style: GoogleFonts.inter(fontSize: 12, color: AppColors.primary, fontWeight: FontWeight.bold)),
                          ),
                        ),
                    ],
                  ),
                ),
              ] else ...[
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ElevatedButton(
                    onPressed: alreadyOwned ? null : () => _buyItem(item['id'], item['price']),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: alreadyOwned ? Colors.grey.shade800 : AppColors.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        if (!alreadyOwned) ...[
                          Text('${item["price"]}', style: GoogleFonts.inter(fontWeight: FontWeight.bold)),
                          const SizedBox(width: 4),
                          const Icon(Icons.diamond, size: 14, color: Colors.cyanAccent),
                        ] else ...[
                          Text('Comprado', style: GoogleFonts.inter(fontWeight: FontWeight.bold)),
                        ]
                      ],
                    ),
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );

  }

  Widget _buildBottomNav(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: AppColors.background,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
      currentIndex: 2, // Tienda
      showUnselectedLabels: true,
      onTap: (index) {
        if (index == 0) context.go('/');
        if (index == 1) context.go('/lab');
        if (index == 2) return; // Ya estamos en tienda
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
