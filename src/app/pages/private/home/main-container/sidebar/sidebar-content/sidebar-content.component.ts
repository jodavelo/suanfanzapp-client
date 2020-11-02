import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  seedValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  seedData(ev: string): void {
    this.seedValue = ev;
  }
}