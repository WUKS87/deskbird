import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    // Fetch the user using the UsersService
    const user = await this.usersService.findOneByEmail(email);
    
    // Basic password check (in production, use bcrypt or similar)
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Prepare the payload. Customize as needed.
    const payload = { email: user.email, sub: user.id, role: user.role };

    // Sign and return the JWT token along with the user role
    const token = this.jwtService.sign(payload);
    
    return { token, role: user.role };
  }
}
