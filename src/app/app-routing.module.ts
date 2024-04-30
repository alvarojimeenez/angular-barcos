import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSociosComponent } from './socios/list-socios/list-socios.component';
import { AddSocioComponent } from './socios/add-socio/add-socio.component';
import { DetailSocioComponent } from './socios/detail-socio/detail-socio.component';
import { IndexComponent } from './index/index.component';
import { ListBarcosComponent } from './barcos/list-barcos/list-barcos.component';
import { AddBarcoComponent } from './barcos/add-barco/add-barco.component';
import { ListSalidasDelBarcoComponent } from './salidas/list-salidas-del-barco/list-salidas-del-barco.component';
import { AddSalidaComponent } from './salidas/add-salida/add-salida.component';
import { LoginComponent } from './auth/login/login.component';
import { jwtGuard } from './guardians/jwt.guard';
import { adminGuard } from './guardians/admin.guard';
import { ListSalidasComponent } from './salidas/list-salidas/list-salidas.component';

export const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "index", component: IndexComponent},
  {path: "listSocios", component: ListSociosComponent, canMatch:[jwtGuard]},
  {path: "detailSocio/:id", component: DetailSocioComponent, canMatch:[jwtGuard]},
  {path: "addSocio", component: AddSocioComponent},
  {path: "addSocio/:id", component: AddSocioComponent, canMatch:[adminGuard]},
  {path: "listBarcos", component: ListBarcosComponent, canMatch:[jwtGuard]},
  {path: "addBarco", component: AddBarcoComponent, canMatch:[adminGuard] },
  {path: "addBarco/:id", component:AddBarcoComponent, canMatch:[adminGuard]},
  {path: "salidasByBarco/:id", component:ListSalidasDelBarcoComponent, canMatch:[jwtGuard]},
  {path: "addSalida", component:AddSalidaComponent, canMatch:[adminGuard]},
  {path: "addSalida/:id", component:AddSalidaComponent, canMatch:[adminGuard]},
  {path: "listSalidas", component: ListSalidasComponent, canMatch:[jwtGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
