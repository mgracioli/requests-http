import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  //envia o(s) arquivo(s) para o servidor - cria um request
  upload(files: Set<File>, url: string){
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    //const request = new HttpRequest('POST', url, formData, );
    return this.http.post(url,formData,{
      observe: "events",
      reportProgress: true  //mostra o progresso do upload no console do navegador
    });
  }

  download(url: string){
    return this.http.get(url, {
      //por padrão, o método get retorna um objeto Json, como o response type, no caso de downloads, não é do tipo Json, e sim, blob (coleção de bytes - porque é um arquivo), precisa indicar quel o tipo de response que eu vou ter e, caso, necessário, "converto" para Json
      responseType: 'blob' as 'json'  //"converte" o tipo blob em um json
    });
  }

  handleFile(res: any, fileName: string){
    //instancia o arquivo (o tipo Blob é uma coleção de bytes), res é a response que, nesse caso, representa o arquivo Excel em formato Json
    const file = new Blob([res], {
      type: res.type
    });

    //Código para IE ()
    if(window.navigator && window.navigator.msSaveOrOpenBlob){
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    //Código para outros navegadores
    //window.URL quer dizer que eu estou pegando a url da própria janela do Browser
    const blob = window.URL.createObjectURL(file);  //cria um link (URL) para o blob (nesse caso o blob é a variável "file") que contém o arquivo, imagem...

    //cria um elemento <a> e seta o parâmetro href dele
    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName; //define o nome do arquivo, pode ser qqer nome que quiser, não precisa ser o mesmo nome do arquivo que está lá na pasta ./uploads
    link.click(); //simula um clique no link do href do elemento <a>
    
    //libera o objeto URL para informar o navegador que não é mais necessário manter a referência para o arquivo.
    window.URL.revokeObjectURL(blob);
    link.remove();

    //Código para Firefox (mais antigos, nos mais novos não precisa)
    //comentar as três últimas linhas de código acima e...
    /* link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })); 

    //no firefox precisa de um delay para fazer o revoke
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100); */
  }
}
