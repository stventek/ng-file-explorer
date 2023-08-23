import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePropertiesModalComponent } from './file-properties-modal.component';

describe('FilePropertiesModalComponent', () => {
  let component: FilePropertiesModalComponent;
  let fixture: ComponentFixture<FilePropertiesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilePropertiesModalComponent]
    });
    fixture = TestBed.createComponent(FilePropertiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
