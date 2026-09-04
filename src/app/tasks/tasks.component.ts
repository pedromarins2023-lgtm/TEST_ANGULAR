import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskFormComponent } from './task-form.component';
import { TaskListComponent } from './task-list.component';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'tasks-page',
  imports: [RouterLink, TaskFormComponent, TaskListComponent],
  template: `
    <section class="tasks-page">
      <header class="tasks-header">
        <div>
          <p class="eyebrow">Aplicativo de tarefas</p>
          <h1>TaskFlow</h1>
          <p>Adicione, edite e remova tarefas rapidamente.</p>
        </div>
        <div class="status-card">
          <strong>{{ remaining() }}</strong>
          <span>tarefas pendentes</span>
        </div>
        @if (tasks().length > 0) {
          <a routerLink="/stats" class="stats-btn">Ver Estatísticas</a>
        }
      </header>

      <div class="tasks-grid">
        <task-form [task]="selectedTask()" (saved)="saveTask($event)"></task-form>
        <task-list
          [tasks]="tasks()"
          (edit)="selectTask($event)"
          (remove)="removeTask($event)"
          (toggle)="toggleTask($event)"
        ></task-list>
      </div>
    </section>
  `,
  styles: [
    `
      .tasks-page {
        max-width: 1080px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }

      .tasks-header {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        align-items: flex-start;
        margin-bottom: 2rem;
      }

      .eyebrow {
        margin: 0 0 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #4f46e5;
        font-size: 0.85rem;
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 2.5vw, 3rem);
      }

      .status-card {
        min-width: 11rem;
        padding: 1rem 1.25rem;
        border-radius: 1rem;
        background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
        border: 1px solid #dbe4ee;
        text-align: center;
      }

      .status-card strong {
        display: block;
        font-size: 2rem;
        margin-bottom: 0.25rem;
      }

      .stats-btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #4f46e5;
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 500;
        align-self: flex-start;
      }

      .stats-btn:hover {
        background: #4338ca;
      }

      .tasks-grid {
        display: grid;
        gap: 1.5rem;
      }

      @media (min-width: 900px) {
        .tasks-grid {
          grid-template-columns: minmax(300px, 1fr) minmax(360px, 1.3fr);
        }
      }
    `
  ]
})
export class TasksComponent {
  private readonly taskService = inject(TaskService);

  readonly tasks = this.taskService.tasks;
  readonly remaining = this.taskService.remaining;
  readonly selectedTask = signal<Task | null>(null);

  selectTask(task: Task): void {
    this.selectedTask.set(task);
  }

  saveTask(task: Task): void {
    if (task.id) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.addTask(task);
    }
    this.selectedTask.set(null);
  }

  removeTask(id: string): void {
    this.taskService.removeTask(id);
    if (this.selectedTask()?.id === id) {
      this.selectedTask.set(null);
    }
  }

  toggleTask(id: string): void {
    this.taskService.toggleCompletion(id);
  }
}
