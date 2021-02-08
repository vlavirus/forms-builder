import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FieldsEffect } from './fields.effect';
import { reducer } from './fields.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('fields', reducer),
    EffectsModule.forFeature([FieldsEffect])
  ],
  exports: []
})

export class FieldsModule { }
