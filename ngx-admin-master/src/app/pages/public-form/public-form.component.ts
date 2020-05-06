import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
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
  category = ['Cat_1', 'Cat_2', 'Cat_3', 'Cat_4', 'Cat_5'];
  sub_category = ['sub_Cat_1', 'sub_Cat_2', 'sub_Cat_3', 'sub_Cat_4', 'sub_Cat_5'];
  latitude: any;
  longitude: any;
  userLocation: any;
  displayMessageModal: boolean = false;
  modalMessage: any = '';
  

 

  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.categories = this.AdminService.getCategories();
    // this.onSelect(this.selectedCategory.name);
  }

  onSelect(category) {
    this.subCategories = this.AdminService.getsubCategories().filter((item) => item.category == category);
  }

  public_data = new FormGroup({
    place_org_id: new FormControl(''),
    place_org_name : new FormControl('', Validators.required),
    place_org_address : new FormControl('', Validators.required),
    place_org_lat: new FormControl('12.955531',Validators.required),
    place_org_long: new FormControl('77.700306', Validators.required),
    pol_locale_id: new FormControl('154'),
    place_org_category : new FormControl('', Validators.required),
    place_org_subcategory : new FormControl('', Validators.required),
    ward_id : new FormControl(''),
    ac_id: new FormControl(''),
    city_id : new FormControl('', Validators.required),
    place_org_person_incharge: new FormControl(''),
    place_org_number: new FormControl('',[Validators.required,Validators.minLength(10)]),
    place_org_jurisdiction: new FormControl(''),
    info : new FormControl('', Validators.required),
    impact: new FormControl(''),
    flagged_as_erronous : new FormControl(''),
    logical_delete: new FormControl(''),
  });
 


  onFormSubmit(){
    
    this.userLocation = {
      lat: this.public_data.value.place_org_lat,
      long: this.public_data.value.place_org_long,
    };
    this.AdminService.getWardId(this.userLocation).subscribe((response)=>{
     let wid = response['data'][0].name.slice(5); //To Remove String Ward from name
      this.public_data.patchValue({
        ward_id: wid,
        pol_locale_id:'154',

    });
    this.addResponseToDB();
    });
  }

  addResponseToDB(){
    this.AdminService.publicDataFormSubmit(this.public_data.value).subscribe((response)=>{
      console.log(response['insertId']);
      if(response['insertId']){
        this.modalMessage = `Submitted Successfully! (Insert ID: ${response['insertId']})`;
        this.displayMessageModal = true;
      }else{
        this.modalMessage = `Submit Failed!`;
        this.displayMessageModal = true;
      }
      
      this.public_data.reset();
      this.selectedCategory = new Category('');
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

 hideModal(){
  this.displayMessageModal = false;

 }
}
