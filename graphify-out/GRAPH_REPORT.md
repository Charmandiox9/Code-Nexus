# Graph Report - C:\Users\Charm\Documents\GitHub\CodeNexus  (2026-07-25)

## Corpus Check
- Large corpus: 203 files · ~614,550 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 989 nodes · 1547 edges · 109 communities (55 shown, 54 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Backend Addcrystalsnest
- App Windows Flutter
- Backend Src Modules
- App Lib Core
- Any
- App Lib Features
- Backend Src Database
- Backend Package
- App Lib Features
- Backend Prisma Seed
- App Linux Flutter
- App Lib Features
- Backend Src Modules
- App Lib Core
- Backend Tsconfig
- App Lib Features
- App Lib Features
- App Colors Dart
- App Lib Features
- Backend Src Modules
- App Lib Features
- App Lib Core
- App Lib Core
- App Lib Features
- App Windows Runner
- App Lib Core
- App Web Manifest
- Backend Src App
- Backend Workers Python
- App Lib Features
- Backend Package Devdependencies
- App Lib Main
- Backend Tsconfig Build
- Amqp Connection Manager
- App Ios Flutter
- App Ios Runner
- App Lib Core
- Backend Nest Cli
- App Android App
- App Android Gradlew
- App Android App
- App Ios Flutter
- App Lib Features
- App Lib Features
- App Lib Features
- Backend Queryuser
- Apollo Server
- App Ios Flutter
- App Macos Flutter
- As Integrations Express5
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Dependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Package Devdependencies
- Backend Updatedb
- None String

## God Nodes (most connected - your core abstractions)
1. `authUserIdProvider` - 27 edges
2. `Win32Window` - 22 edges
3. `compilerOptions` - 22 edges
4. `GamificationService` - 19 edges
5. `GamificationProfile` - 18 edges
6. `graphqlClientProvider` - 16 edges
7. `PrismaService` - 15 edges
8. `gamificationProfileProvider` - 14 edges
9. `User` - 14 edges
10. `scripts` - 13 edges

## Surprising Connections (you probably didn't know these)
- `_fetchMentorHint` --references--> `graphqlClientProvider`  [EXTRACTED]
  app/lib/features/ide/presentation/screens/ide_screen.dart → app/lib/core/network/graphql_provider.dart
- `_runCode` --references--> `authUserIdProvider`  [EXTRACTED]
  app/lib/features/ide/presentation/screens/ide_screen.dart → app/lib/core/providers/auth_provider.dart
- `_buildLevelNode` --references--> `authUserIdProvider`  [EXTRACTED]
  app/lib/features/learning/presentation/screens/learning_map_screen.dart → app/lib/core/providers/auth_provider.dart
- `_buildSandboxContent` --references--> `languageProvider`  [EXTRACTED]
  app/lib/features/lab/presentation/screens/lab_screen.dart → app/lib/core/providers/language_provider.dart
- `wWinMain()` --calls--> `CreateAndAttachConsole()`  [INFERRED]
  app/windows/runner/main.cpp → app/windows/runner/utils.cpp

## Import Cycles
- None detected.

## Communities (109 total, 54 thin omitted)

### Community 0 - "Backend Addcrystalsnest"
Cohesion: 0.05
Nodes (50): bootstrap(), bootstrap(), AppModule, Module, bootstrap(), SubmitCodeInput, Field, InputType (+42 more)

### Community 1 - "App Windows Flutter"
Cohesion: 0.06
Nodes (53): RegisterPlugins(), DartProject, HWND, LPARAM, LRESULT, UINT, WPARAM, FlutterWindow (+45 more)

### Community 2 - "Backend Src Modules"
Cohesion: 0.08
Nodes (25): CreateUserInput, Field, InputType, LoginWithGoogleInput, Field, InputType, LoginInput, Field (+17 more)

### Community 3 - "App Lib Core"
Cohesion: 0.09
Nodes (49): graphqlClientProvider, authTokenProvider, authUserIdProvider, languageProvider, appRouterProvider, _LoginScreenState, _performRealLogin, gamificationProfileProvider (+41 more)

### Community 4 - "Any"
Cohesion: 0.05
Nodes (30): Any, AppDelegate, Bool, SceneDelegate, RunnerTests, RegisterGeneratedPlugins(), AppDelegate, Bool (+22 more)

### Community 5 - "App Lib Features"
Cohesion: 0.05
Nodes (38): build, _buildAppBar, _buildDebuggerHeader, _buildMemoryBlock, _buildMemoryBlockMobile, _buildMentorCard, _buildTerminalOutput, _buildTerminalOutputMobile (+30 more)

### Community 6 - "Backend Src Database"
Cohesion: 0.08
Nodes (20): DatabaseModule, Module, PrismaService, Injectable, LearningModule, Module, LearningResolver, Query (+12 more)

### Community 7 - "Backend Package"
Cohesion: 0.06
Nodes (34): author, description, jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment (+26 more)

### Community 8 - "App Lib Features"
Cohesion: 0.06
Nodes (32): _buildArcade, _buildCoffeeMaker, _buildDesk, _buildLabItem, _buildLanguageFigurine, _buildLanguagePoster, _buildMonitor, _buildPetItem (+24 more)

### Community 9 - "Backend Prisma Seed"
Cohesion: 0.17
Nodes (18): adapter, main(), pool, prisma, getCSeed(), getCppSeed(), getJavaSeed(), getJavascriptSeed() (+10 more)

### Community 10 - "App Linux Flutter"
Cohesion: 0.09
Nodes (22): fl_register_plugins(), main(), first_frame_cb(), my_application_activate(), my_application_class_init(), my_application_dispose(), my_application_init(), my_application_local_command_line() (+14 more)

### Community 11 - "App Lib Features"
Cohesion: 0.08
Nodes (24): build, _buildHeaderBadge, _buildSandboxContent, _buildVisualDebugger, _buildVisualDebuggerMobile, _codeController, _completedMissions, createState (+16 more)

### Community 12 - "Backend Src Modules"
Cohesion: 0.14
Nodes (7): SocialResolver, Args, Mutation, Query, Resolver, SocialService, Injectable

### Community 13 - "App Lib Core"
Cohesion: 0.10
Nodes (21): AuthTokenNotifier, AuthUserIdNotifier, build, sharedPreferencesProvider, LanguageNotifier, accent, background, build (+13 more)

### Community 14 - "Backend Tsconfig"
Cohesion: 0.09
Nodes (22): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+14 more)

