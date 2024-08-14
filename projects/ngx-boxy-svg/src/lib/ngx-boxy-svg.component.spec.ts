import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBoxySvgComponent } from './ngx-boxy-svg.component';

describe('NgxBoxySvgComponent', () => {
  let component: NgxBoxySvgComponent;
  let fixture: ComponentFixture<NgxBoxySvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBoxySvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxBoxySvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
