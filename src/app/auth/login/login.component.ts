import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){}


  myForm: FormGroup = this.fb.group({
    dni: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  login(){
    if(this.myForm.valid){
      const {dni, password} = this.myForm.value
      this.authService.login(dni, password)
      .subscribe(
        resp => {
          if (resp===true){
            this.router.navigateByUrl('/index')
            Swal.fire({
              title: 'Éxito',
              iconColor: "#3A354B",
              text: "Bienvenido a Club Naútico!",
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: <string>resp,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        }
      )
    }
    else{
      this.myForm.markAllAsTouched()
    }
  }
}
