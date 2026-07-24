import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/network/graphql_provider.dart';

final learningMapProvider = FutureProvider<List<dynamic>>((ref) async {
  final client = ref.read(graphqlClientProvider);

  const query = r'''
    query GetConcepts {
      concepts {
        id
        title
        description
        orderIndex
        lessons {
          id
          title
          type
          xpReward
          content {
            instructions
            initialCode
            expectedOutput
            theory
          }
          language {
            slug
          }
        }
      }
    }
  ''';

  final result = await client.query(
    QueryOptions(
      document: gql(query),
      fetchPolicy: FetchPolicy.networkOnly,
    ),
  );

  if (result.hasException) {
    throw Exception(result.exception.toString());
  }

  return result.data?['concepts'] ?? [];
});
