import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: AuthService) {
    this.postForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  submit() {  
    if (this.postForm.valid) {  
      this.userService.forgotPassword(this.postForm.value.email).subscribe(  
        (response: any) => { 
          if (response.status === 204) { 
            debugger
            this.toastr.success('Chúng tôi đã gửi 1 đường dẫn đến mail của bạn, hãy kiểm tra!', 'Hệ thống');  
            this.modalService.dismissAll();  
            this.postForm.reset();
          } else {  
            this.toastr.error(response.message || 'Có lỗi xảy ra!', 'Hệ thống');
          }  
        },  
        (error) => {  
          if (error.status === 404) {  
            this.toastr.error('Email này chưa đăng kí tài khoản!', 'Hệ thống');  
          } else {  
            this.toastr.error('Lỗi', 'Hệ thống');  
          }  
        }  
      );  
    }  
  }  
}
