import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  languageList=[{
    code:'en',
    name:'English'
  },{
    code:'tn',
    name:'Tamil'
  },{
    code:'ka',
    name:'Kannada'
  }]
  selectedLanguage="en";
  constructor() { }

  ngOnInit() {
  }

}
