import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from '@app/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'apps/server/src/posts/entities/post.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'apps/server/src/users/entities/user.entity';
import { Follow } from 'apps/server/src/follow/entities/follow.entity';
import { Media } from 'apps/server/src/media/entities/media.entity';
import { GatewayModule } from './gateway/gateway.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notification.processor';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './entities/notifications.schema';
import { MongoDBModule } from './database/mongo.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { QUEUES } from 'apps/constants';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([Post, User, Follow, Media]),
    GatewayModule,
    MongoDBModule,
    ConfigModule,
    LoggerModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          connection: {
            host: configService.getOrThrow<string>('REDIS_HOST'),
            port: configService.getOrThrow<number>('REDIS_PORT'),
          },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: QUEUES.NOTIFICATION_QUEUE,
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationProcessor],
})
export class NotificationsModule {}
