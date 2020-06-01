import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ReviewData {
  type: string;
  owner: string;
  subowner: string;
  name: string;
  notes: string;
  userId: string;
  action: string;
  zoneId: string;
  color: string;
}

@Component({
  selector: 'app-zone-review-dialog',
  templateUrl: './zone-review-dialog.component.html',
  styleUrls: ['./zone-review-dialog.component.css']
})
export class ZoneReviewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ZoneReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewData) {}

  editable = false

  ngOnInit() {
    if(this.data.action === 'Update') {
      this.editable = true;
    } else {
      this.editable = false;
    }
  }

  onApprove() {
    this.dialogRef.close('APPROVE');
  }

  onReject() {
    this.dialogRef.close('REJECT');
  }

  onReviewLater() {
    this.dialogRef.close('REVIEW LATER');
  }

  onUpdate() {
    this.dialogRef.close('UPDATE');
  }

  onDelete() {
    this.dialogRef.close('DELETE');
  }

}
