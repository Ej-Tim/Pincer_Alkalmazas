import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { TablesComponent } from './tables/tables.component';
import { FoodsComponent } from './foods/foods.component';
import { AppetizersComponent } from './appetizers/appetizers.component';
import { ChefComponent } from './chef/chef.component';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent,
    OrdersComponent,
    TablesComponent,
    FoodsComponent,
    AppetizersComponent,
    ChefComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    SidebarModule,
    SelectButtonModule,
    TabMenuModule,
    SpinnerModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
