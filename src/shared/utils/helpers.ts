import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PaginationResult } from '../interfaces/shared.interfaces';
@Injectable()
export class HelpersService {
  generateRandomDigits = (num: number): number =>
    Math.floor(Math.random() * (9 * 10 ** (num - 1))) + 10 ** (num - 1);

  hashString = (str: string): string => bcrypt.hashSync(str, 10);
  compareHashedString = (hash: string, str: string): boolean =>
    bcrypt.compareSync(str, hash);

  paginate<T>(
    findAndCountAllResult: { rows: T[]; count: number },
    page: number,
    pageSize: number,
  ): PaginationResult<T> {
    const totalItems = findAndCountAllResult.count;
    const totalPages = Math.ceil(totalItems / pageSize);
    const data = findAndCountAllResult.rows;

    return {
      data,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  }
}
