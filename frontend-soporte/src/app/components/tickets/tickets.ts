import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  cargando = true;
  error = '';

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando = true;
    this.error = '';
    this.ticketService.getTickets().subscribe({
      next: (datos) => {
        this.tickets = datos;
        this.cargando = false;
        this.cdr.detectChanges(); // la app es zoneless: se avisa a Angular que redibuje
      },
      error: (error) => {
        console.error(error);
        this.error = 'No fue posible obtener los tickets. Verifique que la API esté encendida.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar este ticket?')) return;

    this.ticketService.deleteTicket(id).subscribe({
      next: () => this.cargarTickets(),
      error: (error) => {
        console.error(error);
        alert('No fue posible eliminar el ticket.');
      }
    });
  }

  // "En Proceso" -> "en-proceso": se usa como clase CSS para el color del distintivo
  clase(valor: string): string {
    return valor.toLowerCase().replace(/\s+/g, '-');
  }
}