import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { categories,subCategories } from '../mock/categories.data'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(){
    return categories;
  }

  getSubCategory(categoryId:number){
    return subCategories.filter(subCategory=>subCategory.parent_category_id===categoryId);
  }
}
