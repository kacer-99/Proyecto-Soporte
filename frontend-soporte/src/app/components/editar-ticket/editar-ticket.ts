import { Component, OnInit, inject,  ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  error = '';

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
      next: (data) => {
        this.ticket = data;
        this.cdr.detectChanges(); // dibuja los datos en el formulario
      },
      error: (err) => {
        console.error('Error al obtener el ticket:', err);
        this.error = this.mensajeError(err, 'No se pudo cargar el ticket');
        this.cdr.detectChanges();
      }
    });
  }
}

actualizar(): void {
  this.error = '';
  if (!this.ticket.asunto.trim() || !this.ticket.solicitante.trim() || !this.ticket.descripcion.trim()) {
    this.error = 'Complete solicitante, asunto y descripción.';
    return;
  }
  this.ticketService.updateTicket(this.id, this.ticket).subscribe({
    next: () => {
      alert('Ticket actualizado correctamente');
      this.router.navigate(['/tickets']);
    },
    error: (err) => {
      console.error('Error al actualizar el ticket:', err);
      this.error = this.mensajeError(err, 'No se pudo actualizar el ticket');
      this.cdr.detectChanges();
    }
  });
}

private mensajeError(err: any, accion: string): string {
  if (err.status === 0) return `${accion}: no hay conexión con el servidor (¿está encendida la API?).`;
  return `${accion}: ${err.error?.mensaje ?? 'error inesperado'}.`;
}
}