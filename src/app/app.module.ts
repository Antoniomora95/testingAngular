import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicosComponent } from './intermediate/espias/medicos.component';
import { MedicoComponent } from './intermediate2/medico/medico.component';
import { HospitalComponent } from './intermediate2/hospital/hospital.component';
import { IncrementadorComponent } from './intermediate2/incrementador/incrementador.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './advanced/routes/app.routes';
import { NavbarComponent } from './advanced/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RoutermedicoComponent } from './advanced/routermedico/routermedico.component';
import { DirectiveComponent } from './advanced/directive/directive.component';
import { InputDirective } from './advanced/directive/input.directive';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    MedicoComponent,
    HospitalComponent,
    IncrementadorComponent,
    NavbarComponent,
    RoutermedicoComponent,
    DirectiveComponent,
    InputDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
