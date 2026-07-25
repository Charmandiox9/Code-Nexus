import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { GamificationProfile } from './models/gamification-profile.model';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string): Promise<GamificationProfile | any> {
    const profile = await this.prisma.gamificationProfile.findUnique({
      where: { userId },
      include: {
        titles: {
          include: { title: true }
        },
        achievements: {
          include: { achievement: true }
        },
        pets: true,
        user: {
          include: {
            labItems: {
              include: { item: true }
            }
          }
        }
      }
    });

    if (!profile) {
      // Solo para desarrollo: Auto-crear usuario mock si no existe
      await this.prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: `${userId}@test.com`,
          username: `tester_${userId}`,
        }
      });
      
      // Auto-crear perfil para usuarios nuevos
      const newProfile = await this.prisma.gamificationProfile.create({
        data: { userId },
      });
      return { ...newProfile, labItems: [] };
    }

    return { ...profile, labItems: profile.user?.labItems || [] };
  }

  async addXp(userId: string, xpToAdd: number): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    let actualXpToAdd = xpToAdd;
    if (profile.user?.plan === 'PREMIUM') {
      actualXpToAdd *= 2;
    }

    const newXp = profile.xp + actualXpToAdd;
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        xp: newXp,
        level: newLevel,
      },
    });
  }

  async recordActivity(userId: string): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    const now = new Date();
    const lastActivity = new Date(profile.lastActivityAt);
    
    // Normalize to midnight to compare days
    now.setHours(0, 0, 0, 0);
    lastActivity.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let newStreak = profile.currentStreak;
    let inventory: string[] = Array.isArray(profile.inventory) ? profile.inventory as string[] : [];
    
    if (diffDays === 1) {
      newStreak += 1; // It was yesterday
    } else if (diffDays > 1) {
      const daysMissed = diffDays - 1;
      let shields = inventory.filter(i => i === 'Escudo de Racha').length;
      
      if (shields >= daysMissed) {
        // Has enough shields, consume them
        for (let i = 0; i < daysMissed; i++) {
          const index = inventory.indexOf('Escudo de Racha');
          if (index > -1) inventory.splice(index, 1);
        }
        newStreak += 1; // Streak preserved and incremented for today
      } else {
        newStreak = 1; // Streak broken
      }
    } else if (diffDays === 0 && profile.currentStreak === 0) {
      newStreak = 1; // First activity ever
    }

    const newBestStreak = Math.max(profile.bestStreak, newStreak);

    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        lastActivityAt: new Date(),
        inventory,
      },
    });
  }

  async addXpForLesson(userId: string, lessonId: string, xpToAdd: number): Promise<boolean> {
    await this.recordActivity(userId);
    const profile = await this.getProfile(userId);
    
    if (profile.completedLessons && profile.completedLessons.includes(lessonId)) {
      return false;
    }

    let actualXpToAdd = xpToAdd;
    let crystalsToAdd = 10;
    
    if (profile.user?.plan === 'PREMIUM') {
      actualXpToAdd *= 2;
      crystalsToAdd *= 2;
    }

    const newXp = profile.xp + actualXpToAdd;
    const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
    const newCrystals = profile.crystals + crystalsToAdd;

    await this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        xp: newXp,
        level: newLevel,
        crystals: newCrystals,
        completedLessons: {
          push: lessonId
        }
      },
    });

    return true;
  }

  async spendCrystals(userId: string, amount: number, itemName: string): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    
    if (profile.crystals < amount) {
      throw new Error('Not enough crystals');
    }

    let inventory = Array.isArray(profile.inventory) ? [...profile.inventory] : [];
    inventory.push(itemName);

    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        crystals: profile.crystals - amount,
        inventory: inventory,
      },
    });
  }

  async useItem(userId: string, itemName: string): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    let inventory = Array.isArray(profile.inventory) ? [...profile.inventory] : [];
    let activeBoosts = Array.isArray(profile.activeBoosts) ? [...profile.activeBoosts] : [];

    const itemIndex = inventory.indexOf(itemName);
    if (itemIndex === -1) {
      throw new Error('Item not in inventory');
    }

    inventory.splice(itemIndex, 1);
    
    // Solo los potenciadores van a activeBoosts
    const isBoost = itemName.includes('Escudo') || itemName.includes('XP');
    if (isBoost) {
      activeBoosts.push(itemName);
    }

    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        inventory: inventory,
        activeBoosts: activeBoosts,
      },
    });
  }

  async addCrystals(userId: string, amount: number): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    
    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        crystals: { increment: amount },
      },
    });
  }

  async updateLabLayout(userId: string, positions: any, rotations: any): Promise<GamificationProfile> {
    const profile = await this.getProfile(userId);
    
    return this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        labPositions: positions,
        labRotations: rotations,
      },
    });
  }
}
