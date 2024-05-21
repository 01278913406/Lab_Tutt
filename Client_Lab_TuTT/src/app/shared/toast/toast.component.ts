import { Component } from '@angular/core';
import { Toast } from '../../lib-shared/models/toast';

enum TitleToast {
  Primary = "Primary",
  Secondary = "Secondary",
  Success = "Success",
  Danger = "Danger",
  Warning = "Warning",
  Info = "Info",
  Light = "Light",
  Dark = "Dark"
}

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
    //let cssToast = "text-bg-light"
    switch (title) {
      case TitleToast.Primary:
        this.cssToast = "text-bg-primary";
        break;
      case TitleToast.Secondary:
        this.cssToast = "text-bg-secondary";
        break;
      case TitleToast.Success:
        this.cssToast = "text-bg-success";
        break;
      case TitleToast.Danger:
        this.cssToast = "text-bg-danger";
        break;
      case TitleToast.Warning:
        this.cssToast = "text-bg-warning";
        break;
      case TitleToast.Info:
        this.cssToast = "text-bg-info";
        break;
      case TitleToast.Dark:
        this.cssToast = "text-bg-dark";
        break;
      default:
        this.cssToast = "text-bg-light";
    }

    console.log("cssToast : ",  this.cssToast);
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
