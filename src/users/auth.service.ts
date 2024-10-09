import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthSurvice {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('User already exists');
    }

    const salt = randomBytes(8).toString('hex'); //Generate salt
    const hash = (await scrypt(password, salt, 32)) as Buffer; //Generate hash with salt
    const result = salt + '.' + hash.toString('hex'); //joint salt and hash
    const newUser = await this.userService.create(email, result); //Create new user
    return newUser;
  }

  async signIn(email: string, password: string) {
    const [users] = await this.userService.find(email);
    if (!users) {
      throw new BadRequestException('Invalid credentials email');
    }
    const [salt, storedHash] = users.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials password');
    }
    return users;
  }
}
