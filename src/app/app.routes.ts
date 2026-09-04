import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { StatsComponent } from './stats/stats.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TasksComponent },
  { path: 'stats', component: StatsComponent }
];
