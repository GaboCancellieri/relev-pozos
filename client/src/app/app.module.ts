import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

// PrimeNG
import {AccordionModule, CalendarModule, MenuItem} from 'primeng/primeng';
import { SharedModule, PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import {DropdownModule} from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ChartModule} from 'primeng/chart';

// COMPONENTES
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PozoComponent } from './pozos/pozos.component';
import { RelevadorComponent } from './relevadores/relevadores.component';
import { AreaComponent } from './areas/areas.component';
import { MapComponent } from './map/map.component';
import { PorEtapasComponent } from './inicio/por_etapas/porEtapas.component';
import { GraficoSemanalComponent } from './inicio/grafico_semanal/graficoSemanal.component';
import { GraficoAcumuladoComponent } from './inicio/grafico_acumulado/graficoAcumulado.component';
import { GraficoAcumuladoEtapaComponent } from './inicio/grafico_acumulado_etapa/graficoAcumuladoEtapa.component';

// SERVICIOS
import { AuthenticationService } from './auth/auth.service';
import { UrlService } from './window.provider.service';
import { WINDOW_PROVIDERS } from './window.provider';
import { UsuarioService } from './usuario/user.service';
import { AuthGuard } from './auth/auth.guard';
import { RelevadorService } from './relevadores/relevador.service';
import {PozoService} from './pozos/pozo.service';
import { AreaService } from './areas/area.service';
import { PermissionService } from './usuario/permiso.service';
import { EtapaService } from './etapas/etapa.service';
import { RendimientoComponent } from './rendimiento/rendimiento.component';
import { PorRelevadorComponent } from './rendimiento/porRelevador/porRelevador.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    PozoComponent,
    RelevadorComponent,
    AreaComponent,
    MapComponent,
    PorEtapasComponent,
    GraficoSemanalComponent,
    GraficoAcumuladoComponent,
    GraficoAcumuladoEtapaComponent,
    RendimientoComponent,
    PorRelevadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDx-re1pqzN3ABWZiYS11d3JtvS75tTrEE'
    }),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    AccordionModule,
    ButtonModule,
    PanelModule,
    SharedModule,
    DataTableModule,
    TableModule,
    CalendarModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    SelectButtonModule,
    ChartModule
  ],
  providers: [
    AuthenticationService,
    Location,
    UrlService,
    WINDOW_PROVIDERS,
    UsuarioService,
    AuthGuard,
    RelevadorService,
    PozoService,
    AreaService,
    PermissionService,
    EtapaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
