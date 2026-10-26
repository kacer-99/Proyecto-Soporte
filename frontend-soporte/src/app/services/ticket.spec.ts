import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TicketService } from './ticket';
import { TicketNuevo } from '../models/ticket';

describe('TicketService', () => {
  let service: TicketService;
  let http: HttpTestingController;
  const url = 'http://localhost:3000/api/tickets';

  const nuevo: TicketNuevo = {
    asunto: 'Sin internet', solicitante: 'Ana', descripcion: 'No conecta a la red',
    categoria: 'Redes', prioridad: 'Alta', estado: 'Abierto'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(TicketService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getTickets hace GET a la API', () => {
    service.getTickets().subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('createTicket hace POST con los datos del ticket', () => {
    service.createTicket(nuevo).subscribe();
    const req = http.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevo);
    req.flush({});
  });

  it('updateTicket hace PUT al id indicado', () => {
    service.updateTicket(5, nuevo).subscribe();
    const req = http.expectOne(`${url}/5`);
    expect(req.request.method).toBe('PUT');
    req.flush({ mensaje: 'ok' });
  });

  it('deleteTicket hace DELETE al id indicado', () => {
    service.deleteTicket(5).subscribe();
    const req = http.expectOne(`${url}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ mensaje: 'ok' });
  });
});