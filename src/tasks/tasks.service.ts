import { Task, TaskStatus } from './tasks.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
  findOne(taskId: string): Task {
    const getOne = this.tasks.find((task) => task.id === taskId);
    if (!getOne) {
      throw new NotFoundException(`Task with the ID ${taskId} not found`);
    }
    return getOne;
  }

  findTaskByQuery(filterTasks: GetTasksDTO): Task[] {
    const { search, status } = filterTasks;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => {
        task.status === status;
      });
    }

    if (search) {
      tasks = tasks.filter((task) => {
        task.title.includes(search) || task.description.includes(search)
          ? true
          : false;
      });
    }

    return tasks;
  }

  updateOne(updateTask: UpdateTaskDTO): Task {
    const { id, status } = updateTask;
    const task = this.findOne(id);
    task.status = status;
    return task;
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
    if (!getTask) {
      throw new NotFoundException(`Task with the ID ${taskId} not found`);
    }
    this.tasks = getTask;
  }
}
