import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Use the same secret as in the JwtModule! Dodati ovo u env fajl i napisati komentar da za produkciju treba da bude neki secret manager
    });
  }

  async validate(payload: any) {
    // Here you could also add additional validation logic if needed
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
