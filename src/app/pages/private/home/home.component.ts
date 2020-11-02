import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    
  }

}
