import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const configService = new ConfigService();

const RABBITMQ_USER = configService.get<string>('RABBITMQ_USER');
const RABBITMQ_PASSWORD = configService.get<string>('RABBITMQ_PASSWORD');
const RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
        noAck: false,
        queue: 'notificacoes',
      },
    },
  );

  await app.listen();
}
bootstrap();
