import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/network/graphql_provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';

class PremiumScreen extends ConsumerStatefulWidget {
  const PremiumScreen({super.key});

  @override
  ConsumerState<PremiumScreen> createState() => _PremiumScreenState();
}

class _PremiumScreenState extends ConsumerState<PremiumScreen> {
  bool _isLoading = false;

  Future<void> _upgradeToPremium() async {
    setState(() {
      _isLoading = true;
    });

    final client = ref.read(graphqlClientProvider);
    final userId = ref.read(authUserIdProvider);

    const mutation = '''
      mutation Upgrade(\$userId: String!) {
        upgradeToPremium(userId: \$userId) {
          id
          plan
        }
      }
    ''';

    final result = await client.mutate(
      MutationOptions(
        document: gql(mutation),
        variables: {'userId': userId},
      ),
    );

    setState(() {
      _isLoading = false;
    });

    if (result.hasException) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: \${result.exception.toString()}')),
      );
      return;
    }

    // Refresh profile to reflect new plan
    ref.invalidate(gamificationProfileProvider(userId));

    if (mounted) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: AppColors.surface,
          title: Text('¡Bienvenido a CodeNexus PRO!', style: GoogleFonts.inter(color: AppColors.accent, fontWeight: FontWeight.bold)),
          content: Text('Disfruta de ventajas exclusivas, tutor IA, x2 XP permanente y más.', style: GoogleFonts.inter(color: Colors.white)),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                if (mounted) {
                  context.pop();
                }
              },
              child: Text('Empezar', style: GoogleFonts.inter(color: AppColors.primary)),
            )
          ],
        )
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('CodeNexus Pro', style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const Icon(Icons.diamond, size: 80, color: AppColors.accent),
            const SizedBox(height: 16),
            Text('Sube de nivel tu aprendizaje', style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center),
            const SizedBox(height: 8),
            Text('Desbloquea lenguajes avanzados, IA, y ventajas estéticas.', style: GoogleFonts.inter(color: AppColors.textSecondary), textAlign: TextAlign.center),
            const SizedBox(height: 32),
            
            _buildFeatureTile(Icons.code, 'Rutas Exclusivas', 'Java, C++, TypeScript, Rust y SQL.'),
            _buildFeatureTile(Icons.psychology, 'Tutor IA (NexBot)', 'Pistas inteligentes para destrabarte sin darte la respuesta.'),
            _buildFeatureTile(Icons.bolt, 'XP y Cristales x2', 'Escala en los leaderboards el doble de rápido de forma permanente.'),
            _buildFeatureTile(Icons.store, 'Tienda VIP', 'Temas de editor legendarios y mascotas exclusivas.'),
            _buildFeatureTile(Icons.shield, 'Reparador de Racha', 'Salva tu racha una vez al mes si olvidas entrar.'),
            
            const SizedBox(height: 48),
            
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _upgradeToPremium,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.accent,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: _isLoading 
                  ? const CircularProgressIndicator(color: Colors.white) 
                  : Text('Adquirir CodeNexus Pro', style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureTile(IconData icon, String title, String description) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.accent.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppColors.accent, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 4),
                Text(description, style: GoogleFonts.inter(fontSize: 14, color: AppColors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
