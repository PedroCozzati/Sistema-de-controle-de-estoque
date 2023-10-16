import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entity/deposit.entity';
import { DepositController } from './controller/deposit.controller';
import { DepositService } from './services/deposit.service';

@Module({
    imports: [TypeOrmModule.forFeature([Deposit])],
    controllers: [DepositController],
    providers: [DepositService]
})
export class DepositModule {}