import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { FormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    FormsModule,
  ]
})
export class CategoriesModule { }
