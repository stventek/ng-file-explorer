import { TestBed } from '@angular/core/testing';

import { ItemFocusService } from './item-focus.service';

describe('ItemFocusService', () => {
  let service: ItemFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemFocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
