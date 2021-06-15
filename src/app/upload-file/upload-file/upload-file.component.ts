import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})

export class UploadFileComponent implements OnInit {

  files!: Set<File>;  //o set elimina elementos duplicados na lista
  progress = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  //método que captura o(s) arquvio(s) do upload - executa sempre que a input de upload for modificada, ou seja, sempre que for selecionado algum arquivo
  onChange(event: any){
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    const fileNames = [];

    //console.log(event);

    for(let i=0; i<selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    //reseta a barra de progresso
    this.progress =0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, environment.BASE_URL+'/upload')  //tudo o que é /api na aplicação (environment.BASE_URL == '/api'), não é uma rota mas sim, uma chamada para o back-end - esse /api/upload está sendo usado lá no proxi.conf.js que é um proxy que foi criado para que não dê erro de cross-origin porque eu estou acessando os dados de umdomínio (localhost:4200) a partir de outro domínio (localhost:8000)
      //esse código comentado é para substituir o subscribe abaixo, ele usa operadores rxjs que criamos na classe rxjs-operators.rs porém não consegui fazer funcionar lá na linha 11 
      /* .pipe(
        uploadProgress( progress => {
          this.progress = progress;
        }),
        filterResponse()
      ).subscribe(response => console.log('Upload concluído')); */
      .subscribe((event: HttpEvent<Object>) => {
        //console.log(event);
        //se o download tiver sido concluído... (HttpEventType corresponde ao type: 4 - o HttpEventType tem vários tipos de resposta, cada resposta é um valor, o type 4 quer dizer que o upload foi finalizado, UploadProgress é o type: 1, que quer dizer que o upload está em andamento)
        if(event.type == HttpEventType.Response){
          console.log('Upload concluído');
        }else if(event.type == HttpEventType.UploadProgress){
          const percentDone = Math.round((event.loaded * 100) / (event.total? event.total:0));
          //console.log('progresso: ',percentDone);
          this.progress = percentDone;
        }
      });
    }
  }

  onDownloadExcel(){

  }

  onDownloadPDF(){
    
  }

}
