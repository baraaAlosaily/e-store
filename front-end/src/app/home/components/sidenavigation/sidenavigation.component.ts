import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { category } from '../../types/categories.type';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent {
  categories!:category[];
  constructor( public categoryService:CategoryService) {
  }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }
}
