import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IamService } from './iam.service';
import { IamResolver } from './iam.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(
          'JWT_SECRET',
          'codenexus_dev_secret_key_123',
        ),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [IamResolver, IamService],
})
export class IamModule {}
