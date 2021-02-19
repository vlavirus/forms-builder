import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { StyleItemModel } from 'app/shared/models/style-item.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonComponent implements OnInit {

  @Input() styleArray!: StyleItemModel[];
  styleExp: {} = {};
  nameButton: string | [];

  constructor() { }

  ngOnInit(): void {
    if (this.styleArray) {
      this.styleArray.forEach(({ name, value, measurement }) => {
        name === 'name' ? this.nameButton = value : this.styleExp[name] = `${value}${measurement}`;
      });
    }
  }

}