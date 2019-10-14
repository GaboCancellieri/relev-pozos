import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// COMPONENTES
import { UsuariosComponent } from './usuario/usuarios.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PozoComponent } from './pozos/pozos.component';
import { RelevadorComponent } from './relevadores/relevadores.component';
import { AreaComponent } from './areas/areas.component';

const routes: Routes = [
  // REDIRECCIONAMIENTO A INICIO
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  // RUTAS A COMPONENTES
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'pozos', component: PozoComponent, canActivate: [AuthGuard] },
  { path: 'relevadores', component: RelevadorComponent, canActivate: [AuthGuard] },
  { path: 'areas', component: AreaComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
