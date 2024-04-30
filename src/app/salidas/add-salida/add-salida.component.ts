import { Component, Input, OnInit } from '@angular/core';
import { SalidaService } from '../../services/salida.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalidaData } from '../../interfaces/Salida';
import { FormatWidth, formatDate, getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import Swal from 'sweetalert2';
import { BarcoService } from '../../services/barco.service';
import { Barco } from '../../interfaces/Barco';
import { ValidatorsService } from '../../validators/validatorsService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-salida',
  templateUrl: './add-salida.component.html',
  styleUrl: './add-salida.component.css'
})
export class AddSalidaComponent implements OnInit{

  salida !: SalidaData

  barcos : Barco[] = []

  @Input() id: number = 0

  constructor(private salidaService: SalidaService,
              private fb : FormBuilder,
              private barcoService: BarcoService,
              private validateDate: ValidatorsService,
              private router: Router) {}


  ngOnInit(): void {
    if (this.id!=null) {
      this.getSalidaById()
    }
    this.getBarcos()
  }

  myForm: FormGroup = this.fb.group({
    horaSalida: ['', [Validators.required, this.validateDate.dateNotValid]],
    destino: ['', [Validators.required]], 
    dniPatron: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)]],
    idBarco: ['', [Validators.required]],
  }) 


  get horaErrorMsg() {
    const errors = this.myForm.get("horaSalida")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "La fecha y hora de salida es requerida"
      }else if (errors['fechaMenor']){
        errorMsg = "La fecha debe ser la actual o mayor"
      }
    }
    return errorMsg;
  }

  get dniErrorMsg(): string {
    const errors = this.myForm.get("dniPatron")?.errors;
    let errorMsg : string = ""
  
    if (errors) {
      if (errors['required']){
        errorMsg = "El DNI es requerido"
      }else if(errors['pattern']){
        errorMsg = 'El DNI debe tener 8 numeros y 1 número al final';
      }
    }
    return errorMsg;
  }

  isValidField(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched
  }

  getBarcos() {
    this.barcoService.getBarcos().subscribe({
      next: b => this.barcos = b
    })
  }

  addSalida() {
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      const idBarcoInt = this.myForm.value.idBarco
      const hora = this.myForm.value.horaSalida.substring(0,10) + " " + this.myForm.value.horaSalida.substring(11,this.myForm.value.horaSalida.length)
      const newSalida = {
        horaSalida: hora,       
        destino: this.myForm.value.destino,
        dniPatron: this.myForm.value.dniPatron,    
        idBarco: parseInt(idBarcoInt)
      }
      console.log(newSalida)
      this.salidaService.postSalida(newSalida).subscribe({
        next: (resp) => {
          console.log(resp)
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Nueva salida registrada!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(["listSalidas"])
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

  getSalidaById() {
    this.salidaService.getSalidaById(this.id).subscribe({
      next: s => {
        console.log(s.horaSalida)
        this.myForm.setValue({
          horaSalida: formatDate(new Date(s.horaSalida), "yyyy-MM-ddTHH:mm", "en-US"),
          destino: s.destino,  
          dniPatron: s.dniPatron,
          idBarco: s.idBarco
        })
      }
    })
  }

  updateSalida() {
    if (this.myForm.valid) {
      //console.log(this.myForm.value)
      const idBarcoInt = this.myForm.value.idBarco
      const hora = this.myForm.value.horaSalida.substring(0,10) + " " + this.myForm.value.horaSalida.substring(11,this.myForm.value.horaSalida.length)
      const newSalida = {
        horaSalida: hora,
        destino: this.myForm.value.destino,
        dniPatron: this.myForm.value.dniPatron,    
        idBarco: parseInt(idBarcoInt)
      }
      console.log(newSalida)

      this.salidaService.putSalida(newSalida, this.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Operación exitosa',
            iconColor: "#3A354B",
            text: "Salida editada!",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(["listSalidas"])
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
