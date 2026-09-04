import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './task.model';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  template: `
    <section class="task-form">
      <h2>{{ task() ? 'Editar tarefa' : 'Nova tarefa' }}</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <label>
          Título
          <input formControlName="title" placeholder="Digite o título" />
        </label>
        @if (titleControl.invalid && titleControl.touched) {
          <p class="error">O título é obrigatório e deve ter pelo menos 3 caracteres.</p>
        }

        <label>
          Descrição
          <textarea formControlName="description" placeholder="Detalhes da tarefa"></textarea>
        </label>

        <button type="submit" [disabled]="form.invalid">
          {{ task() ? 'Atualizar tarefa' : 'Adicionar tarefa' }}
        </button>
      </form>
    </section>
  `,
  styles: [
    `
      .task-form {
        background: #ffffff;
        border: 1px solid #dde2ea;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 10px 30px rgba(22, 28, 37, 0.05);
      }

      .task-form h2 {
        margin: 0 0 1rem;
        font-size: 1.25rem;
      }

      label {
        display: grid;
        gap: 0.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }

      input,
      textarea {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        min-height: 2.5rem;
        padding: 0.75rem 0.85rem;
        border: 1px solid #c6d0df;
        border-radius: 0.75rem;
        font: inherit;
        color: #1b2432;
        background: #f8fbff;
      }

      textarea {
        min-height: 6rem;
        resize: vertical;
      }

      .error {
        margin: -0.75rem 0 1rem;
        color: #d9534f;
        font-size: 0.9rem;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3rem;
        padding: 0 1.25rem;
        border: none;
        border-radius: 0.75rem;
        background: #4f46e5;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #9ca3af;
      }
    `
  ]
})
export class TaskFormComponent {
  readonly task = input<Task | null>(null);
  readonly saved = output<Task>();

  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    description: new FormControl('', {
      nonNullable: true
    })
  });

  get titleControl() {
    return this.form.controls.title;
  }

  constructor() {
    effect(() => {
      const task = this.task();
      this.form.setValue({
        title: task?.title ?? '',
        description: task?.description ?? ''
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.saved.emit({
      id: this.task()?.id ?? '',
      title: value.title.trim(),
      description: value.description.trim(),
      completed: this.task()?.completed ?? false
    });
    this.form.reset({ title: '', description: '' });
  }
}
