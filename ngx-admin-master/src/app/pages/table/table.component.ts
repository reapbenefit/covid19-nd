import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public rowData;
  public editType;
  public editingRowIndex;
  public components;

  constructor(){
    this.columnDefs = [
              {headerName: 'Place_Org_Name', field: 'place_org_name', editable: true, cellRenderer: "singleClickEditRenderer"},
              {headerName: 'Place_Org_Address', field: 'place_org_address', editable: true},
              {headerName: 'Place_Org_Lat', field: 'place_org_lat', editable: true},
              {headerName: 'Place_Org_Long', field: 'place_org_long', editable: true},
              {headerName: 'Place_Org_Category', field: 'place_org_category', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Place_Org_Subcategory', field: 'place_org_subcategory', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Ward_ID', field: 'ward_id', filter: 'agNumberColumnFilter', sortable: true, editable: true},
              {headerName: 'City_ID', field: 'city_id', editable: true},
              {headerName: 'Place_Org_Number', field: 'place_org_name', editable: true},
              {headerName: 'Info', field: 'info', filter: 'agTextColumnFilter', sortable: true, editable: true},
              {headerName: 'Impact', field: 'impact', editable: true},

    ];

    this.rowData = [
          {place_org_name: 'Dry', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry ', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
          {place_org_name: 'Dry Waste Collection Center (DWCC), Ward 73', place_org_address: 'Behind Electric Crematorium, Near to BMTC bus Depot Summanahalli Junction, Bengalore', place_org_lat: 12.959872, place_org_long: 77.552091, place_org_category: 'Amenities', place_org_subcategory: 'Waste - DryWasteCollectionCentre', ward_id: 174, city_id: 1, info: null, impact: null},
        ];

    this.editType = "fullRow";
    this.components = { singleClickEditRenderer: getRenderer() };

  }

  onCellClicked($event){
    // check whether the current row is already opened in edit or not
    if(this.editingRowIndex != $event.rowIndex) {
      console.log($event);
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingRowIndex = $event.rowIndex;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  

  ngOnInit(): void {
  }

}

function getRenderer() {
  function CellRenderer() {}
  CellRenderer.prototype.createGui = function() {
    var template =
      '<span><span id="theValue" style="padding-left: 2px;"></span><button style="float:left" id="theButton">#</button></span>';
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = template;
    this.eGui = tempDiv.firstElementChild;
  };
  CellRenderer.prototype.init = function(params) {
    this.createGui();
    this.params = params;
    var eValue = this.eGui.querySelector("#theValue");
    eValue.innerHTML = params.value;
    this.eButton = this.eGui.querySelector("#theButton");
    this.buttonClickListener = this.onButtonClicked.bind(this);
    this.eButton.addEventListener("click", this.buttonClickListener);
  };
  CellRenderer.prototype.onButtonClicked = function() {
    var startEditingParams = {
      rowIndex: this.params.rowIndex,
      colKey: this.params.column.getId()
    };
    this.params.api.startEditingCell(startEditingParams);
  };
  CellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  CellRenderer.prototype.destroy = function() {
    this.eButton.removeEventListener("click", this.buttonClickListener);
  };
  return CellRenderer;
}


