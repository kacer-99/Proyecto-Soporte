import { Routes } from '@angular/router';
import { Tickets } from './components/tickets/tickets';
import { NuevoTicket} from './components/nuevo-ticket/nuevo-ticket';
import { EditarTicket } from './components/editar-ticket/editar-ticket';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: Tickets },
  { path: 'nuevo', component: NuevoTicket },
  { path: 'editar/:id', component: EditarTicket },
  { path: '**', redirectTo: 'tickets' }
];