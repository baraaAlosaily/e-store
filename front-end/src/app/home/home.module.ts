import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CatnavigationComponent,HeaderComponent,HomeComponent,NotFoundPageComponent, SidenavigationComponent, ProductsListComponent, ProductComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
