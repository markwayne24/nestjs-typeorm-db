import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }

  createUser(userDetails: CreateUserParams) {
    // create is not a async function/method and returns an object
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    // save is an async function/method and returns a promise
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: CreateUserParams) {
    return this.userRepository.update({ id: id }, userDetails);
  }
}
