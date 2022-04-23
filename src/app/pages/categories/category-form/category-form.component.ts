import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { Category } from "../shared/category.model";
import { CategoryService } from '../shared/category.service';

import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string; //editando ou criando 'new' ou 'edit'
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages : string [] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.locadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  //private methods

  private setPageTitle() {
    if(this.currentAction == 'new') this.pageTitle = 'Cadastro de Nova Categoria';
    else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }


  }

  private locadCategory() {
    if(this.currentAction == 'edit'){
      this.route.paramMap.pipe(// recuperando ID enviado pela URL
        switchMap(params => this.categoryService.getById(+params.get("id")))//switch map traz sempre o último "switch to a new observable", quando os resultados anteriores não interessam
      )
      .subscribe((category)=>{
        this.category = category;
        this.categoryForm.patchValue(category);//bind loaded category to a CategoryForm
      },
      (error)=> alert('Erro no servidor'))
    }

  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name:[null, [Validators.required, Validators.minLength(2)]],
      description: [null]

    })
  }
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';

  }





}
