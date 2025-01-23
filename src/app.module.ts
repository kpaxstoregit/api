import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CartModule } from './modules/cart/cart.module';
import { ContactModule } from './modules/contact/contact.module';
import { CouponModule } from './modules/cupom/coupon.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EmailModule } from './modules/email/email.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { NotificationPreferencesModule } from './modules/notification/notification-preferences.module';
import { ProductModule } from './modules/product/product.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';

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
    SupabaseModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
