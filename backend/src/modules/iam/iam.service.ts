import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { LoginWithGoogleInput } from './dto/login-google.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class IamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'Este usuario fue registrado con una red social. Por favor, utiliza Google/GitHub para ingresar.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(input: CreateUserInput) {
    const { username, email, password } = input;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
  }

  async loginWithGoogle(input: LoginWithGoogleInput) {
    const { idToken } = input;
    
    // El Web Client ID que el usuario creó
    const clientId = '526020637940-khm62cha05g7hj94vod18qoohmcrigc9.apps.googleusercontent.com';
    const client = new OAuth2Client(clientId);

    let payloadGoogle;
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
      });
      payloadGoogle = ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Token de Google inválido o expirado');
    }

    if (!payloadGoogle) throw new UnauthorizedException('No se pudo verificar la identidad');

    const googleId = payloadGoogle.sub;
    const email = payloadGoogle.email!;
    const displayName = payloadGoogle.name ?? 'Usuario';
    const photoUrl = payloadGoogle.picture;

    // Buscar si existe por googleId o email
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    });

    if (!user) {
      // Si no existe, crear usuario
      let uniqueUsername = displayName.replace(/\s+/g, '').toLowerCase();
      // Asegurar que el username sea unico (simplificado)
      const exists = await this.prisma.user.findUnique({ where: { username: uniqueUsername } });
      if (exists) uniqueUsername += Math.floor(Math.random() * 1000).toString();

      user = await this.prisma.user.create({
        data: {
          email,
          username: uniqueUsername,
          googleId,
          avatarUrl: photoUrl,
        },
      });

      // Inicializar perfil de gamificación
      await this.prisma.gamificationProfile.create({
        data: {
          userId: user.id,
          credits: 100, // Bono de bienvenida
        },
      });
    } else {
      // Actualizar googleId o avatarUrl si faltan
      if (!user.googleId || (photoUrl && user.avatarUrl !== photoUrl)) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: user.googleId || googleId,
            avatarUrl: photoUrl || user.avatarUrl,
          },
        });
      }
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  async updateUser(input: UpdateUserInput) {
    const { id, username, avatarUrl } = input;
    
    // Check if username is already taken
    if (username) {
      const exists = await this.prisma.user.findFirst({
        where: { username, NOT: { id } },
      });
      if (exists) {
        throw new Error('El nombre de usuario ya está en uso');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(avatarUrl && { avatarUrl }),
      },
    });
  }

  async upgradeToPremium(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { plan: 'PREMIUM' },
    });
  }
}
