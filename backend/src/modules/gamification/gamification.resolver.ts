import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamificationService } from './gamification.service';
import { GamificationProfile } from './models/gamification-profile.model';

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
}
