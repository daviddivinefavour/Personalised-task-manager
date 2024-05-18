import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userEntity: typeof User,
  ) {}
  async getUsers(page: number = 1, limit: number = 25): Promise<User[]> {
    const offset = (page - 1) * limit;

    return await this.userEntity.findAll({
      offset,
      limit,
    });
  }
  async getUserById(id: string): Promise<User | null> {
    return this.userEntity.findByPk(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userEntity.findOne({ where: { email } });
  }
  async createUser(createUserDto: IUser): Promise<User> {
    return this.userEntity.create(createUserDto);
  }
}
