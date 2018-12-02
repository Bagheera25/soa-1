import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './core/guards/is-logged-out.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    // canActivate: [IsLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
