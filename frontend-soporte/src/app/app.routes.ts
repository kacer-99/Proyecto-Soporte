import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets';
import { NuevoTicketComponent } from './components/nuevo-ticket/nuevo-ticket';
import { EditarTicketComponent } from './components/editar-ticket/editar-ticket';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketsComponent },
  { path: 'nuevo', component: NuevoTicketComponent },
  { path: 'editar/:id', component: EditarTicketComponent },
  { path: '**', redirectTo: 'tickets' }
];