import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() styleArray: any;
  styleExp = {};
  nameButton = '';

  constructor() { }

  ngOnInit(): void {
    if (this.styleArray) {
      this.styleArray.forEach(item => {
        item.name === 'name' ? this.nameButton = item.value : this.styleExp[item.name] = `${item.value}${item.measurement}`;
      });
    }
  }

}
