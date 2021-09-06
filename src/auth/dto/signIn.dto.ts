import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  password: string;
}
