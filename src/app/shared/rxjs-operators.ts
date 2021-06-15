//AQUI FICAM OS OPERADORES RXJS QUE FORAM CRIADOS ESPECIALMENTE PARA ESSE PROJETO

//NÃO ESTÁ FUNCIONANDO - linha 11

import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

export function filterResponse<T>(){
    return pipe(
        //filter((event: HttpEvent<T>) => event.type == HttpEventType.Response), //filtra somente o evento de Response (que é type: 4 e representa que o download foi concluído)
        map((res: HttpResponse<T>) => res.body)
    );
}

export function uploadProgress<T>(cb: (progress: number) => void){
    //cb é uma função de callback
    return tap((event: HttpEvent<T>) => {
        if(event.type == HttpEventType.UploadProgress){
            cb(Math.round(event.loaded * 100) / (event.total? event.total:0));
        }
    });
}