import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HelpersService {
  generateRandomDigits = (num: number): number =>
    Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);

  hashString = (str: string): string => bcrypt.hashSync(str, 10);
  compareHashedString = (hash: string, str: string): boolean =>
    bcrypt.compareSync(str, hash);
}
