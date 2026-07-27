import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest_all.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

class LocalNotificationsService {
  static final LocalNotificationsService _instance = LocalNotificationsService._internal();
  factory LocalNotificationsService() => _instance;
  LocalNotificationsService._internal();

  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  Future<void> init() async {
    tz.initializeTimeZones();
    
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
        
    final DarwinInitializationSettings initializationSettingsIOS = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    
    final InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );
    
    await flutterLocalNotificationsPlugin.initialize(
      settings: initializationSettings,
      onDidReceiveNotificationResponse: (NotificationResponse response) {
        // Manejar cuando se toca la notificación
      },
    );
  }

  Future<void> scheduleDailyPracticeReminder() async {
    // Cancelar recordatorios anteriores para no saturar
    await flutterLocalNotificationsPlugin.cancel(id: 100);

    // Programar para 24 horas después de la última actividad
    final tz.TZDateTime scheduledDate = tz.TZDateTime.now(tz.local).add(const Duration(hours: 24));

    const AndroidNotificationDetails androidPlatformChannelSpecifics = AndroidNotificationDetails(
      'practice_reminders_channel',
      'Recordatorios de Práctica',
      channelDescription: 'Canal para recordatorios diarios de CodeNexus',
      importance: Importance.max,
      priority: Priority.high,
    );

    const NotificationDetails platformChannelSpecifics = NotificationDetails(
      android: androidPlatformChannelSpecifics,
      iOS: DarwinNotificationDetails(),
    );

    await flutterLocalNotificationsPlugin.zonedSchedule(
      id: 100, // ID de la notificación
      title: '¡Es hora de programar! 💻',
      body: 'Tus mascotas te extrañan. Practica hoy y mantén viva tu racha.',
      scheduledDate: scheduledDate,
      notificationDetails: platformChannelSpecifics,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      matchDateTimeComponents: DateTimeComponents.time, // Repetir todos los días a esta hora
    );
  }
  
  Future<void> cancelPracticeReminder() async {
    await flutterLocalNotificationsPlugin.cancel(id: 100);
  }
}
