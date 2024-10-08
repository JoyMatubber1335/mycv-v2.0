import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      console.log('user not found');
    }
    return user;
  }

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
