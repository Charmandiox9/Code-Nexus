import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { IamService } from './iam.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { AuthResponse } from './models/auth-response.model';
import { LoginInput } from './dto/login.input';
import { LoginWithGoogleInput } from './dto/login-google.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class IamResolver {
  constructor(private readonly iamService: IamService) {}

  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Inicia sesión y devuelve un JWT',
  })
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.iamService.login(input);
  }

  @Mutation(() => AuthResponse, {
    name: 'loginWithGoogle',
    description: 'Inicia sesión o registra usuario con Google',
  })
  async loginWithGoogle(@Args('input') input: LoginWithGoogleInput): Promise<AuthResponse> {
    return this.iamService.loginWithGoogle(input);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Obtiene la lista de todos los usuarios',
  })
  async getUsers(): Promise<User[]> {
    return this.iamService.findAll();
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Registra un nuevo usuario en la plataforma',
  })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.iamService.createUser(input);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Actualiza el perfil del usuario',
  })
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.iamService.updateUser(input);
  }

  @Mutation(() => User, {
    name: 'upgradeToPremium',
    description: 'Simula el flujo de compra y actualiza el plan a PREMIUM',
  })
  async upgradeToPremium(@Args('userId') userId: string): Promise<User> {
    return this.iamService.upgradeToPremium(userId);
  }
}
