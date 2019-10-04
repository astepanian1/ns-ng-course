import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;

  @ViewChild('emailEl', { static: false })
  emailEl: ElementRef<TextField>;
  @ViewChild('passwordEl', { static: false })
  passwordEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
    this.form = new FormGroup({

      email: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)] })

    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = (status === "VALID");
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = (status === "VALID");
    })

  }
  OnSignin() {
    this.router.navigate(['/today'], { clearHistory: true });
  }

  onSubmit() {

    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.form.reset();

    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    if (this.isLogin) {
      console.log('Logging in...');
    } else {
      console.log('Signing up ...');
    }

    this.router.navigate(['/challenges']);
  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
