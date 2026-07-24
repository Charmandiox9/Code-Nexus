import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) => throw UnimplementedError());

class AuthUserIdNotifier extends Notifier<String> {
  @override
  String build() {
    final prefs = ref.watch(sharedPreferencesProvider);
    return prefs.getString('userId') ?? '';
  }

  void set(String id) {
    state = id;
  }
}

final authUserIdProvider = NotifierProvider<AuthUserIdNotifier, String>(AuthUserIdNotifier.new);

class AuthTokenNotifier extends Notifier<String> {
  @override
  String build() {
    final prefs = ref.watch(sharedPreferencesProvider);
    return prefs.getString('token') ?? '';
  }

  void set(String token) {
    state = token;
  }
}

final authTokenProvider = NotifierProvider<AuthTokenNotifier, String>(AuthTokenNotifier.new);
