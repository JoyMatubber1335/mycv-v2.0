import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthSurvice } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthSurvice],
  controllers: [UsersController],
})
export class UsersModule {}
