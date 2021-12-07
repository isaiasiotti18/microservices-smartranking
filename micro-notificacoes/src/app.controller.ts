import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Desafio } from './interfaces/desafio.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @EventPattern('notificacao-novo-desafio')
  async enviarEmailAdversario(
    @Payload() desafio: Desafio,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();

    const originalMessage = context.getMessage();

    try {
      this.logger.log(`Desafio: ${JSON.stringify(desafio)}`);

      await this.appService.enviarEmailParaAdversario(desafio);

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.log(`Desafio: ${JSON.stringify(error.message)}`);

      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) {
        await channel.ack(originalMessage);
      }
    }
  }
}
