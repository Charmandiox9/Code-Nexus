import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/theme/app_colors.dart';
import 'package:flutter/services.dart';
import 'dart:math' as math;
import '../../../../core/providers/auth_provider.dart';
import '../../../gamification/providers/gamification_provider.dart';
import '../../../ide/providers/editor_theme_provider.dart';

class PhysicalLabScreen extends ConsumerStatefulWidget {
  final Map<String, dynamic> profile;
  const PhysicalLabScreen({super.key, required this.profile});

  @override
  ConsumerState<PhysicalLabScreen> createState() => _PhysicalLabScreenState();
}

class _PhysicalLabScreenState extends ConsumerState<PhysicalLabScreen> {
  late List<Map<String, dynamic>> _labItems;
  final Map<String, Offset> _customPositions = {};
  final Map<String, int> _customRotations = {};
  bool _isEditingMode = false;

  @override
  void initState() {
    super.initState();
    _labItems = [];
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final userProfile = ref.watch(gamificationProfileProvider(ref.read(authUserIdProvider))).value;
    if (userProfile != null) {
      final List<dynamic> inventory = List.from(widget.profile['inventory'] as List<dynamic>? ?? []);
      if (!inventory.contains('Escritorio')) inventory.add('Escritorio');
      if (!inventory.contains('Terminal')) inventory.add('Terminal');
      if (widget.profile['currentStreak'] != null && (widget.profile['currentStreak'] as num) > 0) {
        inventory.add('Trofeo de Llama');
      }

      _labItems = inventory.toSet().map((itemName) {
        String type = 'UNKNOWN';
        if (itemName.contains('Escritorio')) type = 'DESK';
        if (itemName.contains('Terminal')) type = 'TERMINAL';
        if (itemName.contains('Monitor')) type = 'MONITOR';
        if (itemName.contains('Servidor')) type = 'SERVER_RACK';
        if (itemName.contains('Planta')) type = 'PLANT';
        if (itemName.contains('Pizarra')) type = 'WHITEBOARD';
        if (itemName.contains('Arcade')) type = 'ARCADE';
        if (itemName.contains('Caf')) type = 'COFFEE_MAKER';
        if (itemName.contains('Trofeo')) type = 'STREAK_TROPHY';
        return {
          'id': itemName,
          'name': itemName,
          'type': type,
          'isEquipped': _customPositions.containsKey(itemName) || _customPositions.isEmpty,
        };
      }).where((item) => item['type'] != 'UNKNOWN').toList();
    }
  }

