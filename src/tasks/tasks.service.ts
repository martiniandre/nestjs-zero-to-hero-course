import { Task, TaskStatus } from './tasks.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
  findOne(taskId: string): Task[] | null {
    const getOne = this.tasks.filter((task) => task.id === taskId);
    return getOne || null;
  }

  addTask(createTasks: CreateTaskDTO): Task {
    const { title, description } = createTasks;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId: string): void {
    const getTask = this.tasks.filter((tasks) => tasks.id !== taskId);
    this.tasks = getTask;
  }
}
