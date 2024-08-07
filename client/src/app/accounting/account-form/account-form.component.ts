import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SaveAndStampComponent} from "../../shared/save-and-stamp/save-and-stamp.component";

import * as htmlToImage from 'html-to-image';
import {HttpClient} from "@angular/common/http";
import { PDFDocument} from "pdf-lib";
import {LoadPdfService} from "../../load-pdf.service";
import {AccountingService} from "../../services/accounting.service";
import {Subscription} from "rxjs";
import {ResetService} from "../../reset.service";


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent  implements OnInit, OnDestroy {
  public accountingForm: FormGroup = this.createForm();
  stamp: HTMLImageElement;
  stampUrl: string;
  filename: string;
  pdfName: string = '';
  private resetSubscription: Subscription;
  invoices: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private loadingService: LoadPdfService,
    private accountingService: AccountingService,
    private resetService: ResetService

  ) {
  }

  ngOnInit() {
    this.resetSubscription = this.resetService.resetFormAction$.subscribe( () => {
      this.accountingForm.reset();
      this.accountings.clear();
      this.pdfName = '';
      this.invoices = [];
    })
  }

  createForm() {
    return this.fb.group({
      compensationReference: [''],
      payDate: ['', [Validators.required]],
      filename: [''],
      accountings: this.fb.array([])
    })
  }

  get accountings() {
    return this.accountingForm.get('accountings') as FormArray
  }

  getAccountings() {
    return (this.accountingForm.get('accountings') as FormArray).controls;
  }

  private createAccounting(): FormGroup {
    return this.fb.group({
      invoice: '',
      soll: '',
      haben: '',
      amount: '',
      tax: '',
    })
  }

  addAccounting() {
    this.accountings.push(this.createAccounting())
  }

  deleteAccounting(id: number) {
    this.accountings.removeAt(id);
  }

  saveAndLoad(accountingForm:FormGroup) {
    this.dialog.open(SaveAndStampComponent, {
      data: {accountingForm},
      width: '300px',
      height: '300px'
    })
  }

  toPng(imageName: string){
    if (this.accountingForm.invalid) {
      alert('invalid');
      return;
    }
    const image = htmlToImage.toPng(document.getElementById('accounting-preview')!)

    image.then( dataUrl => {
      const img = new Image();
      img.src = dataUrl
      this.stampUrl = dataUrl;
      this.stamp = img;

      const link = document.createElement('a');
      const textnode = document.createTextNode('Load');
      link.appendChild(textnode);
      link.download = `${imageName}.png`;
      link.href = dataUrl;

      this.filename = this.accountingService.getFile();
      const filePath = `http://localhost:3000/file/${this.filename}`;
      this.loadingService.getFile(filePath).subscribe(async (blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        await this.addImageToPdf(arrayBuffer)
      })
    })

  }

  async addImageToPdf(pdfBuffer: ArrayBuffer) {
    // Load a PDFDocument from the existing PDF buffer
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Embed the image into the PDF. Assuming the image is in PNG format
    // For example, let's say you have the image as a base64 string
    const imageUrl = this.stampUrl; // Your image base64
    const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const pngDims = image.scale(0.5)

    // Add the image to the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    // Position (x, y) and size (width, height) for the image
    firstPage.drawImage(image, {
      x: 50,
      y: 70,
      width: pngDims.width,
      height: pngDims.height
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Do something with the modified PDF (e.g., download or display it)
    // This step depends on your specific requirements
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    this.generatePdfName();

    link.download = `${this.pdfName}.pdf`;
    link.click();
  }

  generatePdfName() {
    this.getAccountings().forEach((invoice, index) => {
      if (!this.invoices.includes(invoice.get('invoice')?.value)) {
        this.invoices.push(invoice.get('invoice')?.value);
      }
    })
    this.pdfName = this.accountingForm.get('filename')?.value === '' || this.accountingForm.get('filename')?.value === null ? `worldline_${this.accountingForm.get('payDate')!.value}_${this.invoices.join('_')}` : this.accountingForm.get('filename')!.value;
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }

}
