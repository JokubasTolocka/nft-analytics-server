import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getCookie } from 'src/user/guards/auth.guard';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const cookieValue = getCookie(ctx.getArgs()[2].req, data);

    return cookieValue;
  },
);
