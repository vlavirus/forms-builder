import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromFields from '../core';
import { GetGeneralStyleActions, GetStaticFieldsActions } from 'app/core/fields/fields.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    this.storeFields.dispatch(new GetStaticFieldsActions());
    this.storeFields.dispatch(new GetGeneralStyleActions());
  }

}
