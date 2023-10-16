import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deposit {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'deposit_code'})
    depositCode: string;

    @Column()
    amount: number;

    @Column({name: 'deposit_date', type: 'timestamp'})
    depositDate: Date;

}