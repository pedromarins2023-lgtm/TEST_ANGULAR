import { Component, input, output } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'task-item',
  template: `
    <article class="task-item" [class.completed]="task().completed">
      <button type="button" class="checkbox" (click)="toggle.emit(task().id)">
        <span>{{ task().completed ? '✓' : '' }}</span>
      </button>
      <div class="content">
        <strong>{{ task().title }}</strong>
        <p>{{ task().description }}</p>
      </div>
      <div class="actions">
        <button type="button" (click)="edit.emit(task())">Editar</button>
        <button type="button" class="danger" (click)="remove.emit(task().id)">Remover</button>
      </div>
    </article>
  `,
  styles: [
    `
      .task-item {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border: 1px solid #dbe4ee;
        border-radius: 1rem;
        background: #fff;
      }

      .task-item.completed {
        opacity: 0.78;
      }

      .checkbox {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 2px solid #4f46e5;
        background: #eef2ff;
        color: #4f46e5;
        font-weight: 700;
        display: grid;
        place-items: center;
        cursor: pointer;
      }

      .content strong {
        display: block;
        margin-bottom: 0.25rem;
      }

      .content p {
        margin: 0;
        color: #64748b;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .actions button {
        border: none;
        border-radius: 0.75rem;
        padding: 0.65rem 0.95rem;
        font-weight: 600;
        cursor: pointer;
        background: #eef2ff;
        color: #334155;
      }

      .actions .danger {
        background: #fee2e2;
        color: #b91c1c;
      }
    `
  ]
})
export class TaskItemComponent {
  readonly task = input.required<Task>();
  readonly edit = output<Task>();
  readonly remove = output<string>();
  readonly toggle = output<string>();
}
