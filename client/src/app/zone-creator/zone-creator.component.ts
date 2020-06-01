import { Component, OnInit, HostListener, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneDetailsDialogComponent } from '../zone-details-dialog/zone-details-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../services/data.service';
import { ZoneReviewDialogComponent } from '../zone-review-dialog/zone-review-dialog.component';

declare const google: any;

@Injectable()
@Component({
  selector: 'app-zone-creator',
  templateUrl: './zone-creator.component.html',
  styleUrls: ['./zone-creator.component.css']
})
export class ZoneCreatorComponent implements OnInit {

  public center: any = {
    lat: 12.9796734,
    lng: 77.5890556
  };

  private drawingManager;
  public drawModeOn = false;
  public drawToolText = "Draw Zone"
  public mapLoaded = false;
  private inventoryForm: FormGroup;
  private zoneTags;
  private zoneTagsTree;
  private zoneDetails;
  private map;
  private savedPolygons = 0;
  private loadedZones = [];
  private submittedZones = [];
  private savedZones = [];
  private selectedTags = {
    types: [],
    owners: [],
    subowners: []
  };
  private colorScheme = "status";

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, public dialog: MatDialog, private dataService: DataService){}

  ngOnInit() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;
      });
    }

    this.fetchMetaData()
  }

  fetchMetaData() {
    this.dataService.getTags().subscribe(function(response) {
      // console.log(response);
      let tagTree = [];
      response.data.forEach(element => {
        let typeObject = tagTree.filter(function(e){
          return e.type === element.type;
        })[0]

        if(!typeObject) {
          typeObject = {
            type: element.type,
            owners: []
          }
          tagTree.push(typeObject);
        }

        let ownerObject = typeObject.owners.filter(function(e){
          return e.owner === element.owner;
        })[0]

        if(!ownerObject) {
          ownerObject = {
            owner: element.owner,
            subowners: []
          }
          typeObject.owners.push(ownerObject);
        }

        let subownerObject = ownerObject.subowners.filter(function(e){
          return e.subowner === element.subowner;
        })[0]

        if(!subownerObject) {
          subownerObject = {
            subowner: element.subowner,
            id: element.id
          }
          ownerObject.subowners.push(subownerObject);
        }
      });
      // console.log('Prepared Tag Tree:');
      // console.log(tagTree);
      this.zoneTags = response.data;
      this.zoneTagsTree = tagTree;
    }.bind(this));
  }

  onMapReady(map) {
    this.map = map;
    this.initDrawingManager(map);

    this.inventoryForm = this.formBuilder.group({
      location: ['', Validators.required],
      meals: ['', Validators.required],
      month: ['', Validators.required],
      beneficiaries: ['', Validators.required]
    });

    this.mapLoaded = true;
  }

  initDrawingManager(map: any) {
    let options = {
      drawingMode: null,
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
        drawingModes: ['polygon']
      },
      // markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
      polygonOptions: {
        fillColor: 'black',
        fillOpacity: 0.5,
        strokeWeight: 3,
        clickable: true,
        editable: true,
        zIndex: 1
      }
    }

    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', this.onPolygonComplete.bind(this));
  }

  toggleDrawTool() {
    if(this.drawModeOn) {
      this.drawingManager.setDrawingMode(null);
      this.drawModeOn = false;
      this.drawToolText = "Draw Zone"
    } else {
      this.drawingManager.setDrawingMode('polygon');
      this.drawModeOn = true;
      this.drawToolText = "Cancel";
    }
  }

  onPolygonComplete(polygon, zoneDetails) {
    this.zoneDetails = zoneDetails || {tags: this.zoneTagsTree, notes: '', color: 'black'};
    let dialogRef = this.dialog.open(ZoneDetailsDialogComponent, {
      data: this.zoneDetails
    });
    let thisPolygonInfoWindow = new google.maps.InfoWindow;
    let thisPolygonInfoWindowOpen = false;
    let thisZoneDetails = this.zoneDetails;

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        polygon.setMap(null);
      } else if(result == 'Cancel') {
        polygon.setMap(null);
      } else if(result == 'Save') {
        this.savedPolygons = this.savedPolygons + 1;
        polygon.setOptions({
          fillColor: this.colorScheme === 'status' ? 'orange' : thisZoneDetails.color,
          strokeColor: this.colorScheme === 'status' ? 'red' : thisZoneDetails.color
        });
        polygon.setEditable(false);
        polygon.addListener('click', function(event){
	      	if(thisPolygonInfoWindowOpen) {
	      		thisPolygonInfoWindow.close();
            thisPolygonInfoWindowOpen = false;
            polygon.setEditable(false);
	      	} else {
            let polygonContent = "<span><h6 style='display: inline;'>"+thisZoneDetails.name+"</h6></span><br/><hr>"+
              "<span><h6 style='display: inline;'>Type:</h6> "+thisZoneDetails.type+"</span><br/>"+
              "<span><h6 style='display: inline;'>Owner:</h6> "+thisZoneDetails.owner+"</span><br/>"+
              "<span><h6 style='display: inline;'>Sub-Owner:</h6> "+thisZoneDetails.subowner+"</span><br/>"+
              (thisZoneDetails.notes ? "<span><h6 style='display: inline;'>Notes:</h6><pre>"+thisZoneDetails.notes+"</pre></span>" : "");
	      		thisPolygonInfoWindow.setContent(polygonContent);
		  		  thisPolygonInfoWindow.setPosition(event.latLng);
            thisPolygonInfoWindow.open(polygon.getMap());
            thisPolygonInfoWindowOpen = true;
            polygon.setEditable(true);
          }
        });
        
        polygon.addListener('rightclick', function(event){
          this.onPolygonComplete(polygon, thisZoneDetails);
        }.bind(this));

        this.savedZones.push({
          polygon: polygon,
          status: {
            fillColor: 'orange',
            strokeColor: 'red'
          },
          color: {
            fillColor: thisZoneDetails.color,
            strokeColor: thisZoneDetails.color
          }
        });

      } else if(result == 'Submit') {
        //TODO Set userId in result / form fields
        let geometry = []
        polygon.getPaths().forEach(function(element, index){
          element.forEach(function(innerElement, innerIndex){
            geometry.push([innerElement.lng(), innerElement.lat()])
          })
        })
        geometry.push(geometry[0]);

        let zoneProperties = {
          tagId: thisZoneDetails.tagId,
          name: thisZoneDetails.name,
          notes: thisZoneDetails.notes
        }
      
        let geoJson = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [geometry]
            },
            properties: zoneProperties
          }]
        }

        this.dataService.submitZone(geoJson).subscribe(result => {
          console.log('Result from Add Zones');
          console.log(result);
        });

        //TODO Validate result / form fields
        polygon.setEditable(false);
        polygon.setOptions({
          fillColor: this.colorScheme === 'status' ? 'green' : thisZoneDetails.color,
          strokeColor: this.colorScheme === 'status' ? 'darkgreen' : thisZoneDetails.color
        });

        polygon.addListener('click', function(event){
          if(thisPolygonInfoWindowOpen) {
            polygon.setEditable(false);
            thisPolygonInfoWindow.close();
            thisPolygonInfoWindowOpen = false;
          } else {
            let polygonContent = "<span><h6 style='display: inline;'>"+thisZoneDetails.name+"</h6></span><br/><hr>"+
            "<span><h6 style='display: inline;'>Type:</h6> "+thisZoneDetails.type+"</span><br/>"+
            "<span><h6 style='display: inline;'>Owner:</h6> "+thisZoneDetails.owner+"</span><br/>"+
            "<span><h6 style='display: inline;'>Sub-Owner:</h6> "+thisZoneDetails.subowner+"</span><br/>"+
            (thisZoneDetails.notes ? "<span><h6 style='display: inline;'>Notes:</h6><pre>"+thisZoneDetails.notes+"</pre></span>" : "");
            thisPolygonInfoWindow.setContent(polygonContent);
            thisPolygonInfoWindow.setPosition(event.latLng);
            thisPolygonInfoWindow.open(polygon.getMap());
            thisPolygonInfoWindowOpen = true;
            polygon.setEditable(false);
          }
        });

        if(zoneDetails) this.savedPolygons = this.savedPolygons - 1;

        this.submittedZones.push({
          polygon: polygon,
          status: {
            fillColor: 'green',
            strokeColor: 'darkgreen'
          },
          color: {
            fillColor: thisZoneDetails.color,
            strokeColor: thisZoneDetails.color
          }
        });
      }
    });
    this.toggleDrawTool();
  }

  zoneTypeChanged(event) {
    this.zoneDetails.owner = undefined;
    this.zoneDetails.subowner = undefined;
  }

  zoneOwnerChanged(event) {
    this.zoneDetails.subowner = undefined;
  }

  zoneSubOwnerChanged(event) {
    this.zoneDetails.tagId = this.zoneTags.find((t) =>{
      return t.type == this.zoneDetails.type && 
      t.owner == this.zoneDetails.owner && 
      t.subowner == this.zoneDetails.subowner
    }).id;
  }

  loadZones(event) {
    if(this.drawModeOn) {
      this.drawingManager.setDrawingMode(null);
      this.drawModeOn = false;
      this.drawToolText = "Draw Zone"
    }

    let bottom = this.map.getBounds().getSouthWest().lat();
    let left = this.map.getBounds().getSouthWest().lng();
    let top = this.map.getBounds().getNorthEast().lat();
    let right = this.map.getBounds().getNorthEast().lng();
    this.dataService.loadZones(left, bottom, right, top, this.selectedTags.types, this.selectedTags.owners, this.selectedTags.subowners).subscribe(result => {
      console.log(result);
      this.loadedZones.forEach(p => p.polygon.setMap(undefined));
      this.submittedZones.forEach(p => p.polygon.setMap(undefined));
      this.loadedZones = [];
      this.submittedZones = [];
      (result as any).features.forEach(feature => {
        let paths = [];
        feature.geometry.coordinates.forEach(c => {
          c.forEach(g => {
            paths.push({lng: g[0], lat: g[1]});
          })
        })

        let thisPolygonInfoWindow = new google.maps.InfoWindow;
        let thisPolygonInfoWindowOpen = false;
        let thisZoneDetails = {
          name: feature.properties.name,
          type: feature.properties.tag.type,
          owner: feature.properties.tag.owner,
          subowner: feature.properties.tag.subowner,
          notes: feature.properties.notes,
          userId: '',
          zoneId: feature.properties.zoneId,
          action: feature.properties.status == 'UNDER_REVIEW_FOR_CREATE' ? 'Add' : feature.properties.status == 'UNDER_REVIEW_FOR_DELETE' ? 'Delete' : 'Update',
          color: feature.properties.color
        };

        let newPolygon = new google.maps.Polygon({
          fillColor: this.colorScheme === 'status' ? (thisZoneDetails.action == 'Add' ? 'lightblue' : thisZoneDetails.action == 'Delete' ? 'OrangeRed' : 'RoyalBlue') : thisZoneDetails.color,
          strokeColor: this.colorScheme === 'status' ? (thisZoneDetails.action == 'Add' ? 'blue' : thisZoneDetails.action == 'Delete' ? 'red' : 'MidnightBlue') : thisZoneDetails.color,
          editable: false,
          paths: paths
        })
        newPolygon.setMap(this.map);

        newPolygon.addListener('click', function(event){
          if(thisPolygonInfoWindowOpen) {
            newPolygon.setEditable(false);
            thisPolygonInfoWindow.close();
            thisPolygonInfoWindowOpen = false;
          } else {
            let polygonContent = "<span><h6 style='display: inline;'>"+thisZoneDetails.name+"</h6></span><br/><hr>"+
            "<span><h6 style='display: inline;'>Type:</h6> "+thisZoneDetails.type+"</span><br/>"+
            "<span><h6 style='display: inline;'>Owner:</h6> "+thisZoneDetails.owner+"</span><br/>"+
            "<span><h6 style='display: inline;'>Sub-Owner:</h6> "+thisZoneDetails.subowner+"</span><br/>"+
            (thisZoneDetails.notes ? "<span><h6 style='display: inline;'>Notes:</h6><pre>"+thisZoneDetails.notes+"</pre></span><br/>" : "");
            thisPolygonInfoWindow.setContent(polygonContent);
            thisPolygonInfoWindow.setPosition(event.latLng);
            thisPolygonInfoWindow.open(newPolygon.getMap());
            thisPolygonInfoWindowOpen = true;
            newPolygon.setEditable(false);
          }
        }.bind(this));

        if(thisZoneDetails.action) {
          newPolygon.addListener('rightclick', function(event){
            let dialogRef = this.dialog.open(ZoneReviewDialogComponent, {
              data: thisZoneDetails
            });

            dialogRef.afterClosed().subscribe(result => {
              if(result == 'APPROVE' || result == 'REJECT') {
                this.dataService.updateZoneStatus(thisZoneDetails.zoneId, result).subscribe(result => {
                  console.log('Result from Updating Zone Status');
                  console.log(result);
                });
              } else if(result == 'UPDATE') {
                this.dataService.updateZone({
                  type: "FeatureCollection",
                  features: [{
                        type: "Feature",
                        properties: {
                          zoneId: thisZoneDetails.zoneId,
                          name: thisZoneDetails.name,
                          notes: thisZoneDetails.notes,
                          color: thisZoneDetails.color
                        }
                     }]
                }).subscribe(result => {
                  console.log('Result from Updating Zone Status');
                  console.log(result);
                });
              } else if(result == 'DELETE') {
                this.dataService.deleteZone(thisZoneDetails.zoneId).subscribe(result => {
                  console.log('Result from Deleting Zone Status');
                  console.log(result);
                });;
              }
            })
          }.bind(this));
        }

        this.loadedZones.push({
          polygon: newPolygon,
          status: {
            fillColor: thisZoneDetails.action == 'Add' ? 'lightblue' : thisZoneDetails.action == 'Delete' ? 'OrangeRed' : 'RoyalBlue',
            strokeColor: thisZoneDetails.action == 'Add' ? 'blue' : thisZoneDetails.action == 'Delete' ? 'red' : 'MidnightBlue'
          },
          color: {
            fillColor: thisZoneDetails.color,
            strokeColor: thisZoneDetails.color
          }
        });
      });
    });
  }

  // updateZoneStatus(zoneId: string, status: string) {
  //   this.dataService.updateZoneStatus(zoneId, status).subscribe(result => {
  //     console.log('Result from Updating Zone Status');
  //     console.log(result);
  //   });
  // }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if(this.savedPolygons > 0) {
      $event.returnValue =true;
    }
  }

  zoneTagsSelected(selectedTags) {
    this.selectedTags = selectedTags;
  }

  colorSchemeChanged(event) {
    this.changePolygonColor(this.loadedZones, event.value);
    this.changePolygonColor(this.savedZones, event.value);
    this.changePolygonColor(this.submittedZones, event.value);
  }

  changePolygonColor(zones, colorScheme) {
    zones.forEach(loadedZone => {
      loadedZone.polygon.setOptions({
        fillColor: loadedZone[colorScheme].fillColor,
        strokeColor: loadedZone[colorScheme].strokeColor
      })
    })
  }
}
