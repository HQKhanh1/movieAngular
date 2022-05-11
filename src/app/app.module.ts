import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './admin/component/header/header.component';
import {SidenavComponent} from './admin/component/sidenav/sidenav.component';
import {MovieComponent} from './admin/component/movie/movie.component';
import {DashboardComponent} from './admin/component/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {LoginadminComponent} from './admin/component/loginadmin/loginadmin.component';
import {AppAdminComponent} from './admin/component/app-admin/app-admin.component';
import {PageNotFoundComponent} from './util/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MovieChildComponent } from './admin/component/movie-child/movie-child.component';
import { AddMovieComponent } from './admin/component/add-movie/add-movie.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorComponent } from './util/paginator/paginator.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MovieComponent,
    DashboardComponent,
    LoginadminComponent,
    AppAdminComponent,
    PageNotFoundComponent,
    MovieChildComponent,
    AddMovieComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
