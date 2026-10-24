import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-nuevo-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicketComponent {
  private ticketService = inject(TicketService);
  private router = inject(Router);

  ticket: Ticket = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Soporte General',
    prioridad: 'Media',
    estado: 'Abierto'
  };

  guardar(): void {
    if (!this.ticket.asunto || !this.ticket.solicitante) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    this.ticketService.createTicket(this.ticket).subscribe({
      next: () => {
        alert('Ticket creado con éxito');
        this.router.navigate(['/tickets']);
      },
      error: (err) => console.error('Error al crear el ticket:', err)
    });
  }
}