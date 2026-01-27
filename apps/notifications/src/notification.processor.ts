import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';
import { QUEUES } from 'apps/constants';

@Processor(QUEUES.NOTIFICATION_QUEUE)
export class NotificationProcessor extends WorkerHost {
  constructor(private readonly notificationService: NotificationsService) {
    super();
  }
  async process(job: Job): Promise<any> {
    const post = job.data.post;
    await this.notificationService.sendNotification(post);
    return post;
  }
}
