import { Component, Input, OnInit } from '@angular/core';
import { SocioService } from '../../services/socio.service';
import { BarcoService } from '../../services/barco.service';
import { Socio } from '../../interfaces/Socio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Barco } from '../../interfaces/Barco';
import Swal from 'sweetalert2';
import { ValidateMatriculaService } from '../../validators/validate-matricula';
import { ValidateNumAmarre } from '../../validators/validate-numAmarre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-barco',
  templateUrl: './add-barco.component.html',
  styleUrl: './add-barco.component.css'
})
export class AddBarcoComponent implements OnInit{

  socios : Socio[] = []

  @Input() id: number = 0;

  barco !: Barco

  constructor(private fb: FormBuilder,
              private socioService: SocioService,
              private barcoService: BarcoService,
              private validateMatricula: ValidateMatriculaService,
              private validateNumAmarre: ValidateNumAmarre,
              private router: Router) {}


  myForm: FormGroup = this.fb.group({
    matricula:  ['', [Validators.required], [this.validateMatricula]],       
    nombreBarco:  ['', [Validators.required]], 
    numAmarre:  ['', [Validators.required, Validators.min(0)], [this.validateNumAmarre]],   
    cuota:  ['', [Validators.required, Validators.min(1)]],      
    idSocio:  ['', [Validators.required]],    
  })

  isValidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched
  }

  get matriculaErrorMsg(): string {
    const errors = this.myForm.get("matricula")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "La matrícula es requerida"
      }else if (errors['matriculaTaken']){
        errorMsg = "La matrícula ya está en uso"
      }
    }
    return errorMsg;
  }


  get cuotaErrorMsg(): string {
    const errors = this.myForm.get("cuota")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "La cuota es requerida"
      }else if (errors['min']){
        errorMsg = "La cuota debe ser minimo 1"
      }
    }
    return errorMsg;
  }

  get numAmarreErrorMsg(): string {
    const errors = this.myForm.get("numAmarre")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "El numero del amarre es requerido"
      }else if(errors['min']) {
        errorMsg = "El numero del amarre debe ser como mínimo 0"
      }else if (errors['numAmarreTaken']){
        errorMsg = "El numero del amarre ya está en uso"
      }
    }
    return errorMsg;
  }

  ngOnInit(): void {
    if (this.id!=null) {
      this.cargarBarcoById()
      this.barcoService.setIdBarco(this.id)
    }
    this.cargarSocios()
  }

  cargarSocios() {
    this.socioService.getSocios().subscribe({
      next: s => this.socios = s
    })
  }


  addBarco() {
    if (this.myForm.valid) {
      console.log(this.myForm.value)
      const idSocioInt = this.myForm.value.idSocio
      const newBarco = {
        matricula: this.myForm.value.matricula,        
        nombreBarco: this.myForm.value.nombreBarco,
        numAmarre: this.myForm.value.numAmarre,    
        cuota: this.myForm.value.cuota,
        idSocio: parseInt(idSocioInt)
      }
      console.log(newBarco)
      this.barcoService.postBarco(newBarco).subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Nuevo barco registrado!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(["listBarcos"])
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





  cargarBarcoById() {
    this.barcoService.getBarcoById(this.id).subscribe({
      next: b => {
        this.myForm.setValue({
          matricula: b.matricula,        
          nombreBarco: b.nombreBarco,
          numAmarre: b.numAmarre,    
          cuota: b.cuota,
          idSocio: b.idSocio
        })
      }
    })
  }

  updateBarco() {
    if (this.myForm.valid) {
      const idSocioInt = this.myForm.value.idSocio
      const newBarco = {
        matricula: this.myForm.value.matricula,        
        nombreBarco: this.myForm.value.nombreBarco,
        numAmarre: this.myForm.value.numAmarre,    
        cuota: this.myForm.value.cuota,
        idSocio: parseInt(idSocioInt)
      }

      this.barcoService.putBarco(newBarco, this.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Barco editado!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(["listBarcos"])
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
