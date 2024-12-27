import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CartModule } from './modules/cart/cart.module';
import { ContactModule } from './modules/contact/contact.module';
import { CouponModule } from './modules/cupom/coupon.module';
import { EmailModule } from './modules/email/email.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { NotificationPreferencesModule } from './modules/notification/notification-preferences.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { SupabaseService } from './modules/supabase/supabase.service';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    ProductModule,
    EmailModule,
    ContactModule,
    NewsletterModule,
    BlogModule,
    CouponModule,
    CartModule,
    NotificationPreferencesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SupabaseService,
  ],
})
export class AppModule {}
