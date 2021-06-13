import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

//Implementação de um guarda de rotas:
    //Resolve: carrega dados antes da rota ser ativada
    //CanActivate: define se a rota pode ser acessada pelo usuário

@Injectable({
  providedIn: 'root'
})

export class CursoResolverGuard implements Resolve<Curso> {
  
  constructor(private service: CursosService){ }

  //verifica por qual meio estou acessando a rota, se é pelo botão de criar cruso ou se pelo botão de atualizar curso. Se o id já existir na rota, quer dizer que eu estou querendo atualizar um curso (acessei a rota pelo botão atualizar)
  resolve(route: ActivatedRouteSnapshot): Observable<Curso> {
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({
      id: 0,
      nome: ''
    }); //o operador of retorna um observable a partir de um objeto (faz isso para manter a consistência dos dados porque o método resolve precisa retornar um observable)
  }
    
}
