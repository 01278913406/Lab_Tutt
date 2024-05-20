import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.css'
})
export class SelectDropdownComponent {
  @Input() options: { value: string, display: string }[] = [];
  @Input() selectedValue: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(value);
  }
}
