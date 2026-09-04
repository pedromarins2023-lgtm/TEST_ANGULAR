import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<main class="app-root">
    <router-outlet></router-outlet>
  </main>`,
  styles: ['']
})
export class App {}
