import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RefreshTokenRepository } from './repositories/refreshToken.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, RefreshTokenRepository],
  exports: [UsersRepository, RefreshTokenRepository],
})
export class DatabaseModule {}
