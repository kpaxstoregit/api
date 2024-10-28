// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/pdate-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserbyId(userId: string) {
    const user = await this.usersRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      premium: user.isPremium,
    };
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id: userId }, updateUserDto);
  }
}
