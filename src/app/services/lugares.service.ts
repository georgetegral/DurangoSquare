import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { apiKey } from '../../environments/googleConsoleKey';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class LugaresService{
    //any sirve para aceptar cualquier tipo de objeto
    lugares:any = [
        {id: 1, plan: 'pagado', cercania: 1, distancia: 2, active: true, nombre: 'Florería Gardenia', description: 'Descripción del negocio.'},
        {id: 2, plan: 'gratuito', cercania: 2, distancia: 13.2, active: true, nombre: 'Donas la Jessy', description: 'Descripción del negocio.'},
        {id: 3, plan: 'gratuito', cercania: 3, distancia: 120, active: true, nombre: 'Veterinaria el Gato Azul', description: 'Descripción del negocio.'},
        {id: 4, plan: 'pagado', cercania: 1, distancia: 1.3, active: false, nombre: 'Sushi sushingada madre', description: 'Descripción del negocio.'},
        {id: 5, plan: 'pagado', cercania: 2, distancia: 10, active: true, nombre: 'Hotel Gobernador', description: 'Descripción del negocio.'},
        {id: 6, plan: 'gratuito', cercania: 3, distancia: 50, active: false, nombre: 'Liverpool', description: 'Descripción del negocio.'},
    ];

    constructor(private afDB: AngularFireDatabase, private http: HttpClient){

    }

    public getLugares(){
        return this.afDB.list('lugares/')
    }
    public buscarLugar(id){
        return this.lugares.filter((lugar) => {
          return lugar.id == id
        })[0] || null;
    }

    public guardarLugar(lugar){
      console.log(lugar);
      this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    }

    public obtenerGeoData(direccion){
      return this.http.get('https://maps.google.com/maps/api/geocode/json?key='+apiKey+'&address='+direccion);
    }

}