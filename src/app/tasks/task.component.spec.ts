import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TaskListComponent } from './task-list.component';
import { TaskFormComponent } from './task-form.component';
import { TasksComponent } from './tasks.component';
import { TaskService } from './task.service';
import { EventEmitter, computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';


describe('Task Components', () => {
    it('deve exibir tarefas na tela', async () => {
        const tasks = [
            { id: '1', title: 'Nova tarefa', description: 'Descrição da tarefa', completed: false }
        ];
        await render(TaskListComponent, {
            inputs: { tasks }
        });
        expect(screen.queryByText('Nova tarefa')).not.toBeNull();
    });

    it('deve adicionar uma tarefa ao clicar no botão', async () => {
        const { fixture } = await render(TaskFormComponent);
        const emitSpy = vi.spyOn(fixture.componentInstance.saved, 'emit');

        const input = screen.getByPlaceholderText('Digite o título');
        const button = screen.getByText('Adicionar tarefa');

        await userEvent.type(input, 'Estudar testes');
        await userEvent.click(button);

        expect(emitSpy).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Estudar testes' })
        );
    });
});

describe('TasksComponent com mock de TaskService', () => {
const mockTasks = [
{
id: '1',
title: 'Mock tarefa',
description: 'Descrição mock',
completed: false
}
];
const tasksSignal = signal(mockTasks);
const mockService = {
tasks: tasksSignal.asReadonly(),
remaining: computed(() => tasksSignal().filter(task => !task.completed).length),
addTask: vi.fn(),
updateTask: vi.fn(),
removeTask: vi.fn(),
toggleCompletion: vi.fn()
} as unknown as TaskService;
let component: TasksComponent;
beforeEach(() => {
TestBed.configureTestingModule({
providers: [TasksComponent, { provide: TaskService, useValue: mockService }]
});
component = TestBed.inject(TasksComponent);
vi.clearAllMocks();
});
it('deve chamar removeTask no serviço quando removeTask for executado', () => {
component.removeTask('1');
expect(mockService.removeTask).toHaveBeenCalledWith('1');
});
it('deve chamar toggleCompletion no serviço quando toggleTask for executado', () => {
component.toggleTask('1');
expect(mockService.toggleCompletion).toHaveBeenCalledWith('1');
});

});
