import { 
  Controller, 
  Get, 
  Logger, 
  Post, 
  UsePipes, 
  ValidationPipe, 
  Body, 
  Query, 
  Put, 
  Param 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {

  private logger = new Logger(CategoriasController.name)

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking,
    private categoriasService: CategoriasService
  ) {}

  private clientAdminBackend = 
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ) {
    this.categoriasService.criarCategoria(criarCategoriaDto)
  }

  @Get()
  async consultarCategorias(@Query('idCategoria') _id: string) {
    return await this.categoriasService.consultarCategorias(_id)
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)    
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string
  ) {
    this.categoriasService.atualizarCategoria(
      atualizarCategoriaDto, 
      _id
    )
  }    

}
