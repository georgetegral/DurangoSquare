import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { apiKey } from '../../environments/googleConsoleKey';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent{
  lugar:any = {};
  id:any = null;
  results$ : Observable<any>;
  public searchField: FormControl;
    constructor(private lugaresService: LugaresService, private route:ActivatedRoute, private http:HttpClient){
      this.id = this.route.snapshot.params['id'];
      console.log(this.id);
      if(this.id != 'new'){
        this.lugaresService.getLugar(this.id)
        .valueChanges()
        .subscribe((lugar)=>{
          this.lugar = lugar;
        });
      }
      const URL = 'https://maps.google.com/maps/api/geocode/json?key='+apiKey;
      this.searchField = new FormControl();
      this.results$ = this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(query => this.http.get(`${URL}&address=${query}`)),
        map((response: any)=>{return response['results'];})
      );
        
    }

  guardarLugar(){
    var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((result:any) => {
        this.lugar.lat = result.results[0].geometry.location.lat;
        this.lugar.lng = result.results[0].geometry.location.lng;

        if (this.id != 'new'){
          this.lugaresService.editarLugar(this.lugar);
          alert('Negocio editado con éxito');
        } else {
          this.lugar.id = Date.now();
          this.lugaresService.guardarLugar(this.lugar);
          alert('Negocio guardado con éxito');
        }
        this.lugar = {};
      });
  }

  seleccionarDireccion(direccion){
    this.lugar.calle = direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[6].long_name;
  }

}