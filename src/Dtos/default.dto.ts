import { ApiProperty } from '@nestjs/swagger';

export class WelcomeResponseDto {
  @ApiProperty({
    description: 'Welcome message',
    example: 'Welcome to Niyo-Todo',
  })
  message: string;
}
