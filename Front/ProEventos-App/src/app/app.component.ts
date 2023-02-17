import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    .card {
      margin-bottom: 0.7rem;
      padding: 2px;
    }
  `]
})
export class AppComponent {
  title = 'ProEventos-App';
}
