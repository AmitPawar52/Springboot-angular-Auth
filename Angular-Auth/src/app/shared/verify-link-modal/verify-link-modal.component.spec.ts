import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyLinkModalComponent } from './verify-link-modal.component';

describe('VerifyLinkModalComponent', () => {
  let component: VerifyLinkModalComponent;
  let fixture: ComponentFixture<VerifyLinkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyLinkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
