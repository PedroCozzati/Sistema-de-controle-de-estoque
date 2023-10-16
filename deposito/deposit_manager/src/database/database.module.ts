import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
imports: [
  TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Cozzati#27',
  database: 'deposit_database',
  autoLoadEntities: true,
  synchronize: true}),
  ]})
export class DatabaseModule {}
