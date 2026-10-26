import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  error = '';

  ticket: Ticket = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Soporte General',
    prioridad: 'Media',
    estado: 'Abierto'
  };

  guardar(): void {
    this.error = '';
    if (!this.ticket.asunto.trim() || !this.ticket.solicitante.trim() || !this.ticket.descripcion.trim()) {
      this.error = 'Complete solicitante, asunto y descripción.';
      return;
    }

    this.ticketService.createTicket(this.ticket).subscribe({
      next: () => {
        alert('Ticket creado con éxito');
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        console.error('Error al crear el ticket:', err);
        this.error = err.status === 0
          ? 'No hay conexión con el servidor (¿está encendida la API?).'
          : (err.error?.mensaje ?? 'No se pudo crear el ticket.');
        this.cdr.detectChanges();
      }
    });
  }
}