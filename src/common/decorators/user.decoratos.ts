import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requet = ctx.switchToHttp().getRequest();
    return requet.user;
  },
);
