import { Task } from './tasks.model';
import { Body, Get, Post, Param, Delete, Query, Patch } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get() //endpoint is the module name by default
  getTasks(@Query() filterDTO: GetTasksDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.taskService.findTaskByQuery(filterDTO);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  createTasks(@Body() createTasksDTO: CreateTaskDTO): Task {
    return this.taskService.addTask(createTasksDTO);
  }

  @Patch('/:id/status')
  updateTask(@Param('id') updateTasks: UpdateTaskDTO): void {
    this.taskService.updateOne(updateTasks);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
