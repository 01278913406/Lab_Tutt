import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * Component Select Dropdown
 */
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.css'
})

export class SelectDropdownComponent {

  @Input() options: { value: any, display: any }[] = [];  // list object
  @Input() selectedValue: any = '';                       // Chọn giá trị
  @Output() selectionChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(value);
  }
}
