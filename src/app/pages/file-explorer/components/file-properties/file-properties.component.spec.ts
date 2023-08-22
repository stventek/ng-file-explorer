import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePropertiesComponent } from './file-properties.component';

describe('FilePropertiesComponent', () => {
  let component: FilePropertiesComponent;
  let fixture: ComponentFixture<FilePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilePropertiesComponent],
    });
    fixture = TestBed.createComponent(FilePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
