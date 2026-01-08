import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.REDIS,
      options: {
        port: 6379,
        host: 'localhost',
      },
    },
  );
  await app.listen();
  console.log(' Notifications microservice is listening...');
}
bootstrap();
