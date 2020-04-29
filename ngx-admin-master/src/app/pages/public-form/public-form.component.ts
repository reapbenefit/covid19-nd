import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { AdminService } from './../../service/admin.service';

@Component({
  selector: 'ngx-public-form',
  templateUrl: './public-form.component.html',
  styleUrls: ['./public-form.component.scss']
})
export class PublicFormComponent implements OnInit {

  category = ['Cat_1', 'Cat_2', 'Cat_3', 'Cat_4','Cat_5'];
  sub_category = ['sub_Cat_1', 'sub_Cat_2', 'sub_Cat_3', 'sub_Cat_4', 'sub_Cat_5'];
  city = ['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  ward = ['Ward_1', 'Ward_2', 'Ward_3'];
  latitude: any;
  longitude: any;

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  public_data = new FormGroup({
    place_org_id: new FormControl(''),
    place_org_name : new FormControl('', Validators.required),
    place_org_address : new FormControl('', Validators.required),
    place_org_lat: new FormControl(''),
    place_org_long: new FormControl(''),
    pol_locale_id: new FormControl(''),
    place_org_category : new FormControl('', Validators.required),
    place_org_sub_category : new FormControl('', Validators.required),
    ward_id : new FormControl('', Validators.required),
    ac_id: new FormControl(''),
    city_id : new FormControl('', Validators.required),
    place_org_person_incharge: new FormControl(''),
    place_org_number: new FormControl('',[Validators.maxLength(10)]),
    place_org_jurisdiction: new FormControl(''),
    info : new FormControl('', Validators.required),
    impact: new FormControl(''),
    flagged_as_erronous : new FormControl(''),
    logical_delete: new FormControl(''),
  });


  onFormSubmit(){
    this.public_data.patchValue({
      place_org_lat: this.latitude,
      place_org_long: this.longitude
    });
    this.AdminService.publicDataFormSubmit(this.public_data.value).subscribe((response)=>{
      console.log(response);
    });
  }

    // get Users Location
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
