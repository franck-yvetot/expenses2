import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeORM will be added later when creating data models
    // Install @nestjs/typeorm, typeorm, and pg packages when ready
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}