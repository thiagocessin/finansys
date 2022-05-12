import { Injector, Injectable } from '@angular/core';
import { BaseResouceService } from 'src/app/shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import {Observable} from 'rxjs';

import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResouceService<Entry>{

  constructor(protected injector: Injector,
              private categoryService: CategoryService) {
        super("api/entries", injector)
   }


   create(entry:Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId)
      .pipe(
        flatMap(category => {
          entry.category = category;
          return super.create(entry);
        })
      )

   }

   //alterar flatMaps quando usar backend real
   update(entry:Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId)
      .pipe(
        flatMap(category =>{
          entry.category = category;
            return super.update(entry);
        })
      )

  }

  protected jsonDataToResources(jsonData: any[]): Entry[]{
      const entries: Entry[] = [];
      jsonData.forEach(element => {

        entries.push(Object.assign(new Entry(),element))

      });

      return entries;
   }

   protected jsonDataToResource(jsonData:any){
    return Object.assign(new Entry(),jsonData)
   }


  }
