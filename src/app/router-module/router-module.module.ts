import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLandingComponent } from '../customer-care/customer-landing/customer-landing.component';
import { IProviderComponent } from '../provider/i-provider/i-provider.component';
import { InsuranceProviderComponent } from '../insurance-provider/insurance-provider/insurance-provider.component';
import { QualityCheckHomeComponent } from '../QC/quality-check-home/quality-check-home.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'HomePage' },
  },
  {
    path: 'home',
    component: CustomerLandingComponent,
    //canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
  },
  {
    path: 'shc',
    component: IProviderComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
  },
  {
    path: 'insuranceProvider',
    component: InsuranceProviderComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
  },
  {
    path: 'qc',
    component: QualityCheckHomeComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'HomePage' },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRouterModule {}
