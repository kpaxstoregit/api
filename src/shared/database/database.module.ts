import { Global, Module } from '@nestjs/common';
import { ContactModule } from 'src/modules/contact/contact.module';
import { PrismaService } from './prisma.service';
import { PasswordResetRepository } from './repositories/passwordReset.repositories';
import { ProductRepository } from './repositories/product.repository';
import { RefreshTokenRepository } from './repositories/refreshToken.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    RefreshTokenRepository,
    ProductRepository,
    PasswordResetRepository,
    ContactModule,
  ],
  exports: [
    PrismaService,
    UsersRepository,
    RefreshTokenRepository,
    ProductRepository,
    PasswordResetRepository,
    ContactModule,
  ],
})
export class DatabaseModule {}
