import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup|any;
    loading = false;
    submitted = false;
    returnUrl: string="";
  constructor(
       private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
         private authenticationService: AuthenticationService
  ) { 
     this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

  ngOnInit(): void {

     this.authenticationService.logout();
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log("succesfullu login")
                },
                error => {
                    //this.alertService.error(error)
                    console.log(error);
                    alert("username and password in correct")
                    this.loading = false;
                });
    }

}
