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

    // Obtener información de la lección para el progreso de habilidades
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { language: true }
    });

    let skills: Record<string, any> = (profile.skills as Record<string, any>) || {};
    if (typeof skills !== 'object' || Array.isArray(skills)) skills = {};
    
    let inventory: string[] = (profile.inventory as string[]) || [];
    if (!Array.isArray(inventory)) inventory = [];

    if (lesson && lesson.language) {
      const lang = lesson.language.name;
      if (!skills[lang]) {
        skills[lang] = { xp: 0, completed: 0 };
      }
      skills[lang].xp += actualXpToAdd;
      skills[lang].completed += 1;

      // 1. PET EVOLUTION LOGIC
      const petName = `Mascota de ${lang}`;
      let pet = await this.prisma.codePet.findFirst({
        where: { profileId: profile.id, name: petName }
      });
      if (!pet) {
        pet = await this.prisma.codePet.create({
          data: { profileId: profile.id, name: petName, type: 'BOT', level: 1, xp: 0, evolutionStage: 1 }
        });
      }
      const newPetXp = pet.xp + actualXpToAdd;
      const newPetLevel = Math.floor(Math.sqrt(newPetXp / 50)) + 1; // Subida rápida
      let newEvolutionStage = pet.evolutionStage;
      
      // Evolucionar en niveles 5, 15 y 30
      if (newPetLevel >= 5 && newEvolutionStage < 2) newEvolutionStage = 2; // Evolución 1
      if (newPetLevel >= 15 && newEvolutionStage < 3) newEvolutionStage = 3; // Evolución 2
      if (newPetLevel >= 30 && newEvolutionStage < 4) newEvolutionStage = 4; // Evolución final (Forma Definitiva)
      
      await this.prisma.codePet.update({
        where: { id: pet.id },
        data: { xp: newPetXp, level: newPetLevel, evolutionStage: newEvolutionStage }
      });

      // Función auxiliar para desbloquear Títulos
      const unlockTitle = async (titleName: string, desc: string) => {
        let title = await this.prisma.title.findFirst({ where: { name: titleName } });
        if (!title) title = await this.prisma.title.create({ data: { name: titleName, description: desc } });
        const hasTitle = await this.prisma.userTitle.findUnique({ where: { profileId_titleId: { profileId: profile.id, titleId: title.id } } });
        if (!hasTitle) await this.prisma.userTitle.create({ data: { profileId: profile.id, titleId: title.id } });
      };

      // Función auxiliar para desbloquear Logros
      const unlockAchievement = async (slug: string, name: string, desc: string) => {
        let ach = await this.prisma.achievement.findUnique({ where: { slug } });
        if (!ach) ach = await this.prisma.achievement.create({ data: { slug, name, description: desc, icon: 'trophy', xpReward: 50, crystalReward: 20 } });
        const hasAch = await this.prisma.userAchievement.findUnique({ where: { profileId_achievementId: { profileId: profile.id, achievementId: ach.id } } });
        if (!hasAch) await this.prisma.userAchievement.create({ data: { profileId: profile.id, achievementId: ach.id } });
      };

      // 2. DESBLOQUEO DE HITOS (Logros, Títulos y Objetos)
      const completedCount = skills[lang].completed;
      if (completedCount === 10) {
        if (!inventory.includes(`Póster Holográfico de ${lang}`)) inventory.push(`Póster Holográfico de ${lang}`);
        await unlockAchievement(`primer-paso-${lang.toLowerCase()}`, `Primeros Pasos en ${lang}`, `Completa 10 lecciones de ${lang}.`);
        await unlockTitle(`Novato de ${lang}`, `Comenzó su viaje en ${lang}.`);
      }
      if (completedCount === 20) {
        if (!inventory.includes(`Tema Hacker ${lang}`)) inventory.push(`Tema Hacker ${lang}`);
        await unlockAchievement(`explorador-${lang.toLowerCase()}`, `Explorador de ${lang}`, `Completa 20 lecciones de ${lang}.`);
        await unlockTitle(`Explorador de ${lang}`, `Superó la mitad del entrenamiento de ${lang}.`);
      }
      if (completedCount === 30) {
        if (!inventory.includes(`Servidor Dedicado ${lang}`)) inventory.push(`Servidor Dedicado ${lang}`);
        await unlockAchievement(`experto-${lang.toLowerCase()}`, `Experto en ${lang}`, `Completa 30 lecciones de ${lang}.`);
        await unlockTitle(`Arquitecto de ${lang}`, `Dominó los conceptos avanzados de ${lang}.`);
      }
      if (completedCount === 40) {
        if (!inventory.includes(`Trofeo de Maestría en ${lang}`)) inventory.push(`Trofeo de Maestría en ${lang}`);
        await unlockAchievement(`maestro-${lang.toLowerCase()}`, `Maestro de ${lang}`, `Completa el 100% del currículum de ${lang}.`);
        await unlockTitle(`Dios de ${lang}`, `Alcanzó la maestría total en ${lang}.`);
      }
    }

    await this.prisma.gamificationProfile.update({
      where: { userId },
      data: {
        xp: newXp,
        level: newLevel,
        crystals: newCrystals,
        completedLessons: {
          push: lessonId
        },
        skills: skills,
        inventory: inventory
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

  // =====================================
  // VIVERO DE MASCOTAS (PET NURSERY)
  // =====================================

  async getMyPets(userId: string) {
    const profile = await this.getProfile(userId);
    return this.prisma.codePet.findMany({
      where: { profileId: profile.id },
      orderBy: { level: 'desc' }
    });
  }

  async interactWithPet(userId: string, petId: string, action: 'FEED' | 'PLAY') {
    const profile = await this.getProfile(userId);
    const pet = await this.prisma.codePet.findFirst({
      where: { id: petId, profileId: profile.id }
    });

    if (!pet) throw new Error('Mascota no encontrada');

    let happiness = pet.happiness;
    let xp = pet.xp;

    if (action === 'FEED') {
      happiness = Math.min(100, happiness + 20);
      xp += 5; // Darle de comer da algo de XP
    } else if (action === 'PLAY') {
      happiness = Math.min(100, happiness + 30);
      xp += 10;
    }

    const newLevel = Math.floor(Math.sqrt(xp / 50)) + 1;
    let newEvolutionStage = pet.evolutionStage;
      
    if (newLevel >= 5 && newEvolutionStage < 2) newEvolutionStage = 2;
    if (newLevel >= 15 && newEvolutionStage < 3) newEvolutionStage = 3;
    if (newLevel >= 30 && newEvolutionStage < 4) newEvolutionStage = 4;

    return this.prisma.codePet.update({
      where: { id: pet.id },
      data: { happiness, xp, level: newLevel, evolutionStage: newEvolutionStage }
    });
  }
}
