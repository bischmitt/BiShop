
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  notify(msg: string){
    this.snackbar.open(msg, undefined, {duration: 4000, panelClass: ['pink-snackbar']})
  }
}
