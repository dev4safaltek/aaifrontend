import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentNavigatorComponent } from './parent-navigator.component';

describe('ParentNavigatorComponent', () => {
  let component: ParentNavigatorComponent;
  let fixture: ComponentFixture<ParentNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentNavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
