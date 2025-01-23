import { Global, Module } from '@nestjs/common';
import { BlogModule } from 'src/modules/blog/blog.module';
import { ContactModule } from 'src/modules/contact/contact.module';
import { PrismaService } from './prisma.service';
import { HistoryOrdersRepository } from './repositories/dashboard/history.orders';
import { NotificationPreferencesRepository } from './repositories/notification-preferences.repository';
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
    BlogModule,
    NotificationPreferencesRepository,
    HistoryOrdersRepository,
  ],
  exports: [
    PrismaService,
    UsersRepository,
    RefreshTokenRepository,
    ProductRepository,
    PasswordResetRepository,
    ContactModule,
    BlogModule,
    NotificationPreferencesRepository,
    HistoryOrdersRepository,
  ],
})
export class DatabaseModule {}
