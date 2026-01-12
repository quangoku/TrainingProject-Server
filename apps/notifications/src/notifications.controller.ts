import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('post_created')
  async getHello(data: any) {
    const { post } = data;
    await this.notificationsService.processNewPostNotification(post);
  }
}
