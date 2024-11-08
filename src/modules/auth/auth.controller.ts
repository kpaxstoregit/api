import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgotDto';
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

  @Post('check-email')
  @IsPublic()
  async checkEmailExists(@Body('email') email: string) {
    return this.authService.checkEmailExists(email);
  }

  @Post('refresh-token')
  @IsPublic()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('forgot-password')
  @IsPublic()
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @IsPublic()
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  @Post('change-password')
  async changePassword(
    @ActiveUserId() userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(userId, changePasswordDto);
  }
}
