import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submitted = false;

  constructor(private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    this.submitted = true;
    console.log(1)

    if(this.loginForm.invalid) return;

    this.spinner.show();

    console.log(this.loginForm.value)

    this.auth.login(this.loginForm.value).then((res: any) => {
      console.log(res)
      localStorage.setItem('Usuario',JSON.stringify(res.AppLogin))
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/');
    }).catch(err => {
      console.log(err)
      this.toast.error(err.error,"No Autorizado");
    }).finally(() => this.spinner.hide());
  }


}
