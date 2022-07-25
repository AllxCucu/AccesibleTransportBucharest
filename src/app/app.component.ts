import { Component, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ToastContainerDirective, { static: true }) 
  toastContainer: ToastContainerDirective;
  title = 'tb-accessible';
  constructor(private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

}
