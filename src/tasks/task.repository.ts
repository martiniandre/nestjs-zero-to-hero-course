import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterTasks: GetTasksDTO): Promise<Task[]> {
    const { search, status } = filterTasks;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status  = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTasks(createTasks: CreateTaskDTO) {
    const { title, description } = createTasks;
    const newTask = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(newTask);
    return newTask;
  }
}
