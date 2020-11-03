import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/shared/services/chat.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testchat',
  templateUrl: './testchat.component.html',
  styleUrls: ['./testchat.component.scss']
})
export class TestchatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription: Subscription;

  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public wsService: WebsocketService,
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {
      console.log(msg);
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){
    if( this.texto.trim().length === 0 ){
      return;
    }
    console.log( this.texto );
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
