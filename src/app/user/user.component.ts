import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetStaticFieldsActions } from 'app/core/fields/fields.action';
import * as fromFields from '../core';

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
  }

}
