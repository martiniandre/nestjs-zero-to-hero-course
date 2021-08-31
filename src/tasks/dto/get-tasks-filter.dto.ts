import { TaskStatus } from '../tasks.model';

export class GetTasksDTO {
  search?: string;
  status?: TaskStatus;
}
