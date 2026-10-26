export interface Ticket {
  id: number;
  asunto: string;
  solicitante: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estado: string;
  fechaRegistro: string;
}

// Datos que envía el formulario: el id y la fecha los genera la base de datos
export type TicketNuevo = Omit<Ticket, 'id' | 'fechaRegistro'>;