import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TOKEN_SECRET } from 'src/config/constants';
import { IJwtPayload } from '../interfaces/shared.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_SECRET,
    });
  }
  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
