import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern } from '@nestjs/microservices';
import { EVENTS } from 'apps/constants';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(EVENTS.POST_CREATED)
  async getHello(data: any) {
    const { post } = data;
    await this.notificationsService.processNewPostNotification(post);
  }
}
