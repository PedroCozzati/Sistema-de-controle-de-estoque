import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


    async cadastraUsuario(user: UserDto) {
        var adm =false;
        if(user.email=='edivan@sce.com.br'){
            adm=true
        }
        try {
            await this.userRepository.save(
                {
                    ...user,
                    is_logged:false,
                    is_adm:adm,
                    register_date: new Date().toISOString()
                }
            )

        }
        catch (exception) {
            throw exception
        }


    }

    async deletaUsuario(id:number) {
        try {
            await this.userRepository.delete({"id":id})
            return;
        }
        catch (exception) {
            throw exception
        }
    }


    async getUserByEmailPwd(nome:string,senha:string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome,password:senha })
            var adm =false;
            if(user.email=='edivan@sce.com.br'){
                adm=true
            }

            if (user)
                return user
        
        }
        catch (exception) {
            throw exception
        }

    }

    async getAllUsuarios() {
        try {
            var user = await this.userRepository.find({})
            return user
        }
        catch (exception) {
            throw exception
        }

    }

    async login(nome:string,senha:string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome,password:senha })
            var adm =false;
            if(user.email=='edivan@sce.com.br'){
                adm=true
            }

            if (user){

                
                await this.userRepository.save(
                    {
                        ...user,
                        is_logged:true,
                        is_adm:adm,
                        register_date: new Date().toISOString()
                    })

                return true
            }

            else
                return false
            
        
        }
        catch (exception) {
            throw exception
        }

    }

  

    async logOff(nome:string,senha:string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome,password:senha })
            var adm = false

            if(user.email=='edivan@sce.com.br'){
                adm=true
            }

            if (user)
            
                await this.userRepository.save(
                    {
                        ...user,
                        is_logged:false,
                        is_adm:adm,
                        register_date: new Date().toISOString()
                    })
        
        }
        catch (exception) {
            throw exception
        }

    }

    



    // async getAllProdutos() {
    //     try {
    //         var product = await this.productRepository.find({})
    //         return  product
    //     }
    //     catch (exception) {
    //         throw exception
    //     }

    // }

    // async getQuantidadeProduto() {
    //     try {
    //         var list=[]
    //         var product = await this.productRepository.find({})
    //         product.forEach(element => {    
    //             list.push(element.amount)
                
    //         });
    //         const sum = list.reduce((partialSum, a) => partialSum + a, 0);
    //         return  sum
    //     }
    //     catch (exception) {
    //         throw exception
    //     }

    // }


    // async atualizaProduto(product: User) {
    //     try {

    //         await this.productRepository.update(product.id,product)

    //         return;
    //     }
    //     catch (exception) {
    //         throw exception
    //     }

    // }

    // async deletaProduto(id: number) {
    //   try {
    //     await this.productRepository.delete({"id": id })
  
    //     return;
    //   } catch (exception) {
    //     throw exception
    //   }
    // }
  



}