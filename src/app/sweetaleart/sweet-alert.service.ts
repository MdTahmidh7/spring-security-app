import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {

  // Basic alert
  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
    });
  }

  // Confirmation dialog
  showConfirmationDialog(title: string, text: string, confirmButtonText: string = 'OK') {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      padding: "3em",
      color: "#1a1a21",
      background: "#efefef",
      backdrop: `rgba(50, 53, 64,0.6)
      url("/images/nyan-cat.gif")
      left top
      no-repeat`
    });
  }

// Toast message
showToast(title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
  Swal.fire({
    title,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
}

  // Input dialog
  showInputDialog(title: string, inputPlaceholder: string) {
    return Swal.fire({
      title,
      input: 'text',
      inputPlaceholder,
      showCancelButton: true,
    });
  }

  // Customizable alert with options
  /*showCustomAlert(options: Swal.SweetAlertOptions) {
    return Swal.fire(options);
  }*/
}
