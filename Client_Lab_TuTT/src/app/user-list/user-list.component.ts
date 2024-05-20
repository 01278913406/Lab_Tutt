import { Component } from '@angular/core';
import moment from 'moment';

import ngxDaterangepickerBootstrap from "ngx-daterangepicker-bootstrap"

import { UsersService } from '../lib-shared/services/users.service';
import { User } from '../lib-shared/models/user';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  searchModel: any = {
    key: '',
    gender: '',
  };
  users: User[] = [];
  
  dataSource: User[] = [];
  total = 0;
  page: number = 1;
  pageSize: number = 100;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  dropsDown = 'down';
  dropsUp = 'up';
  opensRight = 'right';
  opensCenter = 'center';
  opensLeft = 'left';
  selectedSingleCalendarAutoLeft: any;
  locale = {
    firstDay: 1,
    startDate: moment().subtract(7, 'days'),
    endDate: moment(),
    format: 'DD.MM.YYYY',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
  };
  genderOptions = [
    { value: '', display: 'Chọn giới tính' },
    { value: 'Nam', display: 'Nam' },
    { value: 'Nữ', display: 'Nữ' },
    { value: 'Chưa xác định', display: 'Chưa xác định' }
  ];

  constructor(private _usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }


  /**
   * lấy danh sách người dùng
   * @returns data 
   */
  async getData(): Promise<void> {
    this.dataSource = [];
    await this._usersService.GetUsersClient(this.searchModel.key, this.searchModel.gender, this.currentPage, this.itemsPerPage
    ).then(rs => {
      if (rs != undefined && rs.status) {
        this.dataSource = rs.data;
        this.totalItems = rs.totalRecord;
      }
    });
  }

  /**
   * Tìm kiếm
   */
  async onSearch() {
    await this.getData();
  }

  deleteUser(id: number): void {

  }

  openEditModal(user: User): void {

  }

  onDateRangeChanged(event: any) {
    console.log('Date range changed:', event);
  }

  //sự kiện thay đổi trang khi người dùng chọn trang ở pagination
  async onPageChange(page: number): Promise<void> {
    this.currentPage = page;
    await this.getData();
  }

  //chọn lọc theo giới tính
  async onSelectionGenderChange(value: string): Promise<void> {
    this.searchModel.gender = value;
    await this.getData();
  }

  //
  datesUpdatedSingle($event: any) {
    console.log('single', $event, JSON.stringify(this.selectedSingleCalendarAutoLeft));
  }
}
