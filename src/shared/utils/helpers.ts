import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  generateRandomDigits = (num: number): number =>
    Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);
}
