import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-stats',
  imports: [RouterLink],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  private readonly taskService = inject(TaskService);

  readonly created = this.taskService.created;
  readonly deleted = this.taskService.deleted;
  readonly completed = this.taskService.completed;
}