  void _toggleEquip(int index) {
    setState(() {
      final item = _labItems[index];
      item['isEquipped'] = !item['isEquipped'];
      if (!item['isEquipped']) {
        _customPositions.remove(item['id']);
      } else {
        _customPositions[item['id']] = const Offset(150, 150);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final currentTheme = ref.watch(editorThemeProvider);
    final Color floorColor = currentTheme.contains('Matrix') 
      ? Colors.green.withOpacity(0.2) 
      : currentTheme.contains('Cyberpunk') 
        ? Colors.pink.withOpacity(0.2)
        : AppColors.primary.withOpacity(0.2);
    final Color wallColor = currentTheme.contains('Matrix') 
      ? Colors.green.withOpacity(0.1) 
      : currentTheme.contains('Cyberpunk') 
        ? Colors.pink.withOpacity(0.1)
        : AppColors.surfaceHighlight;
    final Color strokeColor = currentTheme.contains('Matrix') ? Colors.green : currentTheme.contains('Cyberpunk') ? Colors.pinkAccent : AppColors.primary;
    
    final isPremium = widget.profile['user']?['plan'] == 'PREMIUM';
    final double labSize = isPremium ? 900.0 : 600.0;
    
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(isPremium ? 'Mi Laboratorio (PRO)' : 'Mi Laboratorio', style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white)),
        backgroundColor: AppColors.surface,
        elevation: 0,
        actions: [
          TextButton.icon(
            onPressed: () => setState(() => _isEditingMode = !_isEditingMode),
            icon: Icon(_isEditingMode ? Icons.check : Icons.edit, color: AppColors.primary),
            label: Text(_isEditingMode ? 'Hecho' : 'Editar 2D', style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Stack(
                children: [
                  Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [AppColors.background, AppColors.surface],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                  
                  Center(
                    child: InteractiveViewer(
                      boundaryMargin: const EdgeInsets.all(500),
                      minScale: 0.5,
                      maxScale: 3.0,
                      child: Transform(
                        alignment: Alignment.center,
                        transform: _isEditingMode 
                          ? Matrix4.identity()
                          : (Matrix4.identity()
                              ..setEntry(3, 2, 0.001)
                              ..rotateX(math.pi / 6)
                              ..rotateZ(-math.pi / 4)),
                        child: Stack(
                          clipBehavior: Clip.none,
                          children: [
                            if (!_isEditingMode)
                              Positioned(
                                left: 0,
                                top: -200,
                                child: Container(
                                  width: labSize,
                                  height: 200,
                                  decoration: BoxDecoration(
                                    color: wallColor,
                                    border: Border(bottom: BorderSide(color: strokeColor.withOpacity(0.5), width: 2)),
                                  ),
                                ),
                              ),
                            if (!_isEditingMode)
                              Positioned(
                                left: -200,
                                top: 0,
                                child: Container(
                                  width: 200,
                                  height: labSize,
                                  decoration: BoxDecoration(
                                    color: wallColor,
                                    border: Border(right: BorderSide(color: strokeColor.withOpacity(0.5), width: 2)),
                                  ),
                                ),
                              ),

                            Container(
                              width: labSize,
                              height: labSize,
                              decoration: BoxDecoration(
                                color: floorColor,
                                border: Border.all(color: strokeColor.withOpacity(0.3), width: 2),
                                boxShadow: [
                                  if (!_isEditingMode)
                                    BoxShadow(color: strokeColor.withOpacity(0.1), blurRadius: 40, spreadRadius: 10),
                                ],
                              ),
                              child: CustomPaint(
                                painter: _GridPainter(strokeColor, 30.0),
                              ),
                            ),
                            
                            ..._labItems.where((item) => item['isEquipped'] == true).map((item) => _buildLabItem(item)),
                            
                            // Mascotas
                            ...() {
                              final pets = widget.profile['pets'] as List<dynamic>? ?? [];
                              final equippedPet = pets.firstWhere((p) => p['isEquipped'] == true, orElse: () => null);
                              if (equippedPet != null) {
                                return [_buildPetItem(Map<String, dynamic>.from(equippedPet))];
                              }
                              return <Widget>[];
                            }(),
                            
                            // Figurines
                            ...() {
                              final languageMastery = widget.profile['languageMastery'] as Map<String, dynamic>? ?? {};
                              int figIndex = 0;
                              return languageMastery.entries.where((e) => (e.value as num) > 0.0).map((e) {
                                final leftOffset = 100.0 + (figIndex * 40);
                                figIndex++;
                                return _buildLanguageFigurine(e.key, 140, leftOffset);
                              }).toList();
                            }(),
                            
                            // Posters
                            ...() {
                              final languageMastery = widget.profile['languageMastery'] as Map<String, dynamic>? ?? {};
                              int posterIndex = 0;
                              return languageMastery.entries.where((e) => (e.value as num) >= 100.0).map((e) {
                                final topOffset = 20.0 + (posterIndex * 50);
                                posterIndex++;
                                return _buildLanguagePoster(e.key, topOffset, 10);
                              }).toList();
                            }(),
                            
                            // Trofeo de Racha
                            ...() {
                              final gamification = widget.profile['gamification'] as Map<String, dynamic>? ?? {};
                              final currentStreak = gamification['currentStreak'] as int? ?? 0;
                              if (currentStreak > 0) {
                                return [
                                  Positioned(
                                    top: 200,
                                    left: 200,
                                    child: _buildStreakTrophy(currentStreak),
                                  )
                                ];
                              }
                              return <Widget>[];
                            }(),
                          ],
                        ),
                      ),
                    ),
                  ),
                  
                  if (_isEditingMode)
                    Positioned(
                      top: 16,
                      left: 16,
                      right: 16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.black87,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.primary),
                        ),
                        child: Text(
                          '✨ MODO EDICIÓN: Arrastra objetos a la cuadrícula. Doble tap para rotar.',
                          style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
            ),
            
            Container(
              height: 150,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                border: Border(top: BorderSide(color: AppColors.primary.withOpacity(0.3))),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Inventario (${_labItems.length} objetos) - Toca para equipar/desequipar',
                    style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: AppColors.textPrimary, fontSize: 14),
                  ),
                  const SizedBox(height: 12),
                  Expanded(
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _labItems.length,
                      itemBuilder: (context, index) {
                        final item = _labItems[index];
                        final isEquipped = item['isEquipped'] == true;
                        
                        return GestureDetector(
                          onTap: () => _toggleEquip(index),
                          child: Container(
                            width: 100,
                            margin: const EdgeInsets.only(right: 12),
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isEquipped ? AppColors.primary.withOpacity(0.2) : AppColors.background,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: isEquipped ? AppColors.primary : AppColors.textSecondary.withOpacity(0.2),
                              ),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  _getIconForType(item['type']),
                                  color: isEquipped ? AppColors.accent : AppColors.textSecondary,
                                  size: 32,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  item['name'],
                                  style: GoogleFonts.inter(
                                    fontSize: 10,
                                    color: isEquipped ? AppColors.textPrimary : AppColors.textSecondary,
                                    fontWeight: isEquipped ? FontWeight.bold : FontWeight.normal,
                                  ),
                                  textAlign: TextAlign.center,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                )
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLabItem(Map<String, dynamic> item) {
    final itemId = item['id'] ?? item['name'];
    
    double defaultTop = 150;
    double defaultLeft = 150;
    
    switch (item['type']) {
      case 'DESK': defaultTop = 150; defaultLeft = 80; break;
      case 'TERMINAL': defaultTop = 120; defaultLeft = 110; break;
      case 'MONITOR': defaultTop = 110; defaultLeft = 160; break;
      case 'SERVER_RACK': defaultTop = 20; defaultLeft = 200; break;
      case 'PLANT': defaultTop = 130; defaultLeft = 50; break;
      case 'WHITEBOARD': defaultTop = 20; defaultLeft = 50; break;
      case 'ARCADE': defaultTop = 50; defaultLeft = 250; break;
      case 'COFFEE_MAKER': defaultTop = 110; defaultLeft = 140; break;
      case 'STREAK_TROPHY': defaultTop = 200; defaultLeft = 200; break;
    }
    
    final rawPos = _customPositions[itemId] ?? Offset(defaultLeft, defaultTop);
    final pos = _getSnappedPosition(rawPos);

    Widget customGraphic;
    switch (item['type']) {
      case 'DESK': customGraphic = _buildDesk(); break;
      case 'TERMINAL': customGraphic = _buildTerminal(); break;
      case 'MONITOR': customGraphic = _buildMonitor(); break;
      case 'SERVER_RACK': customGraphic = _buildServerRack(); break;
      case 'PLANT': customGraphic = _buildPlant(); break;
      case 'WHITEBOARD': customGraphic = _buildWhiteboard(); break;
      case 'ARCADE': customGraphic = _buildArcade(); break;
      case 'COFFEE_MAKER': customGraphic = _buildCoffeeMaker(); break;
      case 'STREAK_TROPHY': 
        final streak = widget.profile['gamification']?['currentStreak'] as int? ?? 0;
        customGraphic = _buildStreakTrophy(streak); 
        break;
      default: customGraphic = Icon(_getIconForType(item['type']), color: Colors.grey, size: 32);
    }

    final int rotation = _customRotations[itemId] ?? 0;
    
    return Positioned(
      top: pos.dy,
      left: pos.dx,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onPanUpdate: _isEditingMode ? (details) {
          setState(() {
            _customPositions[itemId] = Offset(rawPos.dx + details.delta.dx, rawPos.dy + details.delta.dy);
          });
        } : null,
        onDoubleTap: _isEditingMode ? () {
          setState(() {
            _customRotations[itemId] = rotation + 1;
          });
        } : null,
        child: Transform(
          alignment: Alignment.center,
          transform: _isEditingMode 
            ? (Matrix4.identity()..rotateZ(rotation * math.pi / 2))
            : (Matrix4.identity()
                ..rotateZ(math.pi / 4)
                ..rotateX(-math.pi / 6)
                ..scale(rotation % 2 == 1 ? -1.0 : 1.0, 1.0)),
          child: customGraphic,
        ),
      ),
    );
  }

  Offset _getSnappedPosition(Offset rawPos) {
    const double gridSize = 30.0;
    final isPremium = widget.profile['user']?['plan'] == 'PREMIUM';
    final double maxBounds = isPremium ? 870.0 : 570.0;
    
    double dx = (rawPos.dx / gridSize).round() * gridSize;
    double dy = (rawPos.dy / gridSize).round() * gridSize;
    if (dx < 0) dx = 0;
    if (dy < 0) dy = 0;
    if (dx > maxBounds) dx = maxBounds;
    if (dy > maxBounds) dy = maxBounds;
    return Offset(dx, dy);
  }

  Widget _buildPetItem(Map<String, dynamic> pet) {
    final petId = pet['id'] ?? pet['name'];
    final rawPos = _customPositions['pet_$petId'] ?? const Offset(200, 150);
    final pos = _getSnappedPosition(rawPos);
    
    final int rotation = _customRotations['pet_$petId'] ?? 0;
    
    return Positioned(
      top: pos.dy,
      left: pos.dx,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onPanUpdate: _isEditingMode ? (details) {
          setState(() {
            _customPositions['pet_$petId'] = Offset(rawPos.dx + details.delta.dx, rawPos.dy + details.delta.dy);
          });
        } : null,
        onDoubleTap: _isEditingMode ? () {
          setState(() {
            _customRotations['pet_$petId'] = rotation + 1;
          });
        } : null,
        child: Transform(
          alignment: Alignment.center,
          transform: _isEditingMode 
            ? (Matrix4.identity()..rotateZ(rotation * math.pi / 2))
            : (Matrix4.identity()
                ..rotateZ(math.pi / 4)
                ..rotateX(-math.pi / 6)
                ..scale(rotation % 2 == 1 ? -1.0 : 1.0, 1.0)),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.blueGrey.shade900,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.cyanAccent, width: 3),
                  boxShadow: [
                    BoxShadow(color: Colors.cyanAccent.withOpacity(0.6), blurRadius: 20, spreadRadius: 5),
                  ],
                  gradient: RadialGradient(
                    colors: [Colors.cyan.withOpacity(0.5), Colors.transparent],
                  ),
                ),
                child: Icon(_getIconForPet(pet['type']), color: Colors.cyanAccent, size: 48),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.cyanAccent.withOpacity(0.5)),
                  boxShadow: [BoxShadow(color: Colors.cyanAccent.withOpacity(0.3), blurRadius: 5)],
                ),
                child: Text(
                  pet['name'],
                  style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              )
            ],
          )
        )
      )
    );
  }

