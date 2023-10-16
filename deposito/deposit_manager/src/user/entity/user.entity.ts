import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'user_name'})
    user_name: string;

    @Column({name: 'email',unique:true})
    email: string;

    @Column()
    password:string;

    @Column()
    is_adm: boolean;

    @Column()
    is_logged: boolean;

    @Column({name: 'register_date', type: 'timestamp'})
    register_date: Date;

}