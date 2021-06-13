import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from './curso';

/*
  ESSE SERVICE SERVIA, INICIALMENTE, PARA FAZER O CRUD DOS CURSOS, NO ENTANTO,
  ELE FOI SUBSTITUIDO PELA CLASSE CRUD-SERVICE QUE FAZ A MESMA
  COISA, PORÉM, DE MODO GENÉRICO, OU SEJA, FAZ O CRUD DE 
  QUALQUER OBJETO QUE EU QUISER (DE UM CURSO, DE UMA AULA, DE UM CARRO...)
*/

@Injectable({
  providedIn: 'root'  //como o provideIn é root, tem q importar o módulo httpClient no app.module, importando lá, eu posso usar esse módulo em qualquer parte do programa
})

export class CursosService {
  //readonly quer dizer que o valor dessa variável nunca poderá ser alterado
  //API contém o endereço para onde serão feitas as requisições http do projeto, esse endereço muda conforme eu estou em ambiente de desenvolvimento ou de produção, para definir esses endereços é lá nos arquivos da pasta environments
  private readonly API = `${environment.API}cursos`;  //${environment.API} será substituido pelo endereço definido lá no arquivo environment.ts (que é: 'http://localhost:3000/'), que é o endereço do nosso simulador de backend

  constructor(private http: HttpClient) { }

  //lista os cursos
  //o método list() retorna um observable (uma stream de dados) do tipo Curso[]
  list(){
    return this.http.get<Curso[]>(this.API);
  }

  //carrega um curso com base no id especificado - serve para preencher o nome do curso no campo do formulário de atualização de curso (depois que clica no botão de atualizar de um curso)
  loadById(id: any){
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1)); //o take emite apenas 1 evento, independente se a requisição der erro ou sucesso, só uma requisição é feita e logo em seguida, o unsubscribe
  }

  //cria um curso - esse método é acessado pelo método save(), por isso é private
  private create(curso: any){
    //API é o endereço para onde a requisição será feita
    return this.http.post(this.API, curso).pipe(take(1)); //o take(1) emite apenas um evento e encerra a inscrição no observable (nesse caso, não tem necessidade de manter a inscrição no observable porque caso dê algum erro na hora de fazer o post, basta clicar no botão de salvar novamente lá no formulário para mandar outra requisição/emitir outro evento). o take(1) só faz uma requisição ao servidor
  }

  //atualiza um curso - esse método é acessado pelo método save(), por isso é private
  private update(curso: any){
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1)); //curso é o novo curso (o que foi digitado pelo usuário), que vai servir para atualizar o antigo; take(1) porque eu só quero tentar fazer essa chamada 1 vez no servidor
  }

  //verifica se eu entrei na rota do formulário pelo botão de "Novo curso" ou pelo botão de "atualizar"
  save(curso: any){
    if(curso.id){
      return this.update(curso);
    }else{
      return this.create(curso);
    }
  }

  //exclui o curso da lista
  remove(id: any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
