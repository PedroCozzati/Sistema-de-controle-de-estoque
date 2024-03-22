import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductDto } from '../dto/product.dto';
import { InventoryDto } from 'src/inventory/dto/inventory.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }


    async solicitaProduto(product: ProductDto, inventory: InventoryDto) {
        try {
            await this.productRepository.save(
                {
                    ...product,
                    productDate: new Date().toISOString()
                }
            )

        }
        catch (exception) {
            throw exception
        }


    }


    async getAllProdutos() {
        try {
            var product = await this.productRepository.find({
                relations: {
                    supplier:true,
                    // inventory: true,
                },
            },
            )
            if (product)
                return product
           
        }
        catch (exception) {
            throw exception
        }

    }

    async getProduto(id:number) {
        try {
            var product = await this.productRepository.findOne({
                where: { id },
                relations: ['supplier', 'inventory'], 
            });

            if (product) {
                return product;
            }
        }
        catch (exception) {
            throw exception
        }

    }


    async getQuantidadeProduto() {
        try {
            var list=[]
            var product = await this.productRepository.find({})
            product.forEach(element => {    
                list.push(element.amount)
                
            });
            const sum = list.reduce((partialSum, a) => partialSum + a, 0);
            return  sum
        }
        catch (exception) {
            throw exception
        }

    }

    async getQuantidadeProdutoPorMes() {
        try {
            var list=[]
            var obj
            var result=[]
            var keyw 
            var product = await this.productRepository.find({})
            product.forEach(element => {    
                var month = element.productDate.getMonth()+1
                list.push(month)
                
            });

            // list.forEach(element => {
            //     keyw = "mes_"+element
            //     obj={
            //         mes: element
            //         value:
            //     }
            // });
            // result.push(obj)
            // const sum = list.reduce((partialSum, a) => partialSum + a, 0);
            return  list
        }
        catch (exception) {
            throw exception
        }

    }


    async atualizaProduto(product: Product) {
        try {

            await this.productRepository.update(product.id,product)

            return;
        }
        catch (exception) {
            throw exception
        }

    }


    async atualizaQuantidade(produto:any) {
        try {

            await this.productRepository.update(produto.id,{amount:produto.amount+produto.new_amount})

            return;
        }
        catch (exception) {
            throw exception
        }

    }

    async subtraiQuantidade(produto:any) {
        try {

            var find = await this.productRepository.findOneBy({id:produto.id})

            await this.productRepository.update(produto.id,{amount:find.amount-produto.new_amount})

            return;
        }
        catch (exception) {
            throw exception
        }

    }

    async deletaProduto(id: number) {
      try {
        await this.productRepository.delete({"id": id })
  
        return;
      } catch (exception) {
        throw exception
      }
    }
  



}