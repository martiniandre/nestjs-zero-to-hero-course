import { Task } from './tasks.model';
import { Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get() //endpoint is the module name by default
  getTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  createTasks(@Body() createTasksDTO: CreateTaskDTO): Task {
    return this.taskService.addTask(createTasksDTO);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string) {
    console.log(id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
