import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private toastr: ToastrService) {
  }

  ngOnInit() {
    localStorage.removeItem("username");
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    //User can access member's page only if logged in as admin
    if(this.loginForm.value.username === 'admin'){
      localStorage.setItem('username', JSON.stringify({ username: this.loginForm.value.username }));
      this.appService.setUsername(this.loginForm.value.username);
      this.toastr.success("Welcome Admin!");
      this.router.navigate(['/members']);
    } else {
      this.toastr.error("Invalid Usename / Password!");
    }
  }

}
