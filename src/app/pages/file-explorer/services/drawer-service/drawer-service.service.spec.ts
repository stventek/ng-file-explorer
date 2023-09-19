import { TestBed } from '@angular/core/testing';

import { DrawerServiceService } from './drawer-service.service';

describe('DrawerServiceService', () => {
  let service: DrawerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
