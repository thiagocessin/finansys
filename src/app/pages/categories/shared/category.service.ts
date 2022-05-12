import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { BaseResouceService } from 'src/app/shared/services/base-resource.service';
import {Category} from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResouceService<Category>{
  constructor(protected injector: Injector) {
    super("api/categories",injector);
  }

}
