export interface Ticket {
  id?: number;
  asunto: string;
  solicitante: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estado: string;
  fechaCreacion?: string;
}