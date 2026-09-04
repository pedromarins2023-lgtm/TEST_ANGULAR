import { TaskService } from './task.service';
describe('TaskService - remaining', () => {
  let service: TaskService;
  beforeEach(() => {
    service = new TaskService();
  });
  it('deve contar a tarefa inicial como pendente', () => {
    expect(service.remaining()).toBe(1);
  });
  it('deve diminuir a contagem de pendentes ao concluir uma tarefa', () => {
    const task = service.tasks()[0];
    service.toggleCompletion(task.id);
    expect(service.remaining()).toBe(0);
  });
  it('deve aumentar a contagem de pendentes ao adicionar uma nova tarefa', () => {
    service.addTask({ title: 'Outra tarefa', description: 'Descrição' });
    expect(service.remaining()).toBe(2);
  });
  it('deve retornar zero quando não há nenhuma tarefa cadastrada', () => {
    const task = service.tasks()[0];
    service.removeTask(task.id);
    expect(service.remaining()).toBe(0);
  });
});
