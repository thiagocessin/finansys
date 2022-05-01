import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { Entry } from "../shared/entry.model";
import { EntryService } from '../shared/entry.service';

import toastr from "toastr";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string; //editando ou criando 'new' ou 'edit'
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages : string [] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(private entryService: EntryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.locadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }


  submitForm(){

    this.submittingForm = true;

    if(this.currentAction == "new"){
      this.createEntry();
    }else{
      this.updateEntry();
    }

  }



  //private methods


  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
    .subscribe((entry)=> this.actionsForSuccess(entry),
    (error)=> this.actionsForError(error))
  }



  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
      .subscribe((entry)=> this.actionsForSuccess(entry),
      (error)=> this.actionsForError(error))

  }

  private actionsForError(error: any): void {

    toastr.error("Ocorreu um erro ao processar a sua solicitação");
    this.submittingForm = false;

    //unprocessable entity
    if(error.status == 422){
      //this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor"]
    }
  }


  private actionsForSuccess(entry: Entry): void {

    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl("entries",{skipLocationChange:true})//não salva no navegador
    .then(
      ()=> this.router.navigate(["entries",entry.id, "edit"])
    );

  }

  private setPageTitle() {
    if(this.currentAction == 'new') this.pageTitle = 'Cadastro de Novo Lançamento';
    else {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }


  }

  private locadEntry() {
    if(this.currentAction == 'edit'){
      this.route.paramMap.pipe(// recuperando ID enviado pela URL
        switchMap(params => this.entryService.getById(+params.get("id")))//switch map traz sempre o último "switch to a new observable", quando os resultados anteriores não interessam
      )
      .subscribe((entry)=>{
        this.entry = entry;
        this.entryForm.patchValue(entry);//bind loaded entry to a EntryForm
      },
      (error)=> alert('Erro no servidor'))
    }

  }
  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]

    })
  }
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';

  }





}
