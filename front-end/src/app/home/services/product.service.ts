import { Injectable } from '@angular/core';
import { products } from '../mock/product.data';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts(){
    return products;
  }
}
