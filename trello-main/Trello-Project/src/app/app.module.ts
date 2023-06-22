import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { BoardPopupComponent } from './board-popup/board-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BoardDetailsScreenComponent } from './board-details-screen/board-details-screen.component';
import { CardPopupComponent, LabelPopupComponent, ChecklistPopupComponent } from './card-popup/card-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditCardPopupComponent } from './card-popup/card-popup.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavBarsComponent } from './nav-bars/nav-bars.component';
import { SideNavBarComponent } from './nav-bars/nav-bars.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CoverComponent } from './card-popup/card-popup.component';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  schemas:[],
  declarations: [
    AppComponent,
    HomeScreenComponent,
    BoardPopupComponent,
    BoardDetailsScreenComponent,
    CardPopupComponent,
    EditCardPopupComponent,
    LabelPopupComponent,
    ChecklistPopupComponent,
    LoginComponent,
    NavBarsComponent,
    SideNavBarComponent,
    ErrorPageComponent,
    CoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatSidenavModule,
    CommonModule,
    DragDropModule,
    MatProgressBarModule,
    HttpClientModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
