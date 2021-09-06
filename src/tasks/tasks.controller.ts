import { Body, Get, Post, Param, Delete, Query, Patch } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get() //endpoint is the module name by default
  async getTasks(@Query() filterDTO: GetTasksDTO): Promise<Task[]> {
    return this.taskService.getAllTasks(filterDTO);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async createTasks(@Body() createTasksDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskService.createTasks(createTasksDTO);
  }

  @Patch('/:id/status')
  async updateTask(@Param('id') updateTasks: UpdateTaskDTO): Promise<Task> {
    return await this.taskService.updateOne(updateTasks);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }
}
