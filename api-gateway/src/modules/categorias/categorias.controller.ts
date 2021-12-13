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
  Param, 
  UseGuards
} from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { CategoriasService } from './categorias.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/categorias')
export class CategoriasController {

  constructor(
    private categoriasService: CategoriasService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto
  ) {
    this.categoriasService.criarCategoria(criarCategoriaDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async consultarCategorias(@Query('idCategoria') _id: string): Promise<any> {
    return await this.categoriasService.consultarCategorias(_id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:_id')
  @UsePipes(ValidationPipe)    
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('_id') _id: string
  ): void {
    this.categoriasService.atualizarCategoria(
      atualizarCategoriaDto, 
      _id
    )
  }    

}
