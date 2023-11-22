import { Inventory } from "src/inventory/entity/inventory.entity";
import { Orders } from "src/orders/entity/orders.entity";
import { Supplier } from "src/suppliers/entity/supplier.entity";
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
    
    @ManyToMany(() => Orders, {eager:false})
    @JoinTable()
    orders: Orders;

    @ManyToMany(() => Inventory, {
        eager:false,
        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
    })
    @JoinTable()
    inventory: Inventory;

    @ManyToMany(() => Supplier, {eager:true})
    @JoinTable()
    supplier: Supplier;

    @Column({name: 'product_date', type: 'timestamp'})
    productDate: Date;

}