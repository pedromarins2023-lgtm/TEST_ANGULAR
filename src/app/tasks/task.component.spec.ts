import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TaskListComponent } from './task-list.component';
import { TaskFormComponent } from './task-form.component';
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
