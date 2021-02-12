import { FieldsService } from './fields.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FieldService', () => {
  let injector: TestBed;
  let service: FieldsService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FieldsService]
    });
    injector = getTestBed();
    service = injector.inject(FieldsService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('test get of General Style', () => {
    service
      .getGeneralStyle()
      .subscribe((response) => expect(response).toBe([]));

    const req = httpMock.expectOne('http://localhost:3000/general-style');
    expect(req.request.method).toBe('GET');
  });

  it('test get of Static Data', () => {
    service
      .getStaticData()
      .subscribe((response) => expect(response).toBe([]));

    const req = httpMock.expectOne('http://localhost:3000/draggable-fields');
    expect(req.request.method).toBe('GET');
  });

});
