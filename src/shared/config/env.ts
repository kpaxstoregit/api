import * as dotenv from 'dotenv';
dotenv.config();

import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  sendGridApiKey: string;

  @IsString()
  @IsNotEmpty()
  sendGridEmailFrom: string;

  @IsString()
  @IsOptional()
  frontendUrl?: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET!,
  dbURL: process.env.DATABASE_URL!,
  refreshToken: process.env.JWT_SECRET_REFRESH!,
  sendGridApiKey: process.env.SENDGRID_API_KEY!,
  sendGridEmailFrom: process.env.SENDGRID_EMAIL_FROM!,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3333',
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 4));
}
