import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers:[ProductService]
})
export class ProductsListComponent {
  products = this.productService.getProducts();
  constructor(public productService:ProductService) {}
}
