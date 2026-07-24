import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/learning/presentation/screens/learning_map_screen.dart';
import '../../features/ide/presentation/screens/ide_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';
import '../../features/store/presentation/screens/store_screen.dart';
import '../../features/lab/presentation/screens/lab_screen.dart';
import '../../features/social/presentation/screens/social_screen.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';

// Definición simple del router de GoRouter
final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(
        path: '/splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/',
        builder: (context, state) => const LearningMapScreen(),
      ),
      GoRoute(
        path: '/ide',
        builder: (context, state) {
          final lessonId = state.uri.queryParameters['lessonId'] ?? 'sandbox';
          final language = state.uri.queryParameters['language'] ?? 'python';
          final extra = state.extra as Map<String, dynamic>? ?? {};
          return IdeScreen(
            lessonId: lessonId,
            language: language,
            title: extra['title'] ?? 'Desafío de Código',
            initialCode: extra['initialCode'] ?? '',
            instructions: extra['instructions'] ?? 'Escribe tu código',
            expectedOutput: extra['expectedOutput'],
            theory: extra['theory'],
            rewardXp: extra['rewardXp'],
            rewardCrystals: extra['rewardCrystals'],
            quizOptions: extra['quizOptions'] != null ? List<String>.from(extra['quizOptions']) : null,
            correctOptionIndex: extra['correctOptionIndex'],
          );
        },
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/store',
        builder: (context, state) => const StoreScreen(),
      ),
      GoRoute(
        path: '/lab',
        builder: (context, state) => const LabScreen(),
      ),
      GoRoute(
        path: '/social',
        builder: (context, state) => const SocialScreen(),
      ),
    ],
  );
});
