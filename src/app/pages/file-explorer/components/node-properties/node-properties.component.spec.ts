import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePropertiesComponent } from './node-properties.component';

describe('NodePropertiesComponent', () => {
  let component: NodePropertiesComponent;
  let fixture: ComponentFixture<NodePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodePropertiesComponent]
    });
    fixture = TestBed.createComponent(NodePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
