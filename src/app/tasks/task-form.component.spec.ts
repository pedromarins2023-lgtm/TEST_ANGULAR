import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EventEmitter } from '@angular/core';
import { vi } from 'vitest';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
 it('deve mostrar erro e impedir envio quando title tiver menos de 3 caracteres', async () => {
 const { fixture } = await render(TaskFormComponent);
 const emitSpy = vi.spyOn(fixture.componentInstance.saved, 'emit');

 const titleInput = screen.getByPlaceholderText('Digite o título');
 const button = screen.getByRole('button', {
 name: 'Adicionar tarefa'
 });

 expect(button).toBeDisabled();

 await userEvent.type(titleInput, 'ab');
 await userEvent.tab();

 expect(
 screen.getByText('O título é obrigatório e deve ter pelo menos 3 caracteres.')
 ).toBeTruthy();

 expect(button).toBeDisabled();
 expect(emitSpy).not.toHaveBeenCalled();
 });

 it('deve emitir saved quando o formulário for válido', async () => {
 const { fixture } = await render(TaskFormComponent);
 const emitSpy = vi.spyOn(fixture.componentInstance.saved, 'emit');

 const titleInput = screen.getByPlaceholderText('Digite o título');
 const button = screen.getByRole('button', {
 name: 'Adicionar tarefa'
 });

 await userEvent.type(titleInput, 'Tarefa válida');

 expect(button).toBeEnabled();

 await userEvent.click(button);

 expect(emitSpy).toHaveBeenCalledWith(
 expect.objectContaining({
 title: 'Tarefa válida',
 description: ''
 })
 );
 });
});

