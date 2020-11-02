import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public wsService: WebsocketService,
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.sendMessage( 'Prueba para verificar si envia el mensaje desde angular al servidor con sockets' );
  }

}
