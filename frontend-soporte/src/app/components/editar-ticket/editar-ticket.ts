import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-editar-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicketComponent implements OnInit {
  private ticketService = inject(TicketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id!: number;
  ticket: Ticket = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: '',
    prioridad: '',
    estado: ''
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.ticketService.getTicketById(this.id).subscribe({
        next: (data) => (this.ticket = data),
        error: (err) => console.error('Error al obtener el ticket:', err)
      });
    }
  }

  actualizar(): void {
    this.ticketService.updateTicket(this.id, this.ticket).subscribe({
      next: () => {
        alert('Ticket actualizado correctamente');
        this.router.navigate(['/tickets']);
      },
      error: (err) => console.error('Error al actualizar el ticket:', err)
    });
  }
}