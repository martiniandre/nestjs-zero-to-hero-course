import { TaskStatus } from '../tasks.model';

export class UpdateTaskDTO {
  id: string;
  status: TaskStatus;
}
