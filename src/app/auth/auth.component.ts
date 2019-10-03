import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;


  constructor(private router: RouterExtensions) { }

  ngOnInit() {
    this.form = new FormGroup({

      email: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required, Validators.minLength(6)] })

    });

    this.form.get('email').statusChanges.subscribe(status=>{
      this.emailControlIsValid = (status === "VALID");
    });

    this.form.get('password').statusChanges.subscribe(status=>{
      this.passwordControlIsValid = (status === "VALID");
    })

  }
  OnSignin() {
    this.router.navigate(['/today'], { clearHistory: true });
  }

   onSubmit(){
     const email = this.form.get('email').value;
     const password = this.form.get('password').value;

     console.log(email,password);
   }
}
