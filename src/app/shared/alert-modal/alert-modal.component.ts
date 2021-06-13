import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})

//ESSA É UMA MODAL (POPUP) DE ALERTA DE ERRO OU SUCESSO EM DETERMINADA OPERAÇÃO

export class AlertModalComponent implements OnInit {

  @Input() message!: string;
  @Input() type!: 'succes';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
