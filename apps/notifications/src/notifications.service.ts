import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'apps/server/src/follow/entities/follow.entity';
import { Repository } from 'typeorm';
import { NotificationsGateway } from './gateway/notification.gateway';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './entities/notifications.schema';
import { Model } from 'mongoose';
import { LoggerService } from '@app/common/logger/my-logger.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly logger: LoggerService,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {
    this.logger.setContext(NotificationsService.name);
  }

  async getNotifications(userId: number) {
    const notifications = await this.notificationModel.find({
      recipientId: userId,
    });
    return notifications;
  }

  async markAsRead(notificationId: string) {
    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.isRead = true;
    await notification.save();
    return notification;
  }

  async markAllAsRead(userId: number) {
    const notifications = await this.notificationModel.updateMany(
      { recipientId: userId },
      { $set: { isRead: true } },
    );
    return notifications;
  }

  async sendNotification(post: any) {
    const followers = await this.getFollowersByUserId(post.author_id);
    const followersId = followers.map((follower) => follower.id);
    if (followersId.length === 0) {
      return;
    }

    const notificationData = followersId.map((followerId) => ({
      recipientId: followerId as number,
      senderId: post.author_id as number,
      type: 'NEW_POST',
      content: `User ${post.author_id} has posted a new thread`,
      postId: post.id as number,
      isRead: false,
    }));
    this.logger.log(notificationData);
    await this.notificationModel.insertMany(notificationData);
    this.notificationsGateway.sendToFollowers(followersId, post);
    return;
  }

  async getFollowersByUserId(userId: number) {
    const followers = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.following_id = :userId', { userId })
      .innerJoin('users', 'u', 'u.id = follow.follower_id')
      .select(['u.id as id', 'u.username as username', 'u.email as email'])
      .getRawMany();
    return followers;
  }
}
