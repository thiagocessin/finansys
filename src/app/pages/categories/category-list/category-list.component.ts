import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';


import { Category } from "../shared/category.model";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  categories: Category[] = [];

  constructor(private categoryService:CategoryService) { }

  ngOnInit() {

    this.categoryService.getAll()
      .subscribe((categories)=>{
        this.categories = categories;},
      (error)=>{
        alert('Erro o inicializar lista')
      });




  }

  deleteCategory(category:Category){

    const mustDelete = confirm("Deseja realmente excluir este item?")

    if(mustDelete){
      this.categoryService.delete(category.id)
        .subscribe(
          ()=>this.categories = this.categories.filter(element=> element != category),
          (error) => alert("erro ao tentar excluir")
        )
    }
  }

}