  IconData _getIconForPet(String type) {
    switch (type) {
      case 'SNAKE': return Icons.gesture;
      case 'GOPHER': return Icons.adb;
      case 'COFFEE_CUP': return Icons.local_cafe;
      default: return Icons.smart_toy;
    }
  }

  Widget _buildLanguagePoster(String lang, double top, double left) {
    final lowerLang = lang.toLowerCase();
    final color = lowerLang == 'python' ? Colors.blue : Colors.yellow;
    final icon = lowerLang == 'python' ? Icons.code : Icons.javascript;
    final text = lowerLang == 'python' ? 'PY' : 'JS';
    
    final rawPos = _customPositions['poster_$lang'] ?? Offset(left, top);
    final pos = _getSnappedPosition(rawPos);
    final int rotation = _customRotations['poster_$lang'] ?? 0;

    return Positioned(
      top: pos.dy,
      left: pos.dx,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onPanUpdate: _isEditingMode ? (details) {
          setState(() {
            _customPositions['poster_$lang'] = Offset(rawPos.dx + details.delta.dx, rawPos.dy + details.delta.dy);
          });
        } : null,
        onDoubleTap: _isEditingMode ? () {
          setState(() {
            _customRotations['poster_$lang'] = rotation + 1;
          });
        } : null,
        child: Transform(
          alignment: Alignment.center,
          transform: _isEditingMode 
            ? (Matrix4.identity()..rotateZ(rotation * math.pi / 2))
            : (Matrix4.identity()
                ..rotateZ(math.pi / 4)
                ..rotateX(-math.pi / 6)
                ..scale(rotation % 2 == 1 ? -1.0 : 1.0, 1.0)),
          child: Container(
            width: 40,
            height: 60,
            decoration: BoxDecoration(
              color: Colors.black87,
              border: Border.all(color: color, width: 2),
              borderRadius: BorderRadius.circular(4),
              boxShadow: [BoxShadow(color: color.withOpacity(0.4), blurRadius: 8)],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: color, size: 24),
                const SizedBox(height: 4),
                Text(text, style: GoogleFonts.inter(color: color, fontWeight: FontWeight.bold, fontSize: 12)),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLanguageFigurine(String language, double top, double left) {
    IconData icon;
    Color color;
    switch (language.toLowerCase()) {
      case 'python': icon = Icons.data_object; color = Colors.blue; break;
      case 'javascript': icon = Icons.javascript; color = Colors.yellow; break;
      case 'java': icon = Icons.local_cafe; color = Colors.orange; break;
      case 'c++': icon = Icons.settings_applications; color = Colors.blue[800]!; break;
      default: icon = Icons.code; color = Colors.grey; break;
    }
    return Positioned(
      top: top,
      left: left,
      child: RepaintBoundary(
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: Colors.grey.withOpacity(0.8),
            shape: BoxShape.circle,
            border: Border.all(color: color, width: 2),
            boxShadow: [
              BoxShadow(color: color.withOpacity(0.5), blurRadius: 10, spreadRadius: 2),
            ],
          ),
          child: Center(
            child: Icon(icon, color: color, size: 20),
          ),
        ),
      ),
    );
  }

  Widget _buildStreakTrophy(int streak) {
    return RepaintBoundary(
      child: Container(
        width: 60,
        height: 60,
        decoration: BoxDecoration(
          color: Colors.orange.withOpacity(0.2),
          shape: BoxShape.circle,
          border: Border.all(color: Colors.orange, width: 2),
          boxShadow: [
            BoxShadow(color: Colors.orange.withOpacity(0.8), blurRadius: 20, spreadRadius: 5),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.local_fire_department, color: Colors.orange, size: 24),
            Text('$streak', style: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
          ],
        ),
      ),
    );
  }

  Widget _buildDesk() {
    return Container(
      width: 150, // 5 grid units (30*5)
      height: 90, // 3 grid units (30*3)
      decoration: BoxDecoration(
        color: Colors.brown.shade800,
        border: Border.all(color: Colors.brown.shade900, width: 3),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black54, blurRadius: 10, offset: Offset(0, 10))],
      ),
      child: Column(
        children: [
          Container(
            height: 15,
            decoration: BoxDecoration(
              color: Colors.brown.shade600,
              borderRadius: const BorderRadius.only(bottomLeft: Radius.circular(2), bottomRight: Radius.circular(2)),
            ),
          ),
          const Spacer(),
          if (_isEditingMode) 
            const Icon(Icons.desk, color: Colors.white24, size: 40)
        ],
      ),
    );
  }

