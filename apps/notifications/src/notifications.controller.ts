import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CMD } from 'apps/constants';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}
  @MessagePattern(CMD.GET_NOTIFICATION)
  async getNotification(@Payload() data: { userId: number }) {
    return await this.notificationService.getNotifications(data.userId);
  }

  @MessagePattern(CMD.MARK_AS_READ)
  async markAsRead(@Payload() data: { notificationId: string }) {
    return await this.notificationService.markAsRead(data.notificationId);
  }

  @MessagePattern(CMD.MARK_ALL_AS_READ)
  async markAllAsRead(@Payload() data: { userId: number }) {
    return await this.notificationService.markAllAsRead(data.userId);
  }
}
