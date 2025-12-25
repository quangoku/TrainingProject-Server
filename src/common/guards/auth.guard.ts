import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const logger = new Logger(AuthGuard.name);
    // const request: Request = context.switchToHttp().getRequest();
    // logger.log(request.headers);
    return true;
  }
}
