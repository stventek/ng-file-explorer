import { TestBed } from '@angular/core/testing';

import { ItemContextMenuService } from './item-context-menu.service';

describe('ItemContextMenuService', () => {
  let service: ItemContextMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemContextMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
