import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  seedValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  seedData(ev: string): void {
    this.seedValue = ev;
  }
}