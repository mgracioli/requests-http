import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

//ESSA MODAL É UMA POPUP DE CONFIRMAÇÃO GENÉRICA QUE PODE SER GERADA/FORMATADA DE ACORDO COM A MINHA NECESSIDADE

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  //as input properties levam dados daqui do componente para o template (para os elementos html)
  @Input() title!: string;  //titulo da popup
  @Input() msg!: string;  //corpo da popup
  @Input() cancelTxt!: 'Cancelar';  //Texto do botão de cancelar/não...
  @Input() okTxt!: 'Sim';  //texto do botão de ok/sim...
  //os Subjects trazem/emitem dados do template (dos elementos html) para cá (para o componente). Nesse caso, confirmResult está servindo para ouvir os botões da popup, para saber qual dos dois botões foi clicado, se o botão de confirmação for clicado, retorna "true" para cá, senão, retorna false.
  confirmResult!: Subject<boolean>  //o subject é um objeto que emite valores, esses valores podem ser ouvidos por um observable

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  //lógica do botão de cancelar/não... da popup
  onClose(){
    this.confirmAndClose(false);
  }

  //lógica do botão de sim/ok/confirmar... da popup
  onConfirm(){
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(value); //caso clique no botão de confirmação, emite um evento "true", caso contrário, emite "false", esse evento vai ser ouvido lá no alert-modal.service
    this.bsModalRef.hide(); //esconde a popup
  }

}
