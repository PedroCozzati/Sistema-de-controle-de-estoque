import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


    async cadastraUsuario(user: UserDto) {
        var adm = false;
        if (user.email == 'edivan@sce.com.br') {
            adm = true
        }
        try {
            await this.userRepository.save(
                {
                    ...user,
                    is_logged: false,
                    is_adm: adm,
                    register_date: new Date().toISOString()
                }
            )

        }
        catch (exception) {
            throw exception
        }


    }

    async deletaUsuario(id: number) {
        try {
            await this.userRepository.delete({ "id": id })
            return;
        }
        catch (exception) {
            throw exception
        }
    }


    async getUserByEmailPwd(nome: string, senha: string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome, password: senha })
            var adm = false;
            if (user.email == 'edivan@sce.com.br') {
                adm = true
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

    async getInactiveUsers() {
        try {
            var user = await this.userRepository.findBy({active:false})

            // var activeUserList = []

            // user.forEach(usuario => {
            //     if(usuario.is_active == true){
            //         activeUserList.push(usuario)
            //     }
            // });

            return user
            
         }
        catch (exception) { 
            throw exception
        }
    }

    async getActiveUsers() {
        try {

            var user = await this.userRepository.findBy({active:true, is_adm:false})

            // var activeUserList = []

            // user.forEach(usuario => {
            //     if(usuario.is_active == true){
            //         activeUserList.push(usuario)
            //     }
            // });

            return user
            
         }
        catch (exception) { 
            throw exception
        }
    }

    async login(nome: string, senha: string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome, password: senha })
            var adm = false;

            if(user.active==true){
        
                if (user) {
    
                    await this.userRepository.save(
                        {
                            ...user,
                            is_logged: true,
                            is_active:user.active,
                            is_adm: user.is_adm,
                            register_date: user.register_date
                        })
    
                    return true
                }
                
                else
                    throw Error("Usuário não encontrado")
            }

            else
                throw Error("Usuário não está ativo no sistema, entre em contato com o ADM")

        }
        catch (exception) {
            throw exception
        }

    }

    async logOff(nome: string, senha: string) {
        try {
            var user = await this.userRepository.findOneBy({ email: nome, password: senha })
            var adm = false

            if (user.email == 'edivan@sce.com.br') {
                adm = true
            }

            if (user)

                await this.userRepository.save(
                    {
                        ...user,
                        is_logged: false,
                        is_adm: user.is_adm,
                        register_date: user.register_date
                    })

        }
        catch (exception) {
            throw exception
        }

    }




    async activate(user_email: string) {
        try {
            var user = await this.userRepository.findOneBy({ email:user_email})
            var adm = false
            var is_active = true
            if(user){
                await this.userRepository.save(
                    {
                        ...user,
                        is_adm: user.is_adm,
                        is_logged: user.is_logged,
                        active:is_active,
                        register_date: user.register_date
                    })
            }

        }
        catch (exception) {
            throw exception
        }

    }


    async inactivateUser(user_email: string) {
        try {
            var user = await this.userRepository.findOneBy({email:user_email})

            if (user) {
                await this.userRepository.save(
                    {
                        ...user,
                        is_logged: user.is_logged,
                        is_adm: user.is_adm,
                        active: false,
                        register_date: user.register_date
                    })
            }
        }
        catch (exception) {
            throw exception
        }
    }


}