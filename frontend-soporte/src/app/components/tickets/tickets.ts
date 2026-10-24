import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit {
  private ticketService = inject(TicketService);
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => (this.tickets = data),
      error: (err) => console.error('Error al obtener los tickets:', err)
    });
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => {
          alert('Ticket eliminado correctamente');
          this.cargarTickets();
        },
        error: (err) => console.error('Error al eliminar el ticket:', err)
      });
    }
  }
}