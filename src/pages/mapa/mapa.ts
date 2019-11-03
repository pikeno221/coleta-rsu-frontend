import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;

  constructor() { }

  ionViewDidLoad() {
    console.log('passou aqui');
    this.initializeMap();
  }

  initializeMap() {
      
    this.startPosition = new google.maps.LatLng(-19.9881067, -43.8459882);
    console.log('startPosition', this.startPosition);
    const mapOptions = {
      zoom: 14,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    console.log('map -> ', this.map);

    this.directionsDisplay.setMap(this.map);
    console.log('directionsDisplay -> ', this.directionsDisplay);
    
    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }

  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
        console.log('destinationPosition', this.destinationPosition);
        console.log('originPosition', this.originPosition);
        const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        waypoints: [{
            location: 'Av Abilio Machado, Alipio de Melo',
            stopover: false
          },{
            location: 'Avenida do Contorno, Savassi',
            stopover: false
          }],
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        console.log('result ok -> ', result);
        console.log('status ok -> ', status);
        display.setDirections(result);
        console.log(display);
      } else {
          console.log('status -> ', status);
          console.log('result -> ', result);
      }
    });
  }
}