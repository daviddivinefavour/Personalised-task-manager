import { InjectModel } from '@nestjs/sequelize';
import { Authentication } from '../models/authentication.model';
import { Injectable } from '@nestjs/common';
import { IAuthentication } from '../interfaces/authentication.interface';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectModel(Authentication)
    private authenticationEntity: typeof Authentication,
  ) {}
  async createAuthentication(
    createAuthenticationDto: IAuthentication,
  ): Promise<Authentication> {
    return this.authenticationEntity.create(createAuthenticationDto);
  }
  async getAuthCredentialUserById(
    userId: string,
  ): Promise<Authentication | null> {
    return this.authenticationEntity.findOne({ where: { userId } });
  }
}
