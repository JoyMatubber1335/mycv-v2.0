import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  findOne(id: number) {
    const user = this.repo.findOneBy({ id });
    if (!user) {
      console.log('user not found');
    }
    return user;
  }
  find(email: string) {
    const user = this.repo.find({ where: { email } });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }
  async update(id: number, attars: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attars);
    return this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
