import { Orders } from "src/orders/entity/orders.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'product_name'})
    product_name: string;

    @Column()
    image: string;

    @Column()
    amount: number

    // @ManyToOne(() => Orders, orders => orders.product,{ eager: true },)
    
    @ManyToMany(() => Orders, {eager:true})
    @JoinTable()
    orders: Orders;

    @Column({name: 'product_date', type: 'timestamp'})
    productDate: Date;

}