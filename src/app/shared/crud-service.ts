import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";

export class CrudService<T> {
  //API_URL contém o endereço para onde serão feitas as requisições http do projeto, esse endereço muda conforme eu estou em ambiente de desenvolvimento ou de produção, para definir esses endereços é lá nos arquivos da pasta environments
  constructor(protected http: HttpClient, private API_URL: any) { }

  //lista os records
  //o método list() retorna um observable (uma stream de dados) do tipo record[]
  //T[] pois como essa classe é genérica, eu posso passar qualquer tipo de objeto para fazer o crud
  list(){
    return this.http.get<T[]>(this.API_URL);
  }

  //carrega um record/registro com base no id especificado - serve para preencher o nome do record no campo do formulário de atualização de record (depois que clica no botão de atualizar de um record)
  loadById(id: any){
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1)); //o take emite apenas 1 evento, independente se a requisição der erro ou sucesso, só uma requisição é feita e logo em seguida, o unsubscribe
  }

  //cria um record/registro - esse método é acessado pelo método save(), por isso é private
  private create(record: any){
    //API é o endereço para onde a requisição será feita
    return this.http.post(this.API_URL, record).pipe(take(1)); //o take(1) emite apenas um evento e encerra a inscrição no observable (nesse caso, não tem necessidade de manter a inscrição no observable porque caso dê algum erro na hora de fazer o post, basta clicar no botão de salvar novamente lá no formulário para mandar outra requisição/emitir outro evento). o take(1) só faz uma requisição ao servidor
  }

  //atualiza um record/registro - esse método é acessado pelo método save(), por isso é private
  private update(record: any){
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1)); //record é o novo record (o que foi digitado pelo usuário), que vai servir para atualizar o antigo; take(1) porque eu só quero tentar fazer essa chamada 1 vez no servidor
  }

  //verifica se eu entrei na rota do formulário pelo botão de "Novo record" ou pelo botão de "atualizar"
  save(record: any){
    if(record.id){
      return this.update(record);
    }else{
      return this.create(record);
    }
  }

  //exclui o record da lista
  remove(id: any){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}
