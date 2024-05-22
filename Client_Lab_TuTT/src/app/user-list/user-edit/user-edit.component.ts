import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { Gender_Options } from '../../config/gender.config';
import { UsersService } from '../../lib-shared/services/users.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { User } from '../../lib-shared/models/user';
import { ageValidator, minimumAgeAsyncValidator } from '../../lib-shared/classes/form-validators';

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

  isEdit: boolean = false; // ẩn hiện trạng tái với trường hợp thêm mới và chỉnh sửa người dùng
  genderOptions = Gender_Options;
  passwordFieldType: string = 'password';
  confimPasswordFieldType: string = 'password';

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService
  ) {
    this.editUserForm = this.fb.group({
      id: [-1],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("(0)[0-9 ]{9}")]],
      email: [''],
      gender: ['', Validators.required],
      birthDate: ['', [Validators.required, ageValidator(18)]],
      confimPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
      // id: [''],
      // username: ['', Validators.required, Validators.maxLength(50)],
      // password: ['', Validators.required],
      // fullName: ['', Validators.required, Validators.maxLength(200)],
      // phoneNumber: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // gender: ['', Validators.required],
      // birthDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    if (this.user) {
      this.isEdit = true;
      this.setFormValues(this.user);
    }
   
  }

  setFormValues(user: User): void {
    // Format the date before setting it to the form control
    const formattedDate = this.formatDate(user.birthDate);
    this.editUserForm.patchValue({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      birthDate: formattedDate
    });
    //xóa Validators password và xác nhận password đối với trường hợp cập nhật thông tin 
    this.editUserForm.controls["password"].clearValidators();
    this.editUserForm.controls["password"].updateValueAndValidity();
    this.editUserForm.controls["confimPassword"].clearValidators();
    this.editUserForm.controls["confimPassword"].updateValueAndValidity();
  }

  //chuyển định dạng ngày sinh về ngày/tháng/năm
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  //chuyển đổi định dạng ngày để call api
  formatDateToBackend(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  //sự kiện click nút cập nhật
  async onSave(): Promise<void> {
    if (this.editUserForm.valid) {

      const modelEdit: any = {
        id: this.editUserForm.value.id,
        username: this.editUserForm.value.username,
        password: this.editUserForm.value.password,
        fullName: this.editUserForm.value.fullName,
        phoneNumber: this.editUserForm.value.phoneNumber,
        email: this.editUserForm.value.email,
        gender: this.editUserForm.value.gender,
        birthDate: this.formatDateToBackend(this.editUserForm.value.birthDate)
      };
      await this._usersService.SaveUser(modelEdit).then(rs => {
        if (rs != undefined && rs.status) {
          this.save.emit(rs);
        }
        else {
          this.toastComponent.showToast('Warning', rs?.message ? rs?.message : "Dịch vụ cập nhật người dùng đang gặp sự cố!");
        }
      }, error => {
        this.toastComponent.showToast('Danger', 'Dịch vụ cập nhât người dùng đang gặp sự cố!');
      });
    }
  }

  /**
   * Determines whether cancel on
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
 * ẩn hiện password
 * Determines whether check user login on
 */
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  toggleconfimPasswordVisibility(): void {
    this.confimPasswordFieldType = this.confimPasswordFieldType === 'password' ? 'text' : 'password';
  }

  // checkInvalid(){
  //   let pasword = this.editUserForm.value.password
  //   if(pasword.)
  // }
  get birthDate() {
    return this.editUserForm.get('birthDate');
  }
}
