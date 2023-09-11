import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailControlsComponent } from './detail-controls.component';

describe('DetailControlsComponent', () => {
  let component: DetailControlsComponent;
  let fixture: ComponentFixture<DetailControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailControlsComponent]
    });
    fixture = TestBed.createComponent(DetailControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
