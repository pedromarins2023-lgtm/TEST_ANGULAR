import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
describe('App Routes', () => {
let router: Router;
beforeEach(async () => {
TestBed.configureTestingModule({
providers: [provideRouter(routes)]
});
router = TestBed.inject(Router);
});
it('deve ter as rotas configuradas corretamente', () => {
const routeConfig = routes;
expect(routeConfig).toBeDefined();
expect(routeConfig.length).toBeGreaterThan(0);
const tasksRoute = routeConfig.find(route => route.path === 'tasks');
expect(tasksRoute).toBeDefined();
const statsRoute = routeConfig.find(route => route.path === 'stats');
expect(statsRoute).toBeDefined();
const redirectRoute = routeConfig.find(route => route.path === '');
expect(redirectRoute?.redirectTo).toBe('tasks');
});
it('deve redirecionar / para /tasks', async () => {
await router.navigateByUrl('/');
expect(router.url).toBe('/tasks');
});
});