import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    //rota raíz da aplicação
    path: '', 
    pathMatch: 'full', //path: '' é a primeira pagina que vai ser mostrada assim que a página for carregada no browser - pathMatch: full é para que o programa de match na rota vazia; vazio é o prefixo de qualquer rota, então para o programa entender que eu quero a rota raíz (página inicial) do site (rota '/'), tem q colocar o full senão, qualquer rota que eu escolhesse ele poderia redirecionar para qualquer rota; quando o programa detectar o path vazio (' ') (que é o localhost:4200) ele vai redirecionar para a página /upload - isso é para já redirecionar para a página upload automáticamente, para não precisar ficar clicando no item "Upload arquivos" para acessar a página.
    redirectTo: 'upload'  //tudo isso é para 'transformar' o item Cursos (da navbar) na página "inicial"
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
