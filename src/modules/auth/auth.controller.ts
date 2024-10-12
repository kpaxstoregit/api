import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { RefreshTokenDto } from './dto/refrashTokenDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @IsPublic()
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  @IsPublic()
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('logout')
  logout(@ActiveUserId() userId: string, @Body() logoutDto: RefreshTokenDto) {
    return this.authService.logout(userId, logoutDto);
  }

  @Post('refresh-token')
  @IsPublic()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
