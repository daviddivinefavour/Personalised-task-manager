import { ApiProperty } from '@nestjs/swagger';

export class WelcomeResponseDto {
  @ApiProperty({
    description: 'Welcome message',
    example: 'Welcome to Niyo-Todo',
  })
  message: string;
}

export class PaginationMetaDto {
  @ApiProperty({ description: 'Total number of items', example: 100 })
  totalItems: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;

  @ApiProperty({ description: 'Current page', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  pageSize: number;
}
