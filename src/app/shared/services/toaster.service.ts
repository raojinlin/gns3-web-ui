import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToasterService {
  constructor(private snackbar: MatSnackBar) { }

  public error(message: string) {
    this.snackbar.open(message, null, { duration: 2000 });
  }

  public success(message: string) {
    this.snackbar.open(message, null, { duration: 2000 });
  }
}


@Injectable()
export class MockedToasterService {
  public errors: string[];
  public successes: string[];

  constructor() {
    this.errors = [];
    this.successes = [];
  }

  public error(message: string) {
    this.errors.push(message);
  }

  public success(message: string) {
    this.successes.push(message);
  }
}
