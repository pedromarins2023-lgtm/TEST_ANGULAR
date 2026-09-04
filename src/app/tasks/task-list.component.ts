import { Component, input, output } from '@angular/core';
import { Task } from './task.model';
import { TaskItemComponent } from './task-item.component';

@Component({
  selector: 'task-list',
  imports: [TaskItemComponent],
  template: `
    <section class="task-list">
      <h2>Lista de tarefas</h2>
      @if (tasks().length === 0) {
        <p class="subtitle">Nenhuma tarefa cadastrada. Adicione uma tarefa ao lado.</p>
      } @else {
        <ul>
          @for (task of tasks(); track task.id) {
            <li>
              <task-item
                [task]="task"
                (edit)="edit.emit($event)"
                (remove)="remove.emit($event)"
                (toggle)="toggle.emit($event)"
              ></task-item>
            </li>
          }
        </ul>
      }
    </section>
  `,
  styles: [
    `
      .task-list {
        display: grid;
        gap: 1rem;
      }

      .task-list h2 {
        margin: 0;
        font-size: 1.25rem;
      }

      .subtitle {
        margin: 0;
        color: #64748b;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }

      li {
        margin: 0;
      }
    `
  ]
})
export class TaskListComponent {
  readonly tasks = input<Task[]>([]);
  readonly edit = output<Task>();
  readonly remove = output<string>();
  readonly toggle = output<string>();
}
