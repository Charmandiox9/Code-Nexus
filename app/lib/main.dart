import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'core/theme/app_theme.dart';
import 'core/router/app_router.dart';
import 'core/network/graphql_provider.dart';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'core/providers/auth_provider.dart';
import 'core/services/local_notifications_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  // Inicialización para Hive y GraphQL
  await initHiveForFlutter();
  
  // Inicializar notificaciones locales
  await LocalNotificationsService().init();
  
  final prefs = await SharedPreferences.getInstance();
  
  runApp(ProviderScope(
    overrides: [
      sharedPreferencesProvider.overrideWithValue(prefs),
    ],
    child: const CodeNexusApp(),
  ));
}

class CodeNexusApp extends ConsumerWidget {
  const CodeNexusApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);
    final client = ref.watch(graphqlClientProvider);
    
    final ValueNotifier<GraphQLClient> clientNotifier = ValueNotifier(client);

    return GraphQLProvider(
      client: clientNotifier,
      child: MaterialApp.router(
        title: 'CodeNexus',
        theme: AppTheme.darkTheme, // Aplicamos el tema premium oscuro
        themeMode: ThemeMode.dark, // Forzamos el modo oscuro por diseño
        routerConfig: router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
