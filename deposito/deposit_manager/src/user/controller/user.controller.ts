import { BadRequestException, Body, Controller, Param, Post, Get, Res, HttpStatus, Request, Header, Put, Req, Delete, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { Response } from 'express';

@Controller()
export class UserController {

    constructor(private readonly userService:UserService) { }

    @Post('/user')
    async cadastraUsuario(@Body() user: UserDto) {

        try {
            await this.userService.cadastraUsuario(user);
            return {
                mssg: 'Usuario inserido no sistema'
            }
        } catch (error) {
            throw new BadRequestException('Algo deu errado, verifique os dados e se o email já foi cadastrado anteriormente!')
        }

    }

    @Delete("/user/:id")
      async deletaUsuario(@Param('id') id: number, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {

            var json = await this.userService.deletaUsuario(
                id)

          return response.status(HttpStatus.OK).json(
            {
                msg:"Usuario deletado com sucesso",
                json
            }
            )
        } catch (exception) {
          return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
      }

  @Get("/login")
  async login(@Query('email') nome: string, @Query('password') senha: string, @Res() response: Response): Promise<any> {
    try {

      return response.status(HttpStatus.OK).json(await this.userService.login(nome, senha))
    } catch (exception) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
  @Get("/user")
  async getUserByEmailPwd(@Query('email') nome: string, @Query('password') senha: string, @Res() response: Response): Promise<any> {
    try {

      return response.status(HttpStatus.OK).json(await this.userService.getUserByEmailPwd(nome, senha))
    } catch (exception) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
  @Get("/logoff")
  async logoff(@Query('email') nome: string, @Query('password') senha: string, @Res() response: Response): Promise<any> {
    try {

      return response.status(HttpStatus.OK).json(await this.userService.logOff(nome, senha))
    } catch (exception) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }


  @Get("/users")
  async getAllUsers(@Res() response: Response): Promise<any> {
    try {
      return response.status(HttpStatus.OK).json(await this.userService.getAllUsuarios())
    } catch (exception) {
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

    // @Get('/product')
    // @Header('Content-type', 'application/json')
    // async get(@Res() res: Response) {
    //     var json = await this.productService.getAllProdutos()
    //     try {
    //         return res.json(json);

    //         // return response.status(HttpStatus.OK).json(await this.productService.getAllProdutos())
    //     } catch (exception) {
    //         return res.status(HttpStatus.BAD_REQUEST).json(exception)
    //     }
    // }

    // @Get('/product-amount')
    // @Header('Content-type', 'application/json')
    // async getProductAmount(@Res() res: Response) {
    //     var json = await this.productService.getQuantidadeProduto()
    //     try {
    //         return res.json(json);
    //     } catch (exception) {
    //         return res.status(HttpStatus.BAD_REQUEST).json(exception)
    //     }
    // }

    //   @Put("/product/:id")
    //   async put(@Param() queryParams: any, @Body() params: ProductDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    //     try {
    //       var json = await this.productService.atualizaProduto({ ...params, ...queryParams })
    //       return response.status(HttpStatus.OK).json(json)
    //     } catch (exception) {
    //       return response.status(HttpStatus.BAD_REQUEST).json(exception)
    //     }
    //   }
      
    //   @Delete("/product/:id")
    //   async delete(@Param('id') id: number, @Res() response: Response, @Req() request: Request): Promise<any> {
    //     try {

    //         var json = await this.productService.deletaProduto(
    //             id)

    //       return response.status(HttpStatus.OK).json(
    //         {
    //             msg:"Deletado com sucesso",
    //             json
    //         }
    //         )
    //     } catch (exception) {
    //       return response.status(HttpStatus.BAD_REQUEST).json(exception)
    //     }
    //   }


    // }

    // }
}