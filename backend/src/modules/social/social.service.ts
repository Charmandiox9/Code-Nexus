import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { FriendStatus, ActivityType } from '@prisma/client';

@Injectable()
export class SocialService {
  constructor(private db: PrismaService) {}

  // 1. Agregar un amigo
  async sendFriendRequest(userId: string, targetUsername: string) {
    const targetUser = await this.db.user.findUnique({
      where: { username: targetUsername },
    });
    if (!targetUser) throw new NotFoundException('Usuario no encontrado');
    if (targetUser.id === userId) throw new BadRequestException('No puedes agregarte a ti mismo');

    const existing = await this.db.friendship.findUnique({
      where: { userId_friendId: { userId, friendId: targetUser.id } },
    });
    if (existing) throw new BadRequestException('Ya existe una relación con este usuario');

    // Create the relationship both ways
    await this.db.friendship.create({
      data: { userId, friendId: targetUser.id, status: FriendStatus.PENDING },
    });
    await this.db.friendship.create({
      data: { userId: targetUser.id, friendId: userId, status: FriendStatus.PENDING },
    });

    return true;
  }

  // 2. Aceptar amigo
  async acceptFriendRequest(userId: string, friendId: string) {
    await this.db.friendship.updateMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      },
      data: { status: FriendStatus.ACCEPTED }
    });
    return true;
  }

  // 3. Ver lista de amigos
  async getFriends(userId: string) {
    const friendships = await this.db.friendship.findMany({
      where: { userId, status: FriendStatus.ACCEPTED },
      include: { friend: { include: { gamification: true } } },
    });
    return friendships.map(f => f.friend);
  }

  // 4. Ver perfil de amigo (lo reutilizaremos de gamification si se puede, o devolvemos User con gamification)
  async getFriendProfile(friendId: string) {
    const user = await this.db.user.findUnique({
      where: { id: friendId },
      include: { gamification: { include: { pets: true, achievements: { include: { achievement: true } } } } }
    });
    return user;
  }

  // 5. Ver Feed de Amigos
  async getFriendActivityFeed(userId: string) {
    const friends = await this.db.friendship.findMany({
      where: { userId, status: FriendStatus.ACCEPTED },
    });
    const friendIds = friends.map(f => f.friendId);
    
    // Incluir al usuario actual también
    friendIds.push(userId);

    const activities = await this.db.activityFeed.findMany({
      where: { userId: { in: friendIds } },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: true },
    });
    return activities;
  }

  // 6. Leaderboard semanal por lenguaje (Simplificado: Top XP total por ahora)
  async getLeaderboard(userId: string, limit = 10, language?: string) {
    const userProfile = await this.db.gamificationProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) return [];

    const now = new Date();
    const lastActivity = new Date(userProfile.lastActivityAt);
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      // No ha jugado en la semana
      return []; 
    }

    const profiles = await this.db.gamificationProfile.findMany({
      include: { user: true },
    });

    // Helper para parsear skills y obtener xp de un lenguaje
    const getLanguageXp = (profile: any, lang: string) => {
      try {
        const skills = profile.skills as Record<string, any>;
        if (skills && skills[lang]) {
          return skills[lang].xp || 0;
        }
      } catch (e) {}
      return 0;
    };

    const getUserLeague = (xp: number) => {
      if (xp > 3000) return 'Diamante';
      if (xp > 1500) return 'Oro';
      if (xp > 500) return 'Plata';
      return 'Bronce';
    };

    const targetXp = language ? getLanguageXp(userProfile, language) : userProfile.xp;
    const myLeague = getUserLeague(targetXp);

    const sortedProfiles = profiles
      .map(p => {
        const xp = language ? getLanguageXp(p, language) : p.xp;
        return { ...p, league: getUserLeague(xp), sortXp: xp };
      })
      .filter(p => p.league === myLeague)
      .sort((a, b) => (b.sortXp as number) - (a.sortXp as number))
      .slice(0, limit);

    return sortedProfiles;
  }

  // Internal: Log Activity
  async logActivity(userId: string, type: ActivityType, metadata: any = {}) {
    return this.db.activityFeed.create({
      data: {
        userId,
        type,
        metadata
      }
    });
  }
}
