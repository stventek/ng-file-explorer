import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationFolderComponent } from './navigation-folder.component';

describe('NavigationFolderComponent', () => {
  let component: NavigationFolderComponent;
  let fixture: ComponentFixture<NavigationFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationFolderComponent],
    });
    fixture = TestBed.createComponent(NavigationFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
