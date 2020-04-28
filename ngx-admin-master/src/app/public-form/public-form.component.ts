import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'ngx-public-form',
  templateUrl: './public-form.component.html',
  styleUrls: ['./public-form.component.scss']
})
export class PublicFormComponent implements OnInit {

  constructor() { }

  category = ['Cat_1', 'Cat_2', 'Cat_3', 'Cat_4','Cat_5'];
  sub_category = ['sub_Cat_1', 'sub_Cat_2', 'sub_Cat_3', 'sub_Cat_4', 'sub_Cat_5'];
  city = ['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  ward = ['Ward_1', 'Ward_2', 'Ward_3'];

  ngOnInit(): void {

  }

  userDetails = new FormGroup({
    name : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    category : new FormControl('', Validators.required),
    sub_category : new FormControl('', Validators.required),
    ward : new FormControl('', Validators.required),
    city : new FormControl('', Validators.required),
    info : new FormControl('', Validators.required),
  });

}
