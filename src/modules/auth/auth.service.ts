import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
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

    return {
      accessToken,
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
}
