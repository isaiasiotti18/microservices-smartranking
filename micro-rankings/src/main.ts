import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as momentTimezone from 'moment-timezone';

const configService = new ConfigService();

const RABBITMQ_USER = configService.get<string>('RABBITMQ_USER');
const RABBITMQ_PASSWORD = configService.get<string>('RABBITMQ_PASSWORD');
const RABBITMQ_URL = configService.get<string>('RABBITMQ_URL');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      //urls: ['amqp://user:q7W2UQk249gR@18.210.17.173:5672/smartranking'],
      urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
      noAck: false,
      queue: 'rankings',
    },
  });

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen();
}
bootstrap();
