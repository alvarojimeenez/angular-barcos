import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SocioService } from '../../services/socio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socio } from '../../interfaces/Socio';
import Swal from 'sweetalert2';
import { ValidateEmailService } from '../../validators/validate-email';
import { ValidateDniService } from '../../validators/validate-dni';
import { ValidatorsService } from '../../validators/validatorsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-socio',
  templateUrl: './add-socio.component.html',
  styleUrl: './add-socio.component.css'
})
export class AddSocioComponent  implements OnInit{

  socio !: Socio 

  @Input() id: number = 0;

  constructor(private fb: FormBuilder,
              private socioService: SocioService,
              private validateEmail: ValidateEmailService,
              private validateDni: ValidateDniService,
              private validatorsService: ValidatorsService,
              private router: Router){}


  myForm: FormGroup = this.fb.group({
    dni: ['',[Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)], [this.validateDni]],
    name:  ['', [Validators.required]],       
    lastName:  ['', [Validators.required]], 
    address:  ['', [Validators.required]],   
    phone:  ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],      
    email:  ['', [Validators.required, Validators.email], [this.validateEmail]],
    password: ['', [Validators.required, Validators.minLength(6), this.validatorsService.createPasswordStrengthValidator()]],
    confirmPassword: ['', [Validators.required]]    
  },{validators: [this.validatorsService.equalFields('password', 'confirmPassword')]})

  isValidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched
  }

  get emailErrorMsg(): string {
    const errors = this.myForm.get("email")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "El email es requerido"
      }else if(errors['email']){
        errorMsg = 'El email no tiene formato de correo';
      }else if (errors['emailTaken']){
        errorMsg = "El email ya está en uso"
      }
    }
    return errorMsg;
  }

  get dniErrorMsg(): string {
    const errors = this.myForm.get("dni")?.errors;
    console.log(this.myForm.value.dni)
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "El DNI es requerido"
      }else if(errors['pattern']){
        errorMsg = 'El DNI debe tener 8 numeros y 1 número al final';
      }else if (errors['dniTaken']){
        errorMsg = "El DNI ya está en uso"
      }
    }
    return errorMsg;
  }

  get phoneErrorMsg(): string {
    const errors = this.myForm.get("phone")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "El teléfono es requerido"
      }else if (errors['minlength']){
        errorMsg = "El teléfono debe tener un mínimo de 9 cifras"
      }else if (errors['maxlength']){
        errorMsg = "El teléfono debe tener un máximo de 9 cifras"
      }
    }
    return errorMsg;
  }

  get passwordErrorMsg(): string {
    const errors = this.myForm.get('password')?.errors ;
    let errorMsg: string = ""
    if (errors) {
      if( errors['required']){
        errorMsg = 'La contraseña es obligatoria';
      }
      else if(errors['minlength']){
        errorMsg = 'La contraseña debe tener 6 caracteres';
      }
      else if(errors['passwordStrength']){
        errorMsg = 'La contraseña no es válida';
      }
      
    }
    return errorMsg;
  }

  /**
   * Parte de añadir socio
   */

  addSocio() {
    if (this.myForm.valid) {
      this.socio = this.myForm.value
      console.log(this.socio)
      this.socioService.postSocio(this.socio).subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Nuevo socio registrado!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/'])
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            iconColor: "#3A354B",
            text: "El formulario tiene algún campo no válido!",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
    }else {
        Swal.fire({
          title: 'Error!',
          iconColor: "#3A354B",
          text: "El formulario está incompleto o tiene algún campo no válido!",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      
    }
  }

  /**
   * Parte de editar socio
   */

  getSocioById() {
    this.socioService.getSociosById(this.id).subscribe({
      next: so => {
        //console.log(this.editSocio)
        this.myForm.setValue({
          dni: so.dni,
          name: so.name,
          lastName: so.lastName,
          address: so.address,
          phone: so.phone,
          email: so.email
        })
      }
    })
  }

  ngOnInit(): void {
    if (this.id!=null) {
      this.getSocioById()
      this.myForm = this.fb.group({
        dni: ['',[Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)], [this.validateDni]],
        name:  ['', [Validators.required]],       
        lastName:  ['', [Validators.required]], 
        address:  ['', [Validators.required]],   
        phone:  ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],      
        email:  ['', [Validators.required, Validators.email], [this.validateEmail]],   
      })
      this.socioService.setIdSocio(this.id)
    }
  }

  updateSocio() {
    if (this.myForm.valid) {
      this.socio = this.myForm.value

      this.socioService.putSocio(this.socio, this.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Socio editado!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['listSocios'])
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            iconColor: "#3A354B",
            text: "El formulario tiene algún campo no válido!",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
    }else {
      Swal.fire({
        title: 'Error!',
        iconColor: "#3A354B",
        text: "El formulario está incompleto o tiene algún campo no válido!",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

}
