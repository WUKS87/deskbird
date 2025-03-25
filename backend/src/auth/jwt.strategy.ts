import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log(req.cookies);

          return req?.cookies?.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    console.log('Decoded JWT payload:', payload);
    
    // Here you could also add additional validation logic if needed
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
