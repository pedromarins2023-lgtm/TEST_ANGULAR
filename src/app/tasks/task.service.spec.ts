import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
describe('TaskService', () => {
  let service: TaskService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
  });
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
  it('should add a task', () => {
    const initialCount = service.tasks().length;
    service.addTask({ title: 'Nova tarefa', description: 'Descrição' });
    expect(service.tasks().length).toBe(initialCount + 1);
    expect(service.tasks().some((task) => task.title === 'Nova tarefa')).toBe(true);
  });
  it('should toggle completion status', () => {
    const task = service.tasks()[0];
    service.toggleCompletion(task.id);
    expect(service.getTask(task.id)?.completed).toBe(!task.completed);
  });
});
