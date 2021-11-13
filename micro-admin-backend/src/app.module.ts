import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { JogadoresModule } from './modules/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:dmlZVk61MXcvqjed@cluster.rpaax.mongodb.net/adminbackenddb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    CategoriasModule,
    JogadoresModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
