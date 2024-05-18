import { Logger, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repo';
import { ResponseService } from 'src/shared/utils/respond.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, Logger, ResponseService],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
