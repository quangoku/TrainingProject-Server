import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'apps/server/src/follow/entities/follow.entity';
import { Repository } from 'typeorm';
import { NotificationsGateway } from './gateway/notification.gateway';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './entities/notifications.schema';
import { Model } from 'mongoose';
import { LoggerService } from '@app/common/logger/my-logger.service';
import { JOBS } from 'apps/constants';
import { Post } from 'apps/server/src/posts/entities/post.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly logger: LoggerService,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectRepository(Post) private userRepository: Repository<Post>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {
    this.logger.setContext(NotificationsService.name);
  }

  async getNotifications(userId: number) {
    const notifications = await this.notificationModel
      .find({
        recipientId: userId,
      })
      .sort({ createdAt: -1 });
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

  async sendNewPostNotification(post: any) {
    const followers = await this.getFollowersByUserId(post.author_id);
    const followersId = followers.map((follower) => follower.id);
    if (followersId.length === 0) {
      return;
    }
    const notificationData = followersId.map((followerId) => ({
      recipientId: followerId as number,
      issuer: post.author,
      type: JOBS.NEW_POST,
      content: `${post.author.username} has posted a new thread`,
      postId: post.id as number,
      isRead: false,
    }));

    const sentData = {
      issuer: post.author,
      type: JOBS.NEW_POST,
      content: `${post.author.username} has posted a new thread`,
      postId: post.id as number,
    };

    await this.notificationModel.insertMany(notificationData);
    this.notificationsGateway.sendNotifications(followersId, sentData);
    return;
  }
  async sendNewCommentNotification(post: any) {
    const recipientId = await this.getUserIdByPostId(post.parent_id);
    const notificationData = {
      recipientId: recipientId,
      issuer: post.author,
      type: JOBS.NEW_COMMENT,
      content: `${post.author.username} has comment in your post`,
      postId: post.id as number,
      isRead: false,
    };
    const sentData = {
      issuer: post.author,
      type: JOBS.NEW_COMMENT,
      content: `${post.author.username} has comment in your post`,
      postId: post.id as number,
    };
    await this.notificationModel.insertOne(notificationData);
    this.notificationsGateway.sendNotifications([recipientId], sentData);
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

  async getUserIdByPostId(postId: number) {
    const post = await this.userRepository.findOne({
      where: { id: postId },
    });
    return post?.author_id;
  }
}
