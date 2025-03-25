import { IsNotEmpty, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}

export class EditUserDto extends CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
