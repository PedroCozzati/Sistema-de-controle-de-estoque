import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'product_name'})
    product_name: string;

    @Column()
    amount: number;

    @Column({name: 'product_date', type: 'timestamp'})
    productDate: Date;

}