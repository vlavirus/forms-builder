import { Component, OnInit } from '@angular/core';
import { GetStaticFieldsActions } from './core/fields/fields.action';
import { Store } from '@ngrx/store';
import * as fromFields from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'forms-builder';

  constructor(
    private storeFields: Store<fromFields.State>
  ) {}

  ngOnInit(): void {
    this.storeFields.dispatch(new GetStaticFieldsActions());
  }
}
