import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducer } from './core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffect } from './core.effect';

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducer),
    EffectsModule.forFeature([CoreEffect])
  ],
  exports: []
})

export class CoreModule {}
