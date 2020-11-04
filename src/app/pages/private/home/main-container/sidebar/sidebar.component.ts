import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  seedValue: string;

  constructor(
    private authService: AuthService,
    private snackbar:MatSnackBar

  ) {
  }

  ngOnInit(): void {
  }

  seedData(ev: string): void {
    this.seedValue = ev;
  }

  logout(): void {
    this.authService.logout();
    this.openSnackBar("Sesión finalizada");
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackbar.open(message, action, {
      duration: 3000,
    });
  }
}