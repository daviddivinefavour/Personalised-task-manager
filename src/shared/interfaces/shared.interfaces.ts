export interface IJwtPayload {
  id: string;
  email: string;
}

export interface IRequestWithUser extends Request {
  user?: Record<string, any>;
}
export interface IResponseData<
  T extends Record<string, any> = Record<string, any>,
> {
  success: number | boolean;
  message?: string;
  data?: T;
}
