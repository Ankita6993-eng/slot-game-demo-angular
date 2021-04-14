import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {SlotGameHomeComponent} from './slot-game-home/slot-game-home.component';
import {AuthGuard} from './gurds/auth.guard'

const routes: Routes = [
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login',component:LoginComponent
  },
  { path: '', component: SlotGameHomeComponent, canActivate: [AuthGuard] },
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
