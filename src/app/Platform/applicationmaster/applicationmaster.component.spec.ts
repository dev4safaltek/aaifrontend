import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMasterComponent } from './applicationmaster.component';

describe('DashboardComponent', () => {
  let component: ApplicationMasterComponent;
  let fixture: ComponentFixture<ApplicationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
