import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class loggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          timeStamp: new Date().toISOString(),
          method: request.method,
          latencyMs: Date.now() - now,
        },
      })),
    );
  }
}
