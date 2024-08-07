import {Component} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AccountingService} from "../services/accounting.service";
import {LoadPdfService} from "../load-pdf.service";
import {ResetService} from "../reset.service";

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrl: './upload-invoice.component.scss'
})
export class UploadInvoiceComponent {

  formData: FormData;
  currentZoom = 1;
  pdfSrc: string = '';
  selectedFile: File | null = null;


  constructor(
    private accountingService: AccountingService,
    private http: HttpClient,
    private loadingService: LoadPdfService,
    private resetService: ResetService
  ) {
    this.formData = new FormData();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.loadingService.sendFile(formData).subscribe({
      next: (response) => {
        this.pdfSrc = `http://localhost:3000/file/${response.name}`;
        this.accountingService.setFile(response.name);
      },
      error: (error) => console.error(error)
    });
  }

  zoomFile() {
    if (this.currentZoom === 1.75) {
      this.currentZoom = 1
    } else {
      this.currentZoom = 1.75
    }
  }

  newPDF() {
    this.pdfSrc = '';
    this.resetService.triggerResetForm();
  }


}
