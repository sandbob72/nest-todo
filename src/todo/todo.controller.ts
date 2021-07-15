import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodo(): Promise<Todo[]> {
    return await this.todoService.getTodoAll();
    // return this.todoService.getTodos();
  }

  @Get(':id')
  async getTodoAll(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getTodo(id);
  }

  @Post()
  async postTodo(@Body() newTodo: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = newTodo.title;
    todo.subtitle = newTodo.subtitle;
    return await this.todoService.addTodo(todo);
    //    this.todoService.addTodo(title, subtitle)
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, createTodoDto);
  }

  @Delete(':id')
  async deleteTodoByID(@Param('id') id: string): Promise<any> {
    await this.todoService.removeTodoById(id);
    return { success: true };
    // return this.todoService.removeTodoById(id);
  }
}
