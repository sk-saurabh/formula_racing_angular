import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard as Guard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:"banner", component: BannerComponent},//, canActivate : [Guard]},
  { path: "memberdetail", component: MemberDetailsComponent, canActivate : [Guard]},
  { path: "members", component: MembersComponent, canActivate : [Guard]},
  { path:"login", component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes) 
  ],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
