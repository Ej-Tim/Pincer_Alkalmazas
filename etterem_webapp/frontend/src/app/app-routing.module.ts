import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TablesComponent } from './tables/tables.component'
import { FoodsComponent } from './foods/foods.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'edit/:id', component: UserEditComponent },
  { path: 'add', component: RegisterComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'foods/:id', component: FoodsComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}