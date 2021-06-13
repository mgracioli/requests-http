import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup; //raiz do formulário
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute //ActivatedRoute contém os parâmetros da rota, assim eu consigo pegar todas as partes da rota, inclusive o id do curso para poder editar ele
  ) {}

  ngOnInit(): void {
    const curso = this.route.snapshot.data['curso'];  //esse curso do data['curso'] tem que ser o mesmo nome lá do resolve do cursos-routing.module

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3),Validators.maxLength(250)]]
    });
    
    /* Não precisa mais desse codigo abaixo porque a rota de guarda "curso-resolver" já está fazendo isso tudo
    //acessa os parâmetros da rota atual (que é a cursosFormComponent), quando eu acessar essa rota pelo botão "Novo curso" o id será undefined, se entrar nessa rota pelo botão "Atualizar" o id será o id do curso respectivo
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))  //o switchMap se desinscreve de um subscribe e se inscreve em outro, devolvendo somente esse último valor emitido, conforme os id vão sendo alterados na página
    )
    .subscribe((curso: any) => this.updateForm(curso));
    */
  }
  /*
  updateForm(curso: any){
    this.form.patchValue({  //o método patchValue é para "setar" o valor dos campos/controles (id e nome) do formulário. Poderia ter usado o método setValue(), poré, o setValue não permite que você altere somente um campo do formulário (só o nome, por exemplo), ele te obriga a alterar todos os campos, já o patchValue permite isso
      id: curso.id,
      nome: curso.nome
    });
  }*/

  hasError(field: string){
    return this.form.get(field)?.errors;  //é aqui que o campo faz a verificação dos validators e informa se tem algum erro no preenchimento desse campo
  }

  onSubmit(){
    this.submitted = true;
    //console.log(this.form.value); //retorna o valor de cada membro do grupo (de cada controle/campo do formulário) no formato chave:valor
    if(this.form.valid){

      let msgSuccess = 'Curso criado com sucesso';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if(this.form.value.id){ //se houver um id na rota é porque eu estou querendo atualizar o curso
        msgSuccess = 'Curso atualizado com sucesso';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe( //o this.form.value representa todo o objeto "curso" ({id: x, nome: 'x'}); lá no cursos.service eu pego só o curso.id
        success => {
          this.modal.showAlertSucces(msgSuccess);
          this.location.back(); //é o mesmo que clicar no botão de voltar do navegador, ou seja, volta para a rota /cursos (cursos-lista.component) que é a rota em que o usuário estava antes de acessar a rota do formulário (a rota /novo); poderia ter usado this.router.navigate(['/cursos']), sendo router: Router (como injeção de dependencia)
        },
        error => {
          this.modal.showAlertDanger(msgError);
        }
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }

}
