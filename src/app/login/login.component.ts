import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  permission: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  flagsCheck = false;
  message = "";

  private authData: User[] = [
    {
      "id": 1,
      "name": "admin",
      "permission": "all",
      "password": "admin"
    },
    {
      "id": 2,
      "name": "deepak",
      "permission": "none",
      "password": "123"
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;

    }

  }

  checkLogin() {
    const userName = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    if (!userName && !password) {
      return;
    }
    this.flagsCheck = true;

    const user = this.authData.find((user) => user.name === userName);
    if (!user) {
      this.message = "This user does not exist";
      return;
    }

    if (user.password === password) {
      this.message = "login success";
      this.router.navigate(['/home']);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.message = "Password is incorrect";
    }

  }

}
