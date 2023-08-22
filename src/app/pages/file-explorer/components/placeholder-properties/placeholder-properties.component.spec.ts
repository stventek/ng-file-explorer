import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPropertiesComponent } from './placeholder-properties.component';

describe('PlaceholderPropertiesComponent', () => {
  let component: PlaceholderPropertiesComponent;
  let fixture: ComponentFixture<PlaceholderPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderPropertiesComponent],
    });
    fixture = TestBed.createComponent(PlaceholderPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
