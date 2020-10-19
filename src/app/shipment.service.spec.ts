import { ShipmentService } from './shipment.service';
import { TestBed } from '@angular/core/testing';


describe('ShipmentsService', () => {
  let service: ShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
