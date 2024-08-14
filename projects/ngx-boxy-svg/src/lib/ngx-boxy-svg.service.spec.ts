import { TestBed } from '@angular/core/testing';

import { NgxBoxySvgService } from './ngx-boxy-svg.service';

describe('NgxBoxySvgService', () => {
  let service: NgxBoxySvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBoxySvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
