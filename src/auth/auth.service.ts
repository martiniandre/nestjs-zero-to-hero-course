import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RegisterDTO } from './dto/register.dto';
import { SignInDTO } from './dto/signIn.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  getusers(): Promise<User[]> {
    const users = this.userRepository.getUsers();
    return users;
  }

  signUp(registerDTO: RegisterDTO): Promise<void> {
    this.userRepository.createUser(registerDTO);
    return;
  }

  signIn(signInDTO: SignInDTO): Promise<User | null> {
    return this.userRepository.signIn(signInDTO);
  }
}
