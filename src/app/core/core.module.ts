import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer } from './core.reducer';

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducer)
  ],
  exports: []
})

export class CoreModule {}
