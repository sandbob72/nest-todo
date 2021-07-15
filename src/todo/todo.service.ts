import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { v4 as uuidv4 } from 'uuid';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  todoArray: Todo[] = [];

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async addTodo(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async getTodoAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getTodo(id: string): Promise<Todo> {
    return await this.todoRepository.findOne({ id: id });
  }

  async updateTodo(id: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.getTodo(id);
    todo.title = createTodoDto.title || todo.title;
    todo.subtitle = createTodoDto.subtitle || todo.subtitle;
    return await this.todoRepository.save(todo);
  }

  async removeTodoById(id: string) {
    return await this.todoRepository.delete({ id: id });
    // const fonud = this.todoArray.find((item) => item.id === id);
    // if (!fonud) {
    //   throw new NotFoundException(`Todo with ${id} not found`);
    // }
    // this.todoArray = this.todoArray.filter((item) => {
    //   return item.id !== id;
    // });
    // return this.todoArray;
  }
}
