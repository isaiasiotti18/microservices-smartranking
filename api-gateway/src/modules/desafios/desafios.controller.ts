import { 
  Controller, 
  Post, 
  UsePipes, 
  ValidationPipe, 
  Body, 
  Get, 
  Query, 
  Put, Param, Delete, UseGuards,
} from '@nestjs/common';

import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { DesafiosService } from './desafios.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(
    private desafiosService: DesafiosService
  ) {}
    
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto
  ) {
    await this.desafiosService.criarDesafio(criarDesafioDto)
  }
    
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async consultarDesafios(
    @Query('idJogador') idJogador: string
  ): Promise<any> {
    return await this.desafiosService.consultarDesafios(idJogador)
  }

  @UseGuards(AuthGuard('jwt'))      
  @Put('/:desafio')
  async atualizarDesafio(
    @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('desafio') _id: string,
  ) {
    this.desafiosService.atualizarDesafio(atualizarDesafioDto, _id);
  }
    
       
  @UseGuards(AuthGuard('jwt'))
  @Post('/:desafio/partida/')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('desafio') _id: string,
  ) {
    await this.desafiosService.atribuirDesafioPartida(
      atribuirDesafioPartidaDto,
      _id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:_id')
  async deletarDesafio(@Param('_id') _id: string) {
    await this.desafiosService.deletarDesafio(_id);
  }

}