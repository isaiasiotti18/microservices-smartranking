import { Module } from '@nestjs/common';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { ClientProxySmartRanking } from './modules/proxyrmq/client-proxy'
import { ProxyRMQModule } from './modules/proxyrmq/proxyrmq.module';
import { AwsModule } from './modules/aws/aws.module';
import { AwsService } from './modules/aws/aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule, 
    ProxyRMQModule, 
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [ClientProxySmartRanking, AwsService],
})
export class AppModule {}
