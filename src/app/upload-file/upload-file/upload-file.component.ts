import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})

export class UploadFileComponent implements OnInit {

  files!: Set<File>;  //o set elimina elementos duplicados na lista

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  //método que captura o(s) arquvio(s) do upload
  onChange(event: any){
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    const fileNames = [];

    //console.log(event);

    for(let i=0; i<selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, environment.BASE_URL+'/upload')  //tudo o que é /api na aplicação (environment.BASE_URL == '/api'), não é uma rota mas sim, uma chamada para o back-end - esse /api/upload está sendo usado lá no proxi.conf.js que é um proxy que foi criado para que não dê erro de cross-origin porque eu estou acessando os dados de umdomínio (localhost:4200) a partir de outro domínio (localhost:8000)
      .subscribe(response => console.log('Upload concluído'));
    }
  }

}
