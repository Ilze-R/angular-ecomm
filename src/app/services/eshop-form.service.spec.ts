import { TestBed } from '@angular/core/testing';

import { EshopFormService } from './eshop-form.service';

describe('EshopFormService', () => {
  let service: EshopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EshopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
