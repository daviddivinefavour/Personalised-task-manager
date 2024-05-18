import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    // TODO: Validate the user if it still exist in the db else throw an unauthorized error
    return req.user;
  },
);