### Community 15 - "App Lib Features"
Cohesion: 0.12
Nodes (17): build, client, language, leaderboardLanguageProvider, leaderboardProvider, result, setLanguage, socialFeedProvider (+9 more)

### Community 16 - "App Lib Features"
Cohesion: 0.11
Nodes (17): _buildAchievementsGrid, _buildCodePet, _buildMasteryList, _buildSectionTitle, _buildStatCard, _calculateLanguageMastery, _calculateSkillsDomain, createState (+9 more)

### Community 17 - "App Colors Dart"
Cohesion: 0.14
Nodes (14): app_colors.dart, AppTheme, build, _buildFeatureTile, createState, _isLoading, _buildBoostItem, _buildLabStoreItem (+6 more)

### Community 18 - "App Lib Features"
Cohesion: 0.12
Nodes (15): _buildHeaderBadge, _buildLevelNode, _buildPathLine, _buildSectionHeader, createState, _getIconColor, _getLangColor, _getLangIcon (+7 more)

### Community 19 - "Backend Src Modules"
Cohesion: 0.20
Nodes (8): MentorModule, Module, MentorResolver, Args, Query, Resolver, MentorService, Injectable

### Community 20 - "App Lib Features"
Cohesion: 0.15
Nodes (12): client, query, result, client, query, result, main, core/network/graphql_provider.dart (+4 more)

### Community 21 - "App Lib Core"
Cohesion: 0.14
Nodes (12): build, _loadFromPrefs, setLanguage, build, createState, _googleSignIn, _isLoading, loginMutation (+4 more)

### Community 22 - "App Lib Core"
Cohesion: 0.15
Nodes (12): accent, AppColors, background, error, primary, secondary, surface, surfaceHighlight (+4 more)

### Community 23 - "App Lib Features"
Cohesion: 0.33
Nodes (12): _checkAuth, _buildBottomNav, _buildBottomNav, _buildBottomNav, _buildBottomNav, _buildBottomNav, Route /, Route /lab (+4 more)

### Community 24 - "App Windows Runner"
Cohesion: 0.24
Nodes (9): wWinMain(), string, wchar_t, CreateAndAttachConsole(), GetCommandLineArguments(), Utf8FromUtf16(), _In_, _In_opt_ (+1 more)

