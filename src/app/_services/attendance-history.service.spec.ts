import { TestBed } from '@angular/core/testing';

import { AttendanceHistoryService } from './attendance-history.service';

describe('AttendanceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttendanceHistoryService = TestBed.get(AttendanceHistoryService);
    expect(service).toBeTruthy();
  });
});
