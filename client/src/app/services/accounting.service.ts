import {Injectable} from '@angular/core';
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  filename: string;
  constructor() { }

  setFile(filename: string) {
    this.filename = filename;
  }

  getFile() {
    return this.filename;
  }

  saveAccounting() {

  }


}
