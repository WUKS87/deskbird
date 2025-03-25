import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole, Users } from './user.entity';
import { CreateUserDto, EditUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // Method to find a user by email.
  async findOneByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, role } = createUserDto;

    // Check for duplicate email.
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({
      email,
      password: 'password',
      role,
    });

    return this.usersRepository.save(user);
  }

  async update(createUserDto: EditUserDto) {
    const { id, email, role } = createUserDto;

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new ConflictException('User not found');
    }

    user.email = email;
    user.role = role;

    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
