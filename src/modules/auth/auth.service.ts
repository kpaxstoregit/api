import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { env } from 'src/shared/config/env';
import { RefreshTokenRepository } from 'src/shared/database/repositories/refreshToken.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { RefreshTokenDto } from './dto/refrashTokenDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userRepo.findUnique({
      where: { email },
    });

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
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        isPremium: false,
        createdAt: user.createdAt,
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
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: env.jwtSecret,
      });

      const user = await this.userRepo.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
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
          expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 dia de expiração
          isActive: true,
        },
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
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

  private generateRefreshToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId }, { expiresIn: '7d' });
  }
}
