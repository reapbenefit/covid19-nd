import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  tags: any;
  type: string;
  owner: string;
  subowner: string;
  name: string;
  notes: string;
  userId: string;
  tagId: number;
}

@Component({
  selector: 'app-zone-details-dialog',
  templateUrl: './zone-details-dialog.component.html',
  styleUrls: ['./zone-details-dialog.component.css']
})
export class ZoneDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ZoneDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close('Cancel');
  }

  onSaveClick() {
    this.dialogRef.close('Save');
  }

  onSubmitClick() {
    this.dialogRef.close('Submit');
  }

  zoneTypeChanged(event) {
    this.data.owner = undefined;
    this.data.subowner = undefined;
    this.data.tagId = undefined;
  }

  zoneOwnerChanged(event) {
    this.data.subowner = undefined;
    this.data.tagId = undefined;
  }

  zoneSubOwnerChanged(event, tagId) {
    let selectedType = this.data.tags.find(t => t.type == this.data.type);
    let selectedOwner = selectedType.owners.find(o => o.owner == this.data.owner);
    let selectedSubowner = selectedOwner.subowners.find(s => s.subowner == this.data.subowner);
    this.data.tagId = selectedSubowner.id;
  }

}