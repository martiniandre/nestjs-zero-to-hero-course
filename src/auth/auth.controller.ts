import { RegisterDTO } from './dto/register.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { User } from './user.entity';
import { Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.authService.getusers();
  }

  @Post()
  signUp(@Body() registerDTO: RegisterDTO): Promise<void> {
    this.authService.signUp(registerDTO);
    return;
  }

  @Post('/:id')
  signIn(@Body() signInDto: SignInDTO): Promise<User | null> {
    return this.authService.signIn(signInDto);
  }
}
