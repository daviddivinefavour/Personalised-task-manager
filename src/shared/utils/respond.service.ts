import { Injectable } from '@nestjs/common';
import { IResponseData } from '../interfaces/shared.interfaces';

@Injectable()
export class ResponseService {
  returnResult<T extends Record<string, any>>(
    attribute: IResponseData<T>,
  ): IResponseData<T> {
    return { ...attribute };
  }
  failResult(error: string): IResponseData<null> {
    return { message: error, success: false };
  }
}
