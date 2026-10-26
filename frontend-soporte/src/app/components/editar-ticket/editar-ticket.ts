import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-editar-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicketComponent implements OnInit {
  id = 0;
  cargando = true;
  cargaFallida = false; // si es true no se muestra el formulario
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
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    prioridad: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    })
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.error = 'Identificador de ticket inválido.';
      this.cargaFallida = true;
      this.cargando = false;
      return;
    }

    this.ticketService.getTicketById(this.id).subscribe({
      next: (ticket) => {
        // patchValue rellena el formulario con los datos que vienen de la base de datos
        this.formulario.patchValue({
          solicitante: ticket.solicitante,
          asunto: ticket.asunto,
          categoria: ticket.categoria,
          prioridad: ticket.prioridad,
          estado: ticket.estado,
          descripcion: ticket.descripcion
        });
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.error = 'No fue posible cargar el ticket.';
        this.cargaFallida = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardar(): void {
    this.error = '';
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.ticketService.updateTicket(this.id, this.formulario.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (error) => {
        console.error(error);
        this.error = 'No fue posible actualizar el ticket. Verifique que la API esté encendida.';
        this.cdr.detectChanges();
      }
    });
  }
}