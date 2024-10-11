import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { IsPublic } from 'src/shared/decorators/IsPublic';
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
}
