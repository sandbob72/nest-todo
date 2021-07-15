import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
