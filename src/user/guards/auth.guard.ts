import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    const authToken = getCookie(context.getArgs()[2].req, 'JWT_AUTH');

    if (!authToken) {
      throw new BadRequestException('Authorization cookie not found.');
    }

    const validationResult = this.auth.ValidateToken(authToken);

    if (validationResult === true) return true;

    throw new UnauthorizedException(validationResult);
  }
}

export const getCookie = (req, cookieName) => {
  let cookieValue;
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) return '';

  cookieHeader.split(';').forEach((cookiePart) => {
    const [key, value] = cookiePart.trim().split('=');
    if (key === cookieName) cookieValue = value;
  });

  if (!cookieValue) return '';

  return cookieValue.replace(/^%22|(%22)$/g, '');
};
