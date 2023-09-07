import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProviderMenuComponent } from './storage-provider-menu.component';

describe('StorageProviderMenuComponent', () => {
  let component: StorageProviderMenuComponent;
  let fixture: ComponentFixture<StorageProviderMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageProviderMenuComponent]
    });
    fixture = TestBed.createComponent(StorageProviderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
