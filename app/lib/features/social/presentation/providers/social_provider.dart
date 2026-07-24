import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/graphql_provider.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../../../../core/providers/auth_provider.dart';

final socialFeedProvider = FutureProvider<List<dynamic>>((ref) async {
  final client = ref.read(graphqlClientProvider);
  final userId = ref.read(authUserIdProvider);

  final result = await client.query(QueryOptions(
    document: gql(r'''
      query GetFriendActivityFeed($userId: String!) {
        getFriendActivityFeed(userId: $userId)
      }
    '''),
    variables: {
      'userId': userId,
    },
    fetchPolicy: FetchPolicy.noCache,
  ));

  if (result.hasException) {
    throw result.exception!;
  }
  return (result.data?['getFriendActivityFeed'] as List?) ?? [];
});

class LeaderboardLanguageNotifier extends Notifier<String> {
  @override
  String build() => 'python';

  void setLanguage(String lang) {
    state = lang;
  }
}

final leaderboardLanguageProvider = NotifierProvider<LeaderboardLanguageNotifier, String>(() {
  return LeaderboardLanguageNotifier();
});

final leaderboardProvider = FutureProvider<List<dynamic>>((ref) async {
  final client = ref.read(graphqlClientProvider);
  final language = ref.watch(leaderboardLanguageProvider);
  final userId = ref.read(authUserIdProvider);

  final result = await client.query(QueryOptions(
    document: gql(r'''
      query GetLeaderboard($userId: String!, $language: String) {
        getLeaderboard(userId: $userId, language: $language)
      }
    '''),
    variables: {
      'userId': userId,
      'language': language,
    },
    fetchPolicy: FetchPolicy.noCache,
  ));

  if (result.hasException) {
    throw result.exception!;
  }
  return (result.data?['getLeaderboard'] as List?) ?? [];
});
