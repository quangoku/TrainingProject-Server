import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('post_created')
  getHello(): string {
    console.log('i got message');
    return this.notificationsService.getHello();
  }
}
