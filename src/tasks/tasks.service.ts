import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTasks: GetTasksDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTasks);
  }

  async getTaskById(taskId: string): Promise<Task> {
    const getOne = await this.taskRepository.findOne(taskId);
    if (!getOne) {
      throw new NotFoundException(`Task with the ID ${taskId} not found`);
    }
    return getOne;
  }

  createTasks(createTasks: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTasks(createTasks);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }

  async updateOne(updateTask: UpdateTaskDTO): Promise<Task> {
    const { id, status } = updateTask;
    const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with the ID ${id} not found`);
    }
    task.status = status;
    this.taskRepository.save(task);
    return task;
  }
  /* private tasks: Task[] = [];


  

  updateOne(updateTask: UpdateTaskDTO): Task {
    const { id, status } = updateTask;
    const task = this.findOne(id);
    task.status = status;
    return task;
  }



  deleteTask(taskId: string): void {
    const getTask = this.tasks.filter((tasks) => tasks.id !== taskId);
    if (!getTask) {
      throw new NotFoundException(`Task with the ID ${taskId} not found`);
    }
    this.tasks = getTask;
  } */
}
