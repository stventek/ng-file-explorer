import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderPropertiesModalComponent } from './folder-properties-modal.component';

describe('FolderPropertiesModalComponent', () => {
  let component: FolderPropertiesModalComponent;
  let fixture: ComponentFixture<FolderPropertiesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderPropertiesModalComponent]
    });
    fixture = TestBed.createComponent(FolderPropertiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
