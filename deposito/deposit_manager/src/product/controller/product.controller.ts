import { BadRequestException, Body, Controller, Param, Post, Get, Res, HttpStatus, Request, Header, Put, Req, Delete, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto } from '../dto/product.dto';
import { Response } from 'express';

@Controller()
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('/product')
    async insereProduto(@Body() product: ProductDto) {

        try {
            await this.productService.solicitaProduto(product,product.inventory);
            return {
                mssg: 'Produto inserido no sistema'
            }
        } catch (error) {
            throw new BadRequestException('somenthin went wrong')
        }

    }

    @Get('/product')
    @Header('Content-type', 'application/json')
    async get(@Res() res: Response) {
        var json = await this.productService.getAllProdutos()
        try {
            return res.json(json);

            // return response.status(HttpStatus.OK).json(await this.productService.getAllProdutos())
        } catch (exception) {
            return res.status(HttpStatus.BAD_REQUEST).json(exception)
        }
    }

    @Get('/productById')
    @Header('Content-type', 'application/json')
    async getById(@Query('id') id: number, @Res() response: Response): Promise<any> {
        var json = await this.productService.getProduto(id)
        try {
            return response.status(HttpStatus.OK).json(json);

            // return response.status(HttpStatus.OK).json(await this.productService.getAllProdutos())
        } catch (exception) {
            return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
    }

    @Get('/product-amount')
    @Header('Content-type', 'application/json')
    async getProductAmount(@Res() res: Response) {
        var json = await this.productService.getQuantidadeProduto()
        try {
            return res.json(json);
        } catch (exception) {
            return res.status(HttpStatus.BAD_REQUEST).json(exception)
        }
    }

    @Get('/product-month')
    @Header('Content-type', 'application/json')
    async getProductAmountMonth(@Res() res: Response) {
        var json = await this.productService.getQuantidadeProdutoPorMes()
        try {
            return res.json(json);
        } catch (exception) {
            return res.status(HttpStatus.BAD_REQUEST).json(exception)
        }
    }

      @Put("/product/:id")
      async put(@Param() queryParams: any, @Body() params: ProductDto, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {
          var json = await this.productService.atualizaProduto({ ...params, ...queryParams })
          return response.status(HttpStatus.OK).json(json)
        } catch (exception) {
          return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
      }

      @Put("/product-atualiza-quantidade")
      async atualizaQuantidade(@Param() queryParams: any, @Body() params: {id:number,amount:number,new_amount:number}, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {
          var json = await this.productService.atualizaQuantidade(params)
          return response.status(HttpStatus.OK).json(json)
        } catch (exception) {
          return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
      }
      
      @Put("/product-subtrai-quantidade")
      async subtraiQuantidade(@Param() queryParams: any, @Body() params: {id:number,new_amount:number}, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {
          var json = await this.productService.subtraiQuantidade(params)
          return response.status(HttpStatus.OK).json(json)
        } catch (exception) {
          return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
      }
      

      @Delete("/product/:id")
      async delete(@Param('id') id: number, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {

            var json = await this.productService.deletaProduto(
                id)

          return response.status(HttpStatus.OK).json(
            {
                msg:"Deletado com sucesso",
                json
            }
            )
        } catch (exception) {
          return response.status(HttpStatus.BAD_REQUEST).json(exception)
        }
      }


    // }

    // }
}