import { Component, ViewChild } from '@angular/core';

import { UsersService } from '../lib-shared/services/users.service';
import { User } from '../lib-shared/models/user';
import { ToastComponent } from '../shared/toast/toast.component';
import { SecondPageIndexBase } from '../lib-shared/classes/base/second-page-index-base';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends SecondPageIndexBase {
  //thông tin tìm kiếm
  searchModel: any = {
    key: '',
    gender: '',
    fromDate: '',
    toDate: '',
  };
  users: User[] = [];

  showDeleteDialog: boolean = false;    //hiển thị dialog xác nhận khi xóa
  confirmMessageDelete = '';
  selectedUserId: number | null = null; //UserId khi chọn xóa

  showEditDialog: boolean = false;    //hiển thị trang cập nhật thông tin người dùng khi thêm mới or edit
  selectedUser: any = null;             //chọn người dùng khi chỉnh sửa
  override dataSource: User[] = [];     //danh sách người dùng

  genderOptions = [
    { value: '', display: 'Chọn giới tính' },
    { value: 'Nam', display: 'Nam' },
    { value: 'Nữ', display: 'Nữ' },
    { value: 'Chưa xác định', display: 'Chưa xác định' }
  ];
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(private _usersService: UsersService) {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  /**
   * lấy danh sách người dùng
   * @returns data 
   */
  async getData() {
   await this._usersService.GetUsersClient(this.searchModel.key, this.searchModel.gender, this.searchModel.fromDate, this.searchModel.toDate, this.page, this.limit
    ).then(rs => {
      if (rs != undefined && rs.status) {
        this.dataSource = rs.data;
        this.total = rs.totalRecord;
      }
      else {
        this.toastComponent.showToast('Warning', rs?.message ? rs?.message : "Hệ thống dịch vụ lấy danh sách người dùng đang gặp sự cố!");
      }
    }, error => {
      this.toastComponent.showToast('Danger', 'Hệ thống dịch vụ lấy danh sách người dùng đang gặp sự cố!');
    });
  }

  /**
   * Tìm kiếm
   */
  async onSearch() {
    await this.getData();
  }
  /**
   * Xóa người dùng
   * @param user 
   * @returns user 
   */
  async deleteUser(user: User): Promise<void> {
    console.log("Xóa người dùng", JSON.stringify(user));
    this.confirmMessageDelete = "Xác nhận xóa người dùng: " + user.username;
    this.selectedUserId = user.id;
    this.showDeleteDialog = true;

  }

  openEditModal(user: User): void {
    this.selectedUser = user;
    this.showEditDialog = true;
  }

  onDateRangeChanged(event: any) {
    console.log('Date range changed:', event);
  }

  //sự kiện thay đổi trang khi người dùng chọn trang ở pagination
  async onPageChange(page: number): Promise<void> {
    this.page = page;
    await this.getData();
  }

  //chọn lọc theo giới tính
  async onSelectionGenderChange(value: string): Promise<void> {
    this.searchModel.gender = value;
    await this.getData();
  }

  //chọn số lượng người dùng hiển thị trên danh sách
  async onSelectionNumberPerPageChange(value: number): Promise<void> {
    this.limit = value;
    await this.getData();
  }

  /**
   * Handles Xác nhận xóa người dùng
   * @param result 
   * @returns delete confirm 
   */
  async handleDeleteConfirm(result: boolean): Promise<void> {
    if (result && this.selectedUserId !== null) {
      await this._usersService.DeleteUserById(this.selectedUserId).then(rs => {
        if (rs != undefined && rs.status) {
          console.log("kết quả xóa người dung:", JSON.stringify(rs))
          this.getData();
          this.toastComponent.showToast('Success', rs.message);
        }
        else {
          this.toastComponent.showToast('Warning', rs?.message ? rs?.message : "Dịch vụ xóa người dùng đang gặp sự cố!");
        }
      }, error => {
        this.toastComponent.showToast('Danger', 'Dịch vụ xóa người dùng đang gặp sự cố!');
      });
    }
    this.showDeleteDialog = false;
    this.selectedUserId = null;
  }

  handleSave(updatedUser: any): void {
    this.showEditDialog = false;
    this.selectedUser = null;
    // this.userService.updateUser(updatedUser).subscribe(() => {
    //   this.loadUsers();
    //   this.showEditDialog = false;
    //   this.selectedUser = null;
    // });
  }

  handleCancel(): void {
    this.showEditDialog = false;
    this.selectedUser = null;
  }

  formatDate(event: any): void {
    const selectedDate = new Date(event.target.value);
    this.searchModel.fromDate = selectedDate.toISOString().substring(0, 10);
    const year = selectedDate.getFullYear();
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = selectedDate.getDate().toString().padStart(2, '0');
  this.searchModel.fromDate =`${year}-${month}-${day}`;
    console.log("ngay bat dau: ", `${year}-${month}-${day}`);
  }
}
