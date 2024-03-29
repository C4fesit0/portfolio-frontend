//Modulos
import { LOCALE_ID ,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { CardExperienceComponent } from './components/card-experience/card-experience.component';
import { CardProjectComponent } from './components/card-project/card-project.component';
import { ButtonComponent } from './components/button/button.component';
import { ProjectTagComponent } from './components/card-project/project-tag/project-tag.component';
import { CardSkillsComponent } from './components/card-skills/card-skills.component';
import { CardEducationComponent } from './components/card-education/card-education.component';
import { ExperienceComponent } from './components/card-experience/experience/experience.component';
import { EducationComponent } from './components/card-education/education/education.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { MainComponent } from './components/main/main.component';
import { EditModalComponent } from './components/card-experience/edit-modal/edit-modal.component';
import { EditEducationModalComponent } from './components/card-education/edit-education-modal/edit-education-modal.component';
import { EditSkillComponent } from './components/card-skills/edit-skill/edit-skill.component';
import { SkillComponent } from './components/card-skills/skill/skill.component';
import { ProjectComponent } from './components/card-project/project/project.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardProfileComponent,
    CardExperienceComponent,
    CardProjectComponent,
    ButtonComponent,
    ProjectTagComponent,
    CardSkillsComponent,
    CardEducationComponent,
    ExperienceComponent,
    EducationComponent,
    LoginFormComponent,
    MainComponent,
    EditModalComponent,
    EditEducationModalComponent,
    EditSkillComponent,
    SkillComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
