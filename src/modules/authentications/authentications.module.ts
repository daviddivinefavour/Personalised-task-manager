import { Logger, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { AuthenticationRepository } from './repositories/authentication.repo';
import { AuthenticationService } from './services/authentication.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { TOKEN_SECRET } from 'src/config/constants';
import { HelpersService } from 'src/shared/utils/helpers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Authentication } from './models/authentication.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Authentication]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    ResponseService,
    HelpersService,
    Logger,
    UserService,
    AuthenticationRepository,
    AuthenticationService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationsModule {}
