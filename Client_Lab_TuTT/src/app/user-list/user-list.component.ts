import { Component } from '@angular/core';
import { UsersService } from '../lib-shared/services/users.service';
import { User } from '../lib-shared/models/user';
import moment from 'moment';
import ngxDaterangepickerBootstrap from "ngx-daterangepicker-bootstrap"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];
  searchTerm: string = '';
  searchRole: string = '';
  dataSource: User[] = [];
  total = 0;
  page: number = 1;
  pageSize: number = 100;

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
  
  constructor(private _usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
   await this.getData();
  }

  async getData(): Promise<void> {
    this.dataSource = [];
    await this._usersService.GetsAllUsers(
    ).then(rs => {
      if (rs != undefined && rs.status) {
        this.dataSource = rs.data;
        console.log("list data người dung", JSON.stringify(this.dataSource));
        this.total = rs.totalRecord;
      }
    });
  }

  deleteUser(id: number): void {

  }

  openEditModal(user: User): void {

  }

  search(): void {

  }
  onDateRangeChanged(event: any) {
    console.log('Date range changed:', event);
  }
}
