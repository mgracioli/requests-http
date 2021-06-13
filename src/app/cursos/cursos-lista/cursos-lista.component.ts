import { Component, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})

export class CursosListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;  //@ViewChild é para fazer referência a um componente lá do html
  deleteModalRef!: BsModalRef;
  cursos$!: Observable<Curso[]>; //o $ é para indicar que essa variável é um observable
  error$ = new Subject<boolean>();  //subject é um objeto que emite eventos (é um observable)
  cursoSelecionado!: Curso;

  constructor(private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  //faz uma requisição GET sempre que essa rota (cursos-lista.component) for ativada
  onRefresh(){
    this.cursos$ = this.service.list() //o método list faz uma requisição http do tipo GET, ou seja, retorna uma lista com todos os cursos cadastrados no banco de dados
    .pipe(
      //esse código só vai ser executao caso haja um erro na hora de obter a lista de cursos cadastrados no bd
      catchError(error => {
        console.error(error);
        //this.error$.next(true); //faz o observable error$ emitir um evento com o valor true
        this.handleError();
        return EMPTY; //EMPTY é o mesmo que empty(), porém, este último está depreciado
      })
    );
  }

  handleError(){
    this.alertService.showAlertDanger("Erro ao carregar a lista de cursos");
  }

  //direciona para a rota do formulário de edição do curso ao clicar no botão "Atualizar"
  onEdit(id: any){
    this.router.navigate(['cursos/editar',id]);
  }

  //chama o confirm-modal.service para gerar a popup de confirmação da exclusão de curso ao clicar no botão "Remover"
  onDelete(curso: any){
    this.cursoSelecionado = curso;
    //result é um Subject (é como um observable)
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover o curso?','Sim','Não');  //showConfirm retorna um Subject que é um elemento que emite eventos, assim como um observable
    //Ouve a resposta (o Subject) que o método showConfirm retornou (showConfirm está em alert-modal.service)
    //asObservable() cria um observable a partir de um Subject para que eu possa ouvir a resposta desse Subject
    result$.asObservable()
    .pipe(  
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY) //verifica se o evento (a stream de dados) emitido por result$ foi true ou false; tem que usar o switchMap porque eu estou trabalhando com dois observables: primeiro analiso a resposta (a stream de dados) do observable result$ (se foi true ou false) e retorno um outro observable (que é o retorno do método remove(), que faz uma requição http do tipo DELETE) caso result$ seja true ou retorno um observable EMPTY caso a resposta de result$ seja false; EMPTY é o mesmo que enpty(), ele retorna um observable vazio (empty() está depreciado) 
    )
    .subscribe(
      success => {
        this.onRefresh(); //atualiza a página de cursos para, assim, o programa atualizar a lista de cursos
      },
      error => {
        this.alertService.showAlertDanger("Erro ao remover curso")
      }
    );  //o subscribe só é executado se o resultado do switchMap for true, se for false (caso em que retorna EMPTY), o subscribe não é realizado
  }
/*
  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe( //não precisa fazer o unsubscribe pq lá no método remove() já tem o take(1) que faz apenas uma requisição ao servidor e já se desinscreve
      success => {
        this.onRefresh(); //atualiza a página de cursos para, assim, o programa atualizar a lista de cursos
        this.deleteModalRef.hide(); //esconde a popup     
      },
      error => {
        this.alertService.showAlertDanger("Erro ao remover curso")
        this.deleteModalRef.hide(); //esconde a popup 
      }
    );
  }

  //fecha a popup caso não queira deletar o curso
  onDeclineDelete(){
    this.deleteModalRef.hide(); //esconde a popup
  }
*/
}
