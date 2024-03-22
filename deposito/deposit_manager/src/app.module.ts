import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DepositModule } from './deposit/deposit.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { OrdersModule } from './orders/orders.module';
import { SupplierModule } from './suppliers/supplier.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [DatabaseModule, DepositModule, ProductModule, UserModule, ClientModule, OrdersModule, SupplierModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
