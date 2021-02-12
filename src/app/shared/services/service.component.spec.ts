import { FieldsService } from './fields.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('FieldService', () => {
  let fieldsService: FieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FieldsService,
      ]
    });
    fieldsService = TestBed.get(FieldsService);
  });



});
