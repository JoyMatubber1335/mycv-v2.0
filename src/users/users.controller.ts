import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/users.dto';
import { TestDto } from './dtos/test.dto';
import { AuthSurvice } from './auth.service';
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthSurvice,
  ) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }
  @Serialize(UserDto)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      console.log('user not found');
    }
    return user;
  }
  @Serialize(TestDto)
  @Get()
  findUsers(@Query('email') email: string) {
    const user = this.userService.find(email);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
