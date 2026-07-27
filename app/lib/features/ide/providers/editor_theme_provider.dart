import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/theme/app_colors.dart';

class EditorThemeData {
  final Color background;
  final Color textPrimary;
  final Color surface;
  final Color surfaceHighlight;
  final Color primary;
  final Color accent;
  
  EditorThemeData({
    required this.background,
    required this.textPrimary,
    required this.surface,
    required this.surfaceHighlight,
    required this.primary,
    required this.accent,
  });
}

class EditorThemeNotifier extends Notifier<String> {
  @override
  String build() {
    _loadTheme();
    return 'Default';
  }

  Future<void> _loadTheme() async {
    final prefs = await SharedPreferences.getInstance();
    state = prefs.getString('editor_theme') ?? 'Default';
  }

  Future<void> setTheme(String themeName) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('editor_theme', themeName);
    state = themeName;
  }
}

final editorThemeProvider = NotifierProvider<EditorThemeNotifier, String>(() {
  return EditorThemeNotifier();
});

final editorThemeDataProvider = Provider<EditorThemeData>((ref) {
  final themeName = ref.watch(editorThemeProvider);
  switch (themeName) {
    case 'Tema Cyberpunk':
      return EditorThemeData(
        background: const Color(0xFF0F0A1F), // Dark purple
        textPrimary: const Color(0xFFFF00FF), // Neon Pink
        surface: const Color(0xFF1A1138),
        surfaceHighlight: const Color(0xFF00FFFF), // Cyan
        primary: const Color(0xFFFF00FF),
        accent: const Color(0xFF00FFFF),
      );
    case 'Tema Matrix':
      return EditorThemeData(
        background: const Color(0xFF000000), // Black
        textPrimary: const Color(0xFF00FF41), // Matrix Green
        surface: const Color(0xFF0D0D0D),
        surfaceHighlight: const Color(0xFF008F11),
        primary: const Color(0xFF00FF41),
        accent: const Color(0xFF008F11),
      );
    case 'Tema Dracula':
      return EditorThemeData(
        background: const Color(0xFF282A36),
        textPrimary: const Color(0xFFF8F8F2),
        surface: const Color(0xFF44475A),
        surfaceHighlight: const Color(0xFF6272A4),
        primary: const Color(0xFFFF79C6),
        accent: const Color(0xFFBD93F9),
      );
    case 'Tema Synthwave':
      return EditorThemeData(
        background: const Color(0xFF262335),
        textPrimary: const Color(0xFFFF7EDB),
        surface: const Color(0xFF241B2F),
        surfaceHighlight: const Color(0xFF362749),
        primary: const Color(0xFFFE4450),
        accent: const Color(0xFFF97E72),
      );
    default:
      return EditorThemeData(
        background: AppColors.background,
        textPrimary: AppColors.textPrimary,
        surface: AppColors.surface,
        surfaceHighlight: AppColors.surfaceHighlight,
        primary: AppColors.primary,
        accent: AppColors.accent,
      );
  }
});
