import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/network/graphql_provider.dart';

final gamificationProfileProvider = FutureProvider.family<Map<String, dynamic>?, String>((ref, userId) async {
  if (userId.isEmpty) return null;

  final client = ref.watch(graphqlClientProvider);

  const query = '''
    query GetProfile(\$userId: String!) {
      gamificationProfile(userId: \$userId) {
        id
        level
        xp
        credits
        crystals
        currentStreak
        completedLessons
        inventory
        activeBoosts
        skills
        user {
          id
          email
          username
          avatarUrl
          plan
        }
        titles {
          isEquipped
          title {
            id
            name
            description
          }
        }
        achievements {
          achievement {
            id
            name
            description
            icon
          }
        }
        pets {
          id
          name
          type
          languageId
          level
          happiness
          health
          xp
          evolutionStage
          isEquipped
        }
        labItems {
          isEquipped
          item {
            id
            name
            description
            type
          }
        }
      }
    }
  ''';

  print("Ejecutando query GetProfile para userId: $userId");
  final result = await client.query(
    QueryOptions(
      document: gql(query),
      variables: {'userId': userId},
      fetchPolicy: FetchPolicy.networkOnly,
    ),
  );
  
  print("Resultado de la query obtenido. Tiene excepcion? ${result.hasException}");

  if (result.hasException) {
    print("Excepcion: ${result.exception}");
    throw result.exception!;
  }

  print("Data: ${result.data}");
  return result.data?['gamificationProfile'];
});
