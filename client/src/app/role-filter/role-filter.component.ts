import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role-filter',
  templateUrl: './role-filter.component.html',
  styleUrls: ['./role-filter.component.css']
})
export class RoleFilterComponent {

  @Input() activeRole;
  @Output() selectedTags = new EventEmitter();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA, TAB];

  zoneTypeCtrl = new FormControl();
  filteredZoneTypes: Observable<string[]>;
  zoneTypes: string[] = [];
  allZoneTypes: string[] = [];
  @ViewChild('zoneTypeInput') zoneTypeInput: ElementRef<HTMLInputElement>;
  @ViewChild('zoneTypeAuto') zoneTypeMatAutocomplete: MatAutocomplete;

  zoneOwnerCtrl = new FormControl();
  filteredZoneOwners: Observable<string[]>;
  zoneOwners: string[] = [];
  allZoneOwners: string[] = [];
  @ViewChild('zoneOwnerInput') zoneOwnerInput: ElementRef<HTMLInputElement>;
  @ViewChild('zoneOwnerAuto') zoneOwnerMatAutocomplete: MatAutocomplete;

  zoneSubownerCtrl = new FormControl();
  filteredZoneSubowners: Observable<string[]>;
  zoneSubowners: string[] = [];
  allZoneSubowners: string[] = [];
  @ViewChild('zoneSubownerInput') zoneSubownerInput: ElementRef<HTMLInputElement>;
  @ViewChild('zoneSubownerAuto') zoneSubownerMatAutocomplete: MatAutocomplete;

  constructor(private dataService: DataService) {
    this.fetchMetaData();
  }

  fetchMetaData() {
    this.dataService.getTags().subscribe(function(response) {
      // console.log(response);
      response.data.forEach(element => {
        if(this.allZoneTypes.indexOf(element.type) == -1) {
          this.allZoneTypes.push(element.type)
        }
        if(this.allZoneOwners.indexOf(element.owner) == -1) {
          this.allZoneOwners.push(element.owner)
        }
        if(this.allZoneSubowners.indexOf(element.subowner) == -1) {
          this.allZoneSubowners.push(element.subowner)
        }
      });

      this.filteredZoneTypes = this.zoneTypeCtrl.valueChanges.pipe(
        startWith(null),
        map((zoneType: string | null) => this._filter(this.allZoneTypes, this.zoneTypes, zoneType)));
      this.filteredZoneOwners = this.zoneOwnerCtrl.valueChanges.pipe(
        startWith(null),
        map((zoneOwner: string | null) => this._filter(this.allZoneOwners, this.zoneOwners, zoneOwner)));
      this.filteredZoneSubowners = this.zoneSubownerCtrl.valueChanges.pipe(
        startWith(null),
        map((zoneSubowner: string | null) => this._filter(this.allZoneSubowners, this.zoneSubowners, zoneSubowner)));
    }.bind(this));
  }

  add(event: MatChipInputEvent, type: string): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if(type === 'Type' && this.allZoneTypes.indexOf(value.trim()) != -1) {
        this.zoneTypes.push(value.trim());
      } else if(type === 'Owner' && this.allZoneOwners.indexOf(value.trim()) != -1) {
        this.zoneOwners.push(value.trim());
      } else if(type === 'Subowner' && this.allZoneSubowners.indexOf(value.trim()) != -1) {
        this.zoneSubowners.push(value.trim());
      }
    }
    if (input) {
      input.value = '';
    }
    if(type === 'Type') {
      this.zoneTypeCtrl.setValue(null);
    } else if(type === 'Owner') {
      this.zoneOwnerCtrl.setValue(null);
    } else if(type === 'Subowner') {
      this.zoneSubownerCtrl.setValue(null);
    }
    this.selectedTags.emit({
      types: this.zoneTypes,
      owners: this.zoneOwners,
      subowners: this.zoneSubowners
    });
  }

  remove(value: string, type: string): void {
    let removeFrom;
    let resetCtrl;

    if(type === 'Type') {
      removeFrom = this.zoneTypes;
      resetCtrl = this.zoneTypeCtrl;
    } else if(type === 'Owner') {
      removeFrom = this.zoneOwners;
      resetCtrl = this.zoneOwnerCtrl;
    } else if(type === 'Subowner') {
      removeFrom = this.zoneSubowners;
      resetCtrl = this.zoneSubownerCtrl;
    }

    const index = removeFrom.indexOf(value);
    if (index >= 0) {
      removeFrom.splice(index, 1);
    }
    resetCtrl.setValue(null);
    this.selectedTags.emit({
      types: this.zoneTypes,
      owners: this.zoneOwners,
      subowners: this.zoneSubowners
    });
  }

  selected(event: MatAutocompleteSelectedEvent, type: string): void {
    if(type === 'Type') {
      this.zoneTypes.push(event.option.viewValue);
      this.zoneTypeInput.nativeElement.value = '';
      this.zoneTypeCtrl.setValue(null);
    } else if(type === 'Owner') {
      this.zoneOwners.push(event.option.viewValue);
      this.zoneOwnerInput.nativeElement.value = '';
      this.zoneOwnerCtrl.setValue(null);
    } else if(type === 'Subowner') {
      this.zoneSubowners.push(event.option.viewValue);
      this.zoneSubownerInput.nativeElement.value = '';
      this.zoneSubownerCtrl.setValue(null);
    }
    this.selectedTags.emit({
      types: this.zoneTypes,
      owners: this.zoneOwners,
      subowners: this.zoneSubowners
    });
  }

  private _filter(fromValues: string[], selectedValues: string[], value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return fromValues.filter(actualValue => (actualValue.toLowerCase().indexOf(filterValue) === 0) && (selectedValues.indexOf(actualValue) == -1));
  }

}