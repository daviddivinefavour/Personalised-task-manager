import { Request } from 'express';
import { IJwtPayload } from '../interfaces/shared.interfaces';

// Utility function to get userId from the request object
export function getUserIdFromRequest(req: Request): string {
  const user = req.user as IJwtPayload;
  if (!user || !user.id) {
    throw new Error('User information is not available in the request');
  }
  return user.id;
}
