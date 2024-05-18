import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/modules/users/interfaces/user.interface';
import { IResponseDto } from 'src/shared/types';

export class UserResponseDto implements IResponseDto<IUser> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'User retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      id: 'ce0c8981-893a-4649-85d1-6796c8094b81',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      verifiedAt: new Date().toISOString(),
    },
  })
  data: IUser;
}

export class UsersResponseDto implements IResponseDto<IUser[]> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Users retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: Object,
    description: 'Data from api',
    example: [
      {
        id: 'ce0c8981-893a-4649-85d1-6796c8094b81',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        verifiedAt: new Date().toISOString(),
      },
    ],
  })
  data: IUser[];
}
