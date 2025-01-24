import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailSendDto {
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
