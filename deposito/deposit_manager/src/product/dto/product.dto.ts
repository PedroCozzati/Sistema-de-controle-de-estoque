import { Inventory } from "src/inventory/entity/inventory.entity"
import { Supplier } from "src/suppliers/entity/supplier.entity"

export class ProductDto {

    image: string

    amount: number

    product_name: string

    supplier:Supplier
    
    inventory:Inventory



}