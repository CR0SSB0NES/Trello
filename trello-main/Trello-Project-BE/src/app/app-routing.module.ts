import { LoginComponent, SignupComponent } from './login/login.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { NgModule } from '@angular/core';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { BoardDetailsScreenComponent } from './board-details-screen/board-details-screen.component'
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path:'', redirectTo:"/login", pathMatch:'full'},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "home-screen/:user", component: HomeScreenComponent },
  // { path: "home-screen/board-details/:boardName/:boardId", component: BoardDetailsScreenComponent },
  { path: "board-details/:boardName", component: BoardDetailsScreenComponent },
  { path: "**", component: ErrorPageComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
