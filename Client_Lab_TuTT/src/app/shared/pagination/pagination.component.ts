import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * Component Phân trang
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];
  maxPages: number = 4;

  ngOnInit() {
    this.updatePages();
  }

  ngOnChanges() {
    this.updatePages();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  updatePages() {
    const half = Math.floor(this.maxPages / 2);
    let start = Math.max(this.currentPage - half, 1);
    let end = start + this.maxPages - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(end - this.maxPages + 1, 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.pageChange.emit(page);
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }
}
