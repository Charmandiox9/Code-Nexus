import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamificationService } from './gamification.service';
import { GamificationProfile, CodePet } from './models/gamification-profile.model';
import { StoreItem } from './models/store-item.model';
import { DailyQuest, UserDailyQuest } from './models/daily-quest.model';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => GamificationProfile)
export class GamificationResolver {
  constructor(private readonly gamificationService: GamificationService) {}

  @Query(() => GamificationProfile, {
    name: 'gamificationProfile',
    description: 'Obtiene el perfil de gamificación (niveles, xp, rachas) de un usuario',
  })
  async getProfile(@Args('userId') userId: string): Promise<GamificationProfile> {
    return this.gamificationService.getProfile(userId);
  }

  @Mutation(() => GamificationProfile, {
    name: 'addXp',
    description: 'Añade XP a un usuario (solo para uso interno/backend en el futuro)',
  })
  async addXp(
    @Args('userId') userId: string,
    @Args('xp', { type: () => Int }) xp: number,
  ): Promise<GamificationProfile> {
    return this.gamificationService.addXp(userId, xp);
  }

  @Mutation(() => GamificationProfile, {
    name: 'spendCrystals',
    description: 'Gasta cristales para comprar en la tienda',
  })
  async spendCrystals(
    @Args('userId') userId: string,
    @Args('amount', { type: () => Int }) amount: number,
    @Args('itemName') itemName: string,
  ): Promise<GamificationProfile> {
    return this.gamificationService.spendCrystals(userId, amount, itemName);
  }

  @Mutation(() => GamificationProfile, {
    name: 'addCrystals',
    description: 'Dev only: Añade cristales',
  })
  async addCrystals(
    @Args('userId') userId: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<GamificationProfile> {
    return this.gamificationService.addCrystals(userId, amount);
  }

  @Mutation(() => GamificationProfile, {
    name: 'useItem',
    description: 'Usa un item del inventario',
  })
  async useItem(
    @Args('userId') userId: string,
    @Args('itemName') itemName: string,
  ): Promise<GamificationProfile> {
    return this.gamificationService.useItem(userId, itemName);
  }

  @Mutation(() => GamificationProfile, {
    name: 'addCrystalsToUsername',
    description: 'Dev only: Añade cristales por nombre de usuario',
  })
  async addCrystalsToUsername(
    @Args('username') username: string,
    @Args('amount', { type: () => Int }) amount: number,
  ): Promise<GamificationProfile> {
    const user = await this.gamificationService['prisma'].user.findFirst({
      where: { username }
    });
    if (!user) throw new Error('User not found');
    return this.gamificationService.addCrystals(user.id, amount);
  }

  @Mutation(() => GamificationProfile, {
    name: 'updateLabLayout',
    description: 'Actualiza la disposición del laboratorio 3D del usuario',
  })
  async updateLabLayout(
    @Args('userId') userId: string,
    @Args('positions', { type: () => GraphQLJSONObject }) positions: any,
    @Args('rotations', { type: () => GraphQLJSONObject }) rotations: any,
  ): Promise<GamificationProfile> {
    return this.gamificationService.updateLabLayout(userId, positions, rotations);
  }

  // ==========================================
  // PET NURSERY ENDPOINTS
  // ==========================================

  @Query(() => [CodePet], {
    name: 'getMyPets',
    description: 'Obtiene las mascotas del usuario',
  })
  async getMyPets(@Args('userId') userId: string): Promise<CodePet[]> {
    return this.gamificationService.getMyPets(userId);
  }

  @Mutation(() => CodePet, {
    name: 'interactWithPet',
    description: 'Interactúa con la mascota (FEED o PLAY)',
  })
  async interactWithPet(
    @Args('userId') userId: string,
    @Args('petId') petId: string,
    @Args('action') action: string,
  ): Promise<CodePet> {
    return this.gamificationService.interactWithPet(userId, petId, action as 'FEED' | 'PLAY');
  }

  @Mutation(() => Boolean, {
    name: 'equipTitle',
    description: 'Equipa un título en el perfil del usuario',
  })
  async equipTitle(
    @Args('userId') userId: string,
    @Args('titleId') titleId: string,
  ): Promise<boolean> {
    return this.gamificationService.equipTitle(userId, titleId);
  }

  @Query(() => [StoreItem], {
    name: 'getDailyStore',
    description: 'Obtiene los ítems de la tienda, rotando cada 24 horas',
  })
  async getDailyStore(): Promise<StoreItem[]> {
    return this.gamificationService.getDailyStore();
  }

  @Mutation(() => GamificationProfile, {
    name: 'buyStoreItem',
    description: 'Compra un ítem en la tienda',
  })
  async buyStoreItem(
    @Args('userId') userId: string,
    @Args('itemId') itemId: string,
  ): Promise<GamificationProfile | any> {
    return this.gamificationService.buyStoreItem(userId, itemId);
  }

  @Query(() => [UserDailyQuest], {
    name: 'getDailyQuests',
    description: 'Obtiene las misiones diarias asignadas al usuario',
  })
  async getDailyQuests(@Args('userId') userId: string): Promise<UserDailyQuest[]> {
    return this.gamificationService.getDailyQuests(userId) as any;
  }

  @Mutation(() => Boolean, {
    name: 'claimDailyQuest',
    description: 'Reclama la recompensa de una misión diaria',
  })
  async claimDailyQuest(
    @Args('userId') userId: string,
    @Args('questId') questId: string,
  ): Promise<boolean> {
    return this.gamificationService.claimDailyQuest(userId, questId);
  }
}
