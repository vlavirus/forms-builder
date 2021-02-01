import { Component, OnInit } from '@angular/core';

import { first, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FieldsService } from '../shared/services/fields.service';
import * as fromFields from '../core/index';
import { GetStaticFieldsActions } from '../core/fields/fields.action';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  constructor(
    private fieldService: FieldsService,
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    // this.storeFields.dispatch(new GetStaticFieldsActions());
  }

}
