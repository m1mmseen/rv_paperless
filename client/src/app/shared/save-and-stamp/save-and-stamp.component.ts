import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {AccountingService} from "../../services/accounting.service";

@Component({
  selector: 'app-save-and-stamp',
  templateUrl: './save-and-stamp.component.html',
  styleUrl: './save-and-stamp.component.scss'
})
export class SaveAndStampComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveAndStampComponent>,
    @Inject(MAT_DIALOG_DATA) public accountingForm: FormGroup,
    private accountingService: AccountingService
  ) {
  }

  saveAndLoad() {
    console.log('Saved: \n', this.accountingForm);
    this.accountingService.saveAccounting();
  }
}
