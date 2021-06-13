import { Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})

export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeOut){
      setTimeout(() => bsModalRef.hide(), dismissTimeOut);
    }
  }

  //mostra a popup de alerta de erro na operação
  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  //mostra a popup de alerta de sucesso na operação
  showAlertSucces(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  //personaliza e gera uma popup (uma modal) de confirmação genérica 
  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string){
    //cria e personaliza a modal (a popup) de acordo com as informações passadas como parâmetros
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;
    if(okTxt){
      bsModalRef.content.okTxt = okTxt;
    }
    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult; //confirmResult é o Subject que emitiu um evento de true ou false dependendo do botão da popup que foi clicado
  }

}