  Widget _buildTerminal() {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        color: Colors.grey.shade300, 
        border: Border.all(color: Colors.grey.shade500, width: 2),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black26, blurRadius: 5)],
      ),
      child: Container(
        margin: const EdgeInsets.all(4),
        color: Colors.black, 
        child: const Center(
          child: Text('>_', style: TextStyle(color: Colors.greenAccent, fontSize: 14, fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }
  
  Widget _buildMonitor() {
    return Container(
      width: 60,
      height: 30,
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        border: Border.all(color: Colors.grey.shade700, width: 2),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) BoxShadow(color: Colors.blueAccent.withOpacity(0.3), blurRadius: 10)]
      ),
      child: const Center(
        child: Icon(Icons.code, color: Colors.blueAccent, size: 16),
      ),
    );
  }

  Widget _buildServerRack() {
    return Container(
      width: 60,
      height: 120,
      decoration: BoxDecoration(
        color: Colors.grey.shade800,
        border: Border.all(color: Colors.black, width: 2),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black54, blurRadius: 15, offset: Offset(5, 5))]
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: List.generate(5, (index) => Container(
          height: 12,
          margin: const EdgeInsets.symmetric(horizontal: 4),
          decoration: BoxDecoration(
            color: Colors.black,
            border: Border.all(color: Colors.grey.shade600, width: 1),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(width: 4, height: 4, decoration: const BoxDecoration(color: Colors.greenAccent, shape: BoxShape.circle, boxShadow: [BoxShadow(color: Colors.greenAccent, blurRadius: 2)])),
              Container(width: 4, height: 4, decoration: BoxDecoration(color: index % 2 == 0 ? Colors.blueAccent : Colors.redAccent, shape: BoxShape.circle)),
            ],
          ),
        )),
      ),
    );
  }

  Widget _buildPlant() {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        color: Colors.green.shade700,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.green.shade900, width: 2),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black38, blurRadius: 5, offset: Offset(2, 2))],
      ),
      child: const Center(
        child: Icon(Icons.eco, color: Colors.lightGreenAccent, size: 30),
      ),
    );
  }

  Widget _buildWhiteboard() {
    return Container(
      width: 120,
      height: 30, // Much thinner from top down
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey.shade300, width: 4),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black26, blurRadius: 8, offset: Offset(0, 4))],
      ),
      child: Center(
        child: Text('TODO', style: TextStyle(color: Colors.blue.shade900, fontSize: 10, fontWeight: FontWeight.bold)),
      ),
    );
  }

  Widget _buildArcade() {
    return Container(
      width: 60,
      height: 90,
      decoration: BoxDecoration(
        color: Colors.deepPurple.shade800,
        border: Border.all(color: Colors.pinkAccent, width: 2),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [if (!_isEditingMode) BoxShadow(color: Colors.pinkAccent.withOpacity(0.5), blurRadius: 15, spreadRadius: 2)],
      ),
      child: Column(
        children: [
          Container(height: 20, color: Colors.pinkAccent, child: const Center(child: Text('ARCADE', style: TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold)))),
          Expanded(child: Container(margin: const EdgeInsets.all(4), color: Colors.black, child: const Center(child: Icon(Icons.videogame_asset, color: Colors.cyanAccent, size: 24)))),
        ],
      ),
    );
  }

  Widget _buildCoffeeMaker() {
    return Container(
      width: 30,
      height: 30,
      decoration: BoxDecoration(
        color: Colors.grey.shade800,
        border: Border.all(color: Colors.grey.shade400, width: 2),
        borderRadius: BorderRadius.circular(6),
        boxShadow: [if (!_isEditingMode) const BoxShadow(color: Colors.black38, blurRadius: 5)],
      ),
      child: const Center(child: Icon(Icons.coffee_maker, color: Colors.white70, size: 18)),
    );
  }



  IconData _getIconForType(String type) {
    switch (type) {
      case 'DESK': return Icons.desk;
      case 'TERMINAL': return Icons.terminal;
      case 'MONITOR': return Icons.monitor;
      case 'SERVER_RACK': return Icons.dns;
      case 'DATA_CENTER': return Icons.domain;
      case 'AI_LAB': return Icons.memory;
      case 'PLANT': return Icons.eco;
      case 'WHITEBOARD': return Icons.developer_board;
      case 'ARCADE': return Icons.videogame_asset;
      case 'COFFEE_MAKER': return Icons.coffee_maker;
      default: return Icons.category;
    }
  }
}

class _GridPainter extends CustomPainter {
  final Color gridColor;
  final double gridSize;
  _GridPainter(this.gridColor, this.gridSize);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = gridColor.withOpacity(0.2)
      ..strokeWidth = 1.0;

    for (double i = 0; i <= size.width; i += gridSize) {
      canvas.drawLine(Offset(i, 0), Offset(i, size.height), paint);
    }
    for (double i = 0; i <= size.height; i += gridSize) {
      canvas.drawLine(Offset(0, i), Offset(size.width, i), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
