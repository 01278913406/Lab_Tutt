import { Component, ViewChild } from '@angular/core';

import { UsersService } from '../lib-shared/services/users.service';
import { User } from '../lib-shared/models/user';
import { ToastComponent } from '../shared/toast/toast.component';
import { SecondPageIndexBase } from '../lib-shared/classes/base/second-page-index-base';
import { Gender_Options } from '../config/gender.config';
import DateExtended from '../shared/datepicker/date-extended';
import { FormControl } from '@angular/forms';


/**
 * Component danh sách người dùng
 *  * tutt2 5/20/2024 created
 */
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

  //xóa một người dùng
  showDeleteDialog: boolean = false;    //hiển thị dialog xác nhận khi xóa
  confirmMessageDelete = '';
  selectedUserId: number | null = null; //UserId khi chọn xóa

  //xóa nhiều người dùng
  showMultiDeleteDialog: boolean = false;    //hiển thị dialog xác nhận khi xóa
  confirmMessageMultiDelete = '';            // 

  maxFromDateControl = new FormControl((new DateExtended()).format('Y-m-d'));


  showEditDialog: boolean = false;    //hiển thị trang cập nhật thông tin người dùng khi thêm mới or edit
  selectedUser: any = null;             //chọn người dùng khi chỉnh sửa
  titleEditDialog: string = "Thêm mới người dùng"; //tiêu để form chỉnh sửa, thêm mới
  override dataSource: User[] = [];     //danh sách người dùng

  selectedItems: number[] = [];  //list ai khi chọn xóa nhiều người dùng

  genderOptions = Gender_Options;
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

  //sự kiện chọn trong checkbox
  toggleSelection(itemId: number) {
    const index = this.selectedItems.indexOf(itemId);
    if (index === -1) {
      this.selectedItems.push(itemId);
    } else {
      this.selectedItems.splice(index, 1);
    }
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
    this.confirmMessageDelete = "Xác nhận xóa người dùng: " + user.username;
    this.selectedUserId = user.id;
    this.showDeleteDialog = true;

  }

  //xóa nhiều người dùng
  async onDeleteMultiUser(): Promise<void> {
    if (this.selectedItems.length) {
      this.confirmMessageMultiDelete = "Xác nhận xóa danh sách người dùng khỏi hệ thống?";
      this.showMultiDeleteDialog = true;
    }
    else
      this.toastComponent.showToast('Warning', "Chưa chọn người dùng!");
  }
  //sự kiện thêm mới người dùng hoặc chỉnh sửa thông tin người dùng
  async openEditModal(user: User | null): Promise<void> {
    if (user) {
      this.selectedUser = user;
      this.titleEditDialog = "Cập nhật thông tin người dùng - " + user.username;
    }
    else
      this.titleEditDialog = "Thêm người dùng mới";

    this.showEditDialog = true;
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
    this.page = 1;
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

  /**
   * Handles xác nhận xóa nhiều user
   * @param result 
   * @returns multi delete confirm 
   */
  async handleMultiDeleteConfirm(result: boolean): Promise<void> {
    if (result && this.selectedItems.length > 0) {
      await this._usersService.DeleteMultiUser(this.selectedItems).then(rs => {
        if (rs != undefined && rs.status) {
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
    this.showMultiDeleteDialog = false;
    this.selectedItems = [];
  }

  //khi người dùng chọn cập nhật ở form cập nhật người dùng
  handleSave(result: any): void {
    if (result != undefined && result.status) {
      this.getData();
      this.toastComponent.showToast('Success', result.message);
    }
    else {
      this.toastComponent.showToast('Warning', result?.message ? result?.message : "Dịch vụ cập nhật người dùng đang gặp sự cố!");
    }
    this.showEditDialog = false;
    this.selectedUser = null;
  }
  //khi người dùng chọn hủy ở form cập nhật người dùng
  handleCancel(): void {
    this.showEditDialog = false;
    this.selectedUser = null;
  }

  // định dang ngày tháng ô tìm kiếm từ ngày
  displayFromDateFormatter = (date: DateExtended): string => {
    if (!date.isValid()) {
      return 'Từ ngày';
    }
    return `${date.format('d/m/Y')}`;
  };
  //dịnh dạng ngày tháng ô tìm kiếm đến ngày
  displayToDateFormatter = (date: DateExtended): string => {
    if (!date.isValid()) {
      return 'Đến ngày';
    }
    return `${date.format('d/m/Y')}`;
  };
}
