import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-nuevo-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicketComponent {
  error = '';

  formulario = new FormGroup({
    solicitante: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    asunto: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(150)]
    }),
    categoria: new FormControl('Soporte General', { nonNullable: true, validators: [Validators.required] }),
    prioridad: new FormControl('Media', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('Abierto', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    })
  });

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  guardar(): void {
    this.error = '';
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.ticketService.createTicket(this.formulario.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (error) => {
        console.error(error);
        this.error = 'No fue posible registrar el ticket. Verifique que la API esté encendida.';
        this.cdr.detectChanges();
      }
    });
  }
}