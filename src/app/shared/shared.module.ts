import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent
  ]
})
export class SharedModule { }
