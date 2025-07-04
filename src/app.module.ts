import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RestaurantModule } from './modules/restaurants/restaurant.module';
import { ReservationModule } from './modules/reservations/reservation.module';
import { TableModule } from './modules/tables/table.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, TableModule, RestaurantModule, ReservationModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
