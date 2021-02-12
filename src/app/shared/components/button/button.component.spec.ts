import { ButtonComponent } from './button.component';

describe('Button component', () => {
  let comp;
  const buttonStyle = [
    {
      name: 'name', value: 'testName', measurement: ''
    },
    {
      name: 'width', value: '100', measurement: 'px'
    },
    {
      name: 'height', value: '50', measurement: 'px'
    },
    {
      name: 'border-style',
      value: [ 'none' , 'hidden' , 'dotted' , 'dashed' , 'solid' , 'double' , 'groove' , 'ridge' , 'inset' , 'outset' ],
      measurement: ''
    },
    {
      name: 'font-size', value: '16', measurement: 'px'
    }
  ];

  beforeEach(() => {
    comp = new ButtonComponent();
  });

  it('check Button values', () => {
    comp.ngOnInit();
    comp.styleArray = [];

    expect(comp.styleArray).toEqual([]);
  });

  it('check Button onInit', () => {
    comp.styleArray = buttonStyle;
    comp.ngOnInit();

    expect(comp.nameButton).toEqual('testName');
  });
});
