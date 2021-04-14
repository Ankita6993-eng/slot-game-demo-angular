import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';
import {UserService} from "../service/user.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registerForm: FormGroup|any;
    submitted = false;
    data :any
  constructor(private formBuilder: FormBuilder,
        private router: Router,private userService: UserService) {
          this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        let users:any[] = JSON.parse(localStorage.getItem('users') || '[]');
         }

  ngOnInit(): void {
  }
get f() { return this.registerForm.controls; }

    Submit() {
        this.submitted = true;
       if (this.registerForm.invalid) {
            return;
        }

        console.log("Array",this.registerForm.value)
          this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                   console.log("user created")
                },
                error => {
                    console.log(error)

                });

                this.registerForm.reset()
    }
}
