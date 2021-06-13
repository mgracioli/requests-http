import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  entryComponents: [  //entryComponents é para informar que essa classe vai ser utilizada em tempo de execução (vai ser chamada enquanto o programa estiver rodando - quando clicar em algum botão) e, nao, dentro de um template (usando uma tag, por exemplo)
    AlertModalComponent,
    ConfirmModalComponent
  ]
})

export class SharedModule { }
