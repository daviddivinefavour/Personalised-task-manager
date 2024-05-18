// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { IPayload } from '../interfaces/shared.interfaces';
// import { TOKEN_SECRET } from 'src/config/constants';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: TOKEN_SECRET,
//     });
//   }
//   async validate(payload: IPayload): Promise<IPayload> {
//     return {
//       id: payload.id,
//       email: payload.email,
//       isErrandPerson: payload.isErrandPerson,
//     };
//   }
// }
