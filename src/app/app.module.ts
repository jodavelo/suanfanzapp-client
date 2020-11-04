import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import {MainContainerComponent} from './pages/private/home/main-container/main-container.component';
import {SidebarComponent} from './pages/private/home/main-container/sidebar/sidebar.component';
import {SidebarContentComponent} from './pages/private/home/main-container/sidebar/sidebar-content/sidebar-content.component';
import {ChatAreaComponent} from './pages/private/home/main-container/chat-area/chat-area.component';
import {ChatDefaultPageComponent} from './pages/private/home/main-container/chat-area/chat-default-page/chat-default-page.component';
import {ChatRoomComponent} from './pages/private/home/main-container/chat-area/chat-room/chat-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS, MAT_RADIO_DEFAULT_OPTIONS_FACTORY } from "@angular/material/radio";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import { RegisterComponent } from './pages/public/register/register.component';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MainContainerComponent,
    SidebarComponent,
    SidebarContentComponent,
    ChatAreaComponent,
    ChatDefaultPageComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