### Community 25 - "App Lib Core"
Cohesion: 0.18
Nodes (10): state, ../../features/auth/presentation/screens/login_screen.dart, ../../features/auth/presentation/screens/splash_screen.dart, ../../features/ide/presentation/screens/ide_screen.dart, ../../features/lab/presentation/screens/lab_screen.dart, ../../features/learning/presentation/screens/learning_map_screen.dart, ../../features/profile/presentation/screens/profile_screen.dart, ../../features/social/presentation/screens/social_screen.dart (+2 more)

### Community 26 - "App Web Manifest"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, prefer_related_applications, short_name (+2 more)

### Community 27 - "Backend Src App"
Cohesion: 0.29
Nodes (5): AppController, AppService, Injectable, Controller, Get

### Community 28 - "Backend Workers Python"
Cohesion: 0.33
Nodes (10): execute_code(), execute_cpp(), execute_java(), execute_javascript(), execute_rust(), execute_sql(), execute_typescript(), main() (+2 more)

### Community 29 - "App Lib Features"
Cohesion: 0.22
Nodes (9): build, createState, initState, SplashScreen, _SplashScreenState, ../../../../core/theme/app_colors.dart, package:go_router/go_router.dart, State (+1 more)

### Community 30 - "Backend Package Devdependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, @eslint/js, @nestjs/schematics, @nestjs/testing, eslint, @eslint/js, @nestjs/schematics (+1 more)

### Community 31 - "App Lib Main"
Cohesion: 0.25
Nodes (7): initHiveForFlutter, load, main, prefs, core/providers/auth_provider.dart, core/router/app_router.dart, core/theme/app_theme.dart

### Community 32 - "Backend Tsconfig Build"
Cohesion: 0.25
Nodes (7): exclude, extends, dist, node_modules, **/*spec.ts, test, ./tsconfig.json

### Community 33 - "Amqp Connection Manager"
Cohesion: 0.29
Nodes (7): amqp-connection-manager, amqplib, dependencies, amqp-connection-manager, amqplib, @nestjs/core, @nestjs/core

### Community 34 - "App Ios Flutter"
Cohesion: 0.33
Nodes (5): handle_new_rx_page(), __lldb_init_module(), Intercept NOTIFY_DEBUGGER_ABOUT_RX_PAGES and touch the pages., SBDebugger, SBFrame

### Community 35 - "App Ios Runner"
Cohesion: 0.40
Nodes (3): GeneratedPluginRegistrant, +registerWithRegistry, NSObject

### Community 36 - "App Lib Core"
Cohesion: 0.33
Nodes (5): httpLink, GraphQLClient, HttpLink, package:flutter_dotenv/flutter_dotenv.dart, package:flutter/foundation.dart

### Community 37 - "Backend Nest Cli"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 38 - "App Android App"
Cohesion: 0.60
Nodes (3): GeneratedPluginRegistrant, FlutterEngine, Keep

### Community 39 - "App Android Gradlew"
Cohesion: 0.60
Nodes (3): gradlew script, die(), warn()

### Community 42 - "App Lib Features"
Cohesion: 0.67
Nodes (3): AutoIndentFormatter, AutoIndentFormatter, TextInputFormatter

### Community 43 - "App Lib Features"
Cohesion: 0.67
Nodes (3): _buildCodeEditor, editorThemeDataProvider, _buildCodeEditor

## Knowledge Gaps
- **314 isolated node(s):** `flutter_export_environment.sh script`, `+registerWithRegistry`, `httpLink`, `build`, `_loadFromPrefs` (+309 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Backend Package Devdependencies` to `Backend Package`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`, `Backend Package Devdependencies`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Amqp Connection Manager` to `Backend Package`, `Apollo Server`, `As Integrations Express5`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`, `Backend Package Dependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `FlutterWindow` connect `App Windows Flutter` to `Any`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `flutter_export_environment.sh script`, `+registerWithRegistry`, `httpLink` to the rest of the system?**
  _314 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Backend Addcrystalsnest` be split into smaller, more focused modules?**
  _Cohesion score 0.05238095238095238 - nodes in this community are weakly interconnected._
- **Should `App Windows Flutter` be split into smaller, more focused modules?**
  _Cohesion score 0.0597567424643046 - nodes in this community are weakly interconnected._
- **Should `Backend Src Modules` be split into smaller, more focused modules?**
  _Cohesion score 0.08489795918367347 - nodes in this community are weakly interconnected._