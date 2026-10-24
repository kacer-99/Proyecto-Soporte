import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera';
import { MenuComponent } from './components/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}