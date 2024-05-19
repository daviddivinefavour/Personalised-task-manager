import { Logger, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { TOKEN_SECRET } from 'src/config/constants';
import { HelpersService } from 'src/shared/utils/helpers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { TaskRepository } from './repositories/task.repo';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Task]),
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
    TaskRepository,
    TaskService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [TaskController],
})
export class TasksModule {}
