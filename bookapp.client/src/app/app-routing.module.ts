import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] }, 
  { path: 'book-list', component: BookListComponent,canActivate:[AuthGuard]},
  { path: 'add-book', component: BookFormComponent,canActivate:[AuthGuard] }, 
  { path: 'quote-list', component: QuoteListComponent,canActivate: [AuthGuard] },
  { path: 'edit-book/:id', component: BookFormComponent,canActivate:[AuthGuard] },
  { path: 'quote-form', component: QuoteFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
