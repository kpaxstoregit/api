import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import * as crypto from 'crypto';
import { env } from 'src/shared/config/env';
import { PasswordResetRepository } from 'src/shared/database/repositories/passwordReset.repositories';
import { RefreshTokenRepository } from 'src/shared/database/repositories/refreshToken.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { EmailService } from '../email/email.service';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { RefreshTokenDto } from './dto/refrashTokenDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordResetRepo: PasswordResetRepository,
    private readonly emailService: EmailService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userRepo.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.generateAccessToken(
      user.id,
      user.role,
      user.isPremium,
    );
    const refreshToken = await this.generateRefreshToken(user.id);

    await this.refreshTokenRepository.create({
      data: {
        token: refreshToken,
        user: { connect: { id: user.id } },
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        isPremium: user.isPremium,
      },
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

    const emailAlreadyInUse = await this.userRepo.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new ConflictException('This email already in use');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = await this.generateAccessToken(
      user.id,
      user.role,
      user.isPremium,
    );

    return { accessToken };
  }

  async logout(userId: string, logoutDto: RefreshTokenDto) {
    const { refreshToken } = logoutDto;

    const storedToken = await this.refreshTokenRepository.findFirst({
      where: {
        token: refreshToken,
        userId: userId,
        isActive: true,
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.refreshTokenRepository.delete({
      id: storedToken.id,
    });

    return { message: 'Logged out successfully' };
  }

  async refreshToken(refreshToken: string) {
    const storedToken = await this.refreshTokenRepository.findFirst({
      where: {
        token: refreshToken,
        isActive: true,
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    if (new Date() > storedToken.expiresAt) {
      await this.refreshTokenRepository.delete({ id: storedToken.id });
      throw new UnauthorizedException('Expired refresh token.');
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: env.refreshToken,
    });

    const user = await this.userRepo.findUnique({ where: { id: payload.sub } });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const newAccessToken = await this.generateAccessToken(
      user.id,
      user.role,
      user.isPremium,
    );
    const newRefreshToken = await this.generateRefreshToken(user.id);

    await this.refreshTokenRepository.create({
      data: {
        token: newRefreshToken,
        user: { connect: { id: user.id } },
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });

    await this.refreshTokenRepository.delete({ id: storedToken.id });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 300000);

    await this.passwordResetRepo.create({
      data: {
        token,
        expiresAt,
        user: { connect: { id: user.id } },
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await this.emailService.sendPasswordResetEmail(user.email, resetLink);

    return {
      message: 'Password reset token generated',
      resetLink,
      token,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const passwordReset = await this.passwordResetRepo.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!passwordReset || passwordReset.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await hash(newPassword, 10);

    await this.userRepo.update(
      { id: passwordReset.userId },
      { password: hashedPassword },
    );

    await this.passwordResetRepo.delete({ where: { id: passwordReset.id } });

    return { message: 'Password reset successfully' };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;

    // Verifica o usuário pelo ID
    const user = await this.userRepo.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Valida a senha atual
    const isCurrentPasswordValid = await compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Gera o hash da nova senha e atualiza o usuário
    const hashedNewPassword = await hash(newPassword, 10);
    await this.userRepo.update({ id: userId }, { password: hashedNewPassword });

    return { message: 'Password changed successfully' };
  }

  private generateAccessToken(
    userId: string,
    userRole: string,
    userPremiun: boolean,
  ) {
    return this.jwtService.signAsync({
      sub: userId,
      role: userRole,
      premiun: userPremiun,
    });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: userId },
      { secret: env.refreshToken, expiresIn: '7d' },
    );

    return token;
  }
}
