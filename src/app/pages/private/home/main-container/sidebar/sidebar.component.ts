import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  seedValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  seedData(ev: string): void {
    this.seedValue = ev;
  }
}