import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './admin/component/home/home.component';
import {DashboardComponent} from './admin/component/dashboard/dashboard.component';
import {AppAdminComponent} from './admin/component/app-admin/app-admin.component';
import {LoginadminComponent} from './admin/component/loginadmin/loginadmin.component';
import {PageNotFoundComponent} from './util/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'login', component: LoginadminComponent},
      {
        path: 'pages', component: AppAdminComponent,
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'dashboard', component: DashboardComponent},
        ]
      },
      {path: '**', component: PageNotFoundComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
