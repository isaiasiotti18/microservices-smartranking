import { Module } from '@nestjs/common';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { ClientProxySmartRanking } from './modules/proxyrmq/client-proxy'
import { ProxyRMQModule } from './modules/proxyrmq/proxyrmq.module';

@Module({
  imports: [CategoriasModule, JogadoresModule, ProxyRMQModule],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
