import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameNodeModalComponent } from './rename-node-modal.component';

describe('RenameNodeModalComponent', () => {
  let component: RenameNodeModalComponent;
  let fixture: ComponentFixture<RenameNodeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenameNodeModalComponent]
    });
    fixture = TestBed.createComponent(RenameNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
