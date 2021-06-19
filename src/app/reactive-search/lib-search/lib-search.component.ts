import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'; //readonly para que o valor nao possa ser alterado
  results$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  //busca reativa dos nomes dos cursos, ou seja, vai fazendo a busca conforme vai digitando na input
  ngOnInit(): void {
    //a propriedade valueChanges retorna um observable que emite um evento cada vez que o conteúdo de queryField é alterado
    //cada vez que o valor da input "queryField" mudar, será feita uma chamada http, para evitar fazer muitas chamadas usa-se os filtros, o trim...
    this.results$ = this.queryField.valueChanges
    .pipe(
      filter(value => value.length > 1),  //só começa a fazer as chamadas http quando o tamanho da string digitada for > 1
      debounceTime(200),  //emite um evento a cada 200ms, isso serve para que não seja feita uma requisição a cada letra digitada
      distinctUntilChanged(), //só faz a chamada quando o valor digitado for diferente do ultimo valor digitado. Por ex. se for digitada uma palavra seguida de vários espaços, não será emitido o evento até que seja digitado algum outro valor, isso evita que seja feita uma chamada cada vez que se digita um espaço em branco
      map(value => value.trim()),  //o método trim é usado para remover os espaços digitados
      //tap(value => console.log(value)), //só para debug
      //o switchMap gera um novo observable apenas com o último evento emitido, cancelando os eventos emitidos anteriormente
      switchMap(value => this.http.get(this.SEARCH_URL,{
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      //o que o "tap" está recebendo é um objeto com os pares chave:valor do tipo = "results":"valor", "total":"valor", "available":"valor" - olhar em: https://api.cdnjs.com/libraries?fields=name,description,version,homepage&search=angular
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    );
  }

  //busca não reativa dos nomes dos cursos, ou seja, só faz a busca quando clicar no botão
  //não precisaria desse código já que está sendo feita a busca reativa
  onSearch(){
    let value = this.queryField.value;
    const fields = 'name,description,version,homepage';

    //trim remove espaços vazios no inicio e no fim de uma string
    if(value && (value = value.trim()) !== ''){

      //esse params_ funcionam também, é so mais uma forma de fazer a mesma coisa que está abaixo em "params"
      /* const params_ = {
        fields: fields,
        search: value
      } */

      let params = new HttpParams();
      params = params.set('fields', fields);
      params = params.set('search', value);  

      //como eu estou atribuindo o resultado do observable a uma variável (results$), não precisa fazer subscribe, eu uso, daí, o pipe async lá no html
      this.results$ = this.http
      .get(this.SEARCH_URL, { params }) //params são os parâmetros da miinha URL caso ela tenha algum parâmetro (nesse caso, tem os parâmetros search e fields). O proprio angular sabe montar a URL com os parâmetros que eu passar para ele
      .pipe(
        tap((res: any) => this.total = res.total),  //res é a response que o servidor vai me enviar após eu fazer a chamada get para o endereço "SEARCH_URL" (nesse caso, ele retorna vários objetos compostos pelos pares chave:valor do tipo = {"total":"valor", "results":"valor"} )
        map(res => res.results)
      );
    }
  }

}
