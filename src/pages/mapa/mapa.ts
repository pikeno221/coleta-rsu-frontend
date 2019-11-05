import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  latitudeInicial: any;
  longitudeInicial: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  public enderecos: string[];

  constructor(public navCtrl: NavController, navParams: NavParams, private geolocation: Geolocation) {
    this.enderecos = navParams.get('enderecos');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudeInicial = resp.coords.latitude
      this.longitudeInicial = resp.coords.longitude
      this.initializeMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  
  ionViewDidLoad() {
    console.log('passou aqui');
    
  }

  initializeMap() {
    console.log('latitude', this.latitudeInicial)
    console.log('longitude', this.longitudeInicial);
    this.startPosition = new google.maps.LatLng(this.latitudeInicial, this.longitudeInicial);
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
      let addressStop = [];
      this.enderecos.forEach(endereco => {
        addressStop.push({
          location: endereco,
          stopover: false
        })
      })

      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        waypoints: addressStop,
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