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
      animation: google.maps.Animation.BOUNCE,
    });
    
    this.directionsDisplay.setMap(this.map);
    this.calculateRoute();


  }

  calculateRoute() {
    if (this.enderecos && this.startPosition) {
      let addressStop = [];
      console.log(this.enderecos);

      if (this.enderecos.length > 1) {
        var tst = true;
      }
      this.enderecos.forEach(endereco => {
        addressStop.push({
          location: endereco,
          stopover: false
        })
      });

      console.log('this.enderecos.length', this.enderecos.length);
      console.log(this.enderecos[this.enderecos[(this.enderecos.length -1)]]);
      this.destinationPosition = this.enderecos[(this.enderecos.length -1)];
      console.log('destinationPosition', this.destinationPosition);
      console.log('addressStop', addressStop)
      if (this.enderecos.length > 1) {
        const request = {
          // Pode ser uma coordenada (LatLng), uma string ou um lugar
          origin: this.startPosition,
          destination: this.destinationPosition,
          waypoints: addressStop,
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
          travelMode: 'DRIVING'
        }
      } else {
        var request = {
          // Pode ser uma coordenada (LatLng), uma string ou um lugar
          origin: this.startPosition,
          destination: this.destinationPosition,
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
          travelMode: 'DRIVING'
        }
      }

      console.log('request -> ', request)
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
      console.log('passou aqui 1');
  }
}