import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    },
  );
  await app.listen();
  console.log('Notifications service is running...');
}
bootstrap();
