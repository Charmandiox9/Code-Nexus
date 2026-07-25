import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/app_colors.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  bool _isLoading = false;

  final String loginMutation = """
    mutation LoginWithGoogle(\$input: LoginWithGoogleInput!) {
      loginWithGoogle(input: \$input) {
        accessToken
        user {
          id
          username
          avatarUrl
        }
      }
    }
  """;

  final GoogleSignIn _googleSignIn = GoogleSignIn(
    // Este serverClientId es el Web Client ID que creaste en Google Cloud.
    // Permite que Flutter le pida a Google un token válido para el backend.
    serverClientId: '526020637940-khm62cha05g7hj94vod18qoohmcrigc9.apps.googleusercontent.com',
    scopes: ['email', 'profile'],
  );

  Future<void> _performRealLogin() async {
    setState(() => _isLoading = true);
    
    try {
      // 1. Iniciar sesión en Google nativamente
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        // El usuario canceló el flujo de login
        setState(() => _isLoading = false);
        return;
      }

      // 2. Obtener el token de autenticación
      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      final String? idToken = googleAuth.idToken;

      if (idToken == null) {
        throw Exception("No se pudo obtener el ID Token de Google.");
      }

      // 3. Enviar el token al Backend
      final client = GraphQLProvider.of(context).value;
      final options = MutationOptions(
        document: gql(loginMutation),
        variables: {
          'input': {
            'idToken': idToken,
          }
        },
      );

      final result = await client.mutate(options);

      if (result.hasException) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error del servidor: ${result.exception?.graphqlErrors.firstOrNull?.message ?? result.exception.toString()}')));
        await _googleSignIn.signOut();
        setState(() => _isLoading = false);
        return;
      }

      // 4. Guardar datos en local y redirigir
      final data = result.data?['loginWithGoogle'];
      if (data != null) {
        final userId = data['user']['id'];
        final token = data['accessToken'];

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('userId', userId);
        await prefs.setString('token', token);

        ref.read(authUserIdProvider.notifier).set(userId);
        ref.read(authTokenProvider.notifier).set(token);

        if (mounted) {
          context.go('/');
        }
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error de Autenticación: $e')));
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.code, size: 80, color: AppColors.primary),
              const SizedBox(height: 24),
              Text(
                'CodeNexus',
                style: GoogleFonts.inter(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Tu viaje como desarrollador empieza aquí.',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(
                  fontSize: 16,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 64),
              if (_isLoading)
                const CircularProgressIndicator(color: AppColors.primary)
              else
                ElevatedButton.icon(
                  onPressed: _performRealLogin,
                  icon: const Icon(Icons.login, color: Colors.black),
                  label: Text('Iniciar sesión con Google', style: GoogleFonts.inter(color: Colors.black, fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
