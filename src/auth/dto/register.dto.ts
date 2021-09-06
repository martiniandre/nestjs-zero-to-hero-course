import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
