import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TablesComponent } from './tables/tables.component'
import { FoodsComponent } from './foods/foods.component';
import { OrdersComponent } from './orders/orders.component';
import { AppetizersComponent } from './appetizers/appetizers.component';
import { ChefComponent } from './chef/chef.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user', component: UserListComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'edit/:id', component: UserEditComponent },
  { path: 'add', component: RegisterComponent },
  { path: 'tables', component: TablesComponent },
  { path: ':id/foods', component: FoodsComponent, children: [
    {
      path:'',
      redirectTo: '1',
      pathMatch: 'full' 
    },
    {
      path: ':cat_id', component: AppetizersComponent,
    }
  ]},
  { path: 'orders', component: OrdersComponent, children: [
    {
      path: ':table_id', component: ChefComponent
    }
  ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
