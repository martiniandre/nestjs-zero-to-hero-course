import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDTO {
  id: string;
  status: TaskStatus;
}
