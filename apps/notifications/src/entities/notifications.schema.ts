import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class IssuerInfo {
  @Prop({ required: true })
  id: number;

  @Prop()
  username: string;

  @Prop()
  image: string;
}

@Schema({ versionKey: false })
export class Notification extends Document {
  @Prop({ required: true })
  recipientId: number;

  @Prop({ required: true })
  issuer: IssuerInfo;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  postId: number;

  @Prop({ required: true })
  type: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({
    default: Date.now,
    index: { expireAfterSeconds: 60 * 60 * 24 * 7 * 10 },
  }) //expired after 10 weeks
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
