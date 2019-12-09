import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { e } from '@angular/core/src/render3';

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
  destinationPosition: any;
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

  }

  initializeMap() {
    this.startPosition = new google.maps.LatLng(parseFloat(this.latitudeInicial), parseFloat(this.longitudeInicial));
    const mapOptions = {
      zoom: 14,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });

    this.directionsDisplay.setMap(this.map);
    this.calculateRoute();


  }

  calculateRoute() {
    var request;
    if (this.enderecos && this.startPosition) {
      let addressStop = [];
      if (this.enderecos.length > 1) {
        var tst = true;
      }
      this.enderecos.forEach(endereco => {
        addressStop.push({
          location: endereco,
          stopover: false
        })
      });

      this.destinationPosition = new google.maps.LatLng(parseFloat('-19.9893861'), parseFloat('-43.8454971'));
      console.log('this.destinationPosition --> ', this.destinationPosition)
      request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: this.destinationPosition,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
        waypoints: addressStop,
        travelMode: 'DRIVING'
      }

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      console.log(result.routes[0].legs[0])
      result.routes[0].legs[0].steps.forEach(element => {
        console.log(element);
        
      });
      if (status == 'OK') {
        display.setDirections(result);
      } else {

      }
    });
  }
}
