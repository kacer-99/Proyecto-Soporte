import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  tickets: Ticket[] = [];
  error = '';

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.error = '';
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener los tickets:', err);
        this.error = 'No se pudieron cargar los tickets. Verifique que la API esté encendida.';
        this.cdr.detectChanges();
      }
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
        error: (err) => {
          console.error('Error al eliminar el ticket:', err);
          alert('No se pudo eliminar el ticket. Intente nuevamente.');
        }
      });
    }
  }

  clase(valor: string): string {
    return valor.toLowerCase().replace(/\s+/g, '-');
  }
}