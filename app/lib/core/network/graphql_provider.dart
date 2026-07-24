import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:flutter_dotenv/flutter_dotenv.dart';

// Configuración de la URL
String get _graphqlEndpoint {
  return dotenv.env['API_URL'] ?? 'http://10.0.2.2:3000/graphql';
}

final graphqlClientProvider = Provider<GraphQLClient>((ref) {
  final HttpLink httpLink = HttpLink(_graphqlEndpoint);

  return GraphQLClient(
    cache: GraphQLCache(store: HiveStore()),
    link: httpLink,
  );
});
