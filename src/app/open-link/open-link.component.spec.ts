import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinkComponent } from './open-link.component';

describe('OpenLinkComponent', () => {
  let component: OpenLinkComponent;
  let fixture: ComponentFixture<OpenLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
