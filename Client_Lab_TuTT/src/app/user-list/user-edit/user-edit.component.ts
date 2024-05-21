import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  @Input() title: string = "Thêm mới người dùng";
  @Input() user: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.editUserForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.editUserForm.valid) {
      this.save.emit(this.editUserForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
