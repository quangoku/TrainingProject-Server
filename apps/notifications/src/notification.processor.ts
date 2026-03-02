import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from './notifications.service';
import { JOBS, QUEUES } from 'apps/constants';

@Processor(QUEUES.NOTIFICATION_QUEUE)
export class NotificationProcessor extends WorkerHost {
  constructor(private readonly notificationService: NotificationsService) {
    super();
  }
  async process(job: Job): Promise<any> {
    const post = job.data.post;
    if (job.name == JOBS.NEW_POST) {
      await this.notificationService.sendNewPostNotification(post);
    } else if (job.name == JOBS.NEW_COMMENT) {
      await this.notificationService.sendNewCommentNotification(post);
    }
    return post;
  }
}
