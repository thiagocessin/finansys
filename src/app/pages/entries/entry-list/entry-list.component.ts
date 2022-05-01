import { EntryService } from './../shared/entry.service';
import { Component, OnInit } from '@angular/core';


import { Entry } from "../shared/entry.model";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {


  entries: Entry[] = [];

  constructor(private entryService:EntryService) { }

  ngOnInit() {

    this.entryService.getAll()
      .subscribe((entries)=>{
        console.log(entries)
        this.entries = entries;},
      (error)=>{
        alert('Erro o inicializar lista')
      });




  }

  deleteEntry(entry:Entry){

    const mustDelete = confirm("Deseja realmente excluir este item?")

    if(mustDelete){
      this.entryService.delete(entry.id)
        .subscribe(
          ()=>this.entries = this.entries.filter(element=> element != entry),
          (error) => alert("erro ao tentar excluir")
        )
    }
  }

}
