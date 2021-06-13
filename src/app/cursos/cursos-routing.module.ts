import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursoResolverGuard } from './guards/curso-resolver.guard';

const routes: Routes = [
  { 
    //faz o lazy loading desse path. Lazy loading is the process of loading components, modules, or other assets of a website as required.
    path: '', component: CursosListaComponent //carrega o componente CursosListaComponent
  },
  { path: 'novo', component: CursosFormComponent,
    resolve: {  //o resolve vai executar o guarda de rota (cursos-resolver) antes de carregar a página (antes de carregar o cursosFormComponent)
      curso: CursoResolverGuard
    }
  },
  { path: 'editar/:id', component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CursosRoutingModule { }