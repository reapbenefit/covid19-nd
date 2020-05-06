//Form Component for public_data_place_org_table

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../../service/admin.service';
import { Category } from './public-form.category';
import { subCategory } from './public-form.subcategory';
@Component({
  selector: 'ngx-public-form',
  templateUrl: './public-form.component.html',
  styleUrls: ['./public-form.component.scss']
})
export class PublicFormComponent implements OnInit {
  selectedCategory: Category = new Category('');
  categories: Category[];
  subCategories: subCategory[];
  userLocation: any;
  displayMessageModal: boolean = false;
  displayLocationModal: boolean = false;
  modalMessage: any = '';

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.categories = this.AdminService.getCategories();
  }

  //Function to fetch Sub Categories of Categories
  onSelect(category) {
    this.subCategories = this.AdminService.getsubCategories().filter((item) => item.category == category);
  }

  //Function to Display the Location Picker in Modal
  showLocationModal() {
    this.displayLocationModal = true;
  }

  public_data = new FormGroup({
    place_org_id: new FormControl(''),
    place_org_name: new FormControl('', Validators.required),
    place_org_address: new FormControl('', Validators.required),
    place_org_lat: new FormControl('', Validators.required),
    place_org_long: new FormControl('', Validators.required),
    pol_locale_id: new FormControl(''),
    place_org_category: new FormControl('', Validators.required),
    place_org_subcategory: new FormControl('', Validators.required),
    ward_id: new FormControl(''),
    ac_id: new FormControl(''),
    city_id: new FormControl('', Validators.required),
    place_org_person_incharge: new FormControl(''),
    place_org_number: new FormControl('', [Validators.required, Validators.minLength(10)]),
    place_org_jurisdiction: new FormControl(''),
    info: new FormControl('', Validators.required),
    impact: new FormControl(''),
    flagged_as_erronous: new FormControl(''),
    logical_delete: new FormControl(''),
  });


//Function to Get WardId using Location and Calling Further Function to Submit Data into DB
  onFormSubmit() {

    this.userLocation = {
      lat: this.public_data.value.place_org_lat,
      long: this.public_data.value.place_org_long,
    };
    this.AdminService.getWardId(this.userLocation).subscribe((response) => {
      let wardId = response['data'][0].name.slice(5); //To Remove String Ward from name
      this.public_data.patchValue({
        ward_id: wardId,
        pol_locale_id: '154',

      });
      this.addResponseToDB();
    });
  }

  //Function to Submit Form Response to DB 
  addResponseToDB() {
    this.AdminService.publicDataFormSubmit(this.public_data.value).subscribe((response) => {
      if (response['insertId']) {
        this.modalMessage = `Submitted Successfully! (Insert ID: ${response['insertId']})`;
        this.displayMessageModal = true;
      } else {
        this.modalMessage = `Submit Failed!`;
        this.displayMessageModal = true;
      }

      this.public_data.reset({ city_id: '', place_org_category: '' });

    });

  }

  //Function to Close Response Modal
  hideModal() {
    this.displayMessageModal = false;
  }

  //Function to Close Location Picker Modal
  hideLocationPickerModal(pickerLocation) {
    this.public_data.patchValue({
      place_org_lat: pickerLocation.lat,
      place_org_long: pickerLocation.long,

    });
    this.displayLocationModal = false;
  }
}
