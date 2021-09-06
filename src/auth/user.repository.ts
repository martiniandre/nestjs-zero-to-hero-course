import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { SignInDTO } from './dto/signIn.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    const users = await this.find();
    return users;
  }

  async signIn(userData: SignInDTO): Promise<User | null> {
    const { email, password } = userData;
    const hasEmail = await this.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!hasEmail) {
      throw new NotFoundException(`Invalid email or password`);
    }
    if (email === hasEmail.email && hasEmail.password === password) {
      console.log('loguei');
      return hasEmail;
    }
    return null;
  }

  async createUser(registerDTO: RegisterDTO): Promise<void> {
    const newUser = this.create(registerDTO);
    await this.save(newUser);
  }
}
