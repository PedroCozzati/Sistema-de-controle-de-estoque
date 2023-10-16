import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }


    async insereProduto(product: ProductDto) {
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
            var product = await this.productRepository.find({})
            return  product
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


    async atualizaProduto(product: Product) {
        try {

            await this.productRepository.update(product.id,product)

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