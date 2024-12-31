import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AllExceptionsFilter } from "./common/filters/all-exception-filter.filter";
import { ResModule } from './modules/users/res/res.module';
import { UsersModule } from './modules/users/users.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ResModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: "APP_FILTER",
    useClass: AllExceptionsFilter
  }],
})
export class AppModule {}
