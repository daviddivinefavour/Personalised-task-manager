import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { WelcomeResponseDto } from './Dtos/default.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @ApiOperation({
    summary: 'Niyo-Todo endpoint',
    description: 'Niyo-Todo home',
    tags: ['Home'],
  })
  @ApiOkResponse({
    type: WelcomeResponseDto,
    status: 200,
    description: 'Successful',
  })
  getWelcome(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({ message: 'Welcome to Niyo-Todo' });
  }
}
