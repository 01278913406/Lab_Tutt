import { Component } from '@angular/core';
import { Toast } from '../../lib-shared/models/toast';
import { CONFIG_TOAST } from '../../config/toast.config';
/**
 * Component toast để hiển thị thông báo
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})

export class ToastComponent {
  toasts: Toast[] = [];
  cssToast = "text-bg-light";
  showToast(title: string, message: string): void {
    const time = new Date().toLocaleTimeString();
    switch (title) {
      case CONFIG_TOAST.Primary:
        this.cssToast = "text-bg-primary";
        break;
      case CONFIG_TOAST.Secondary:
        this.cssToast = "text-bg-secondary";
        break;
      case CONFIG_TOAST.Success:
        this.cssToast = "text-bg-success";
        break;
      case CONFIG_TOAST.Danger:
        this.cssToast = "text-bg-danger";
        break;
      case CONFIG_TOAST.Warning:
        this.cssToast = "text-bg-warning";
        break;
      case CONFIG_TOAST.Info:
        this.cssToast = "text-bg-info";
        break;
      case CONFIG_TOAST.Dark:
        this.cssToast = "text-bg-dark";
        break;
      default:
        this.cssToast = "text-bg-light";
    }
    const toast = { title, message, time, show: true };
    this.toasts.push(toast);

    setTimeout(() => {
      toast.show = false;
    }, 5000); // Hide toast after 5 seconds
  }

  closeToast(toast: Toast): void {
    toast.show = false;
  }
}
