import { TaskStatus } from '../task-status.enum';

export class GetTasksDTO {
  search?: string;
  status?: TaskStatus;
}
