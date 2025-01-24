import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { EmailSendModule } from '../email/emailSend.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: '30m' },
    }),
    JwtModule.register({
      secret: env.refreshToken,
      signOptions: { expiresIn: '15d' },
    }),
    EmailSendModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
