import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()

export class AutorizacionService{

    constructor(private angularFireAuth:AngularFireAuth){
        this.isLogged();
    }

    public login = (email,password) =>{
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('usuario loggeado');
            })
            .catch((error) => {
                alert('Un error ha ocurrido');
                console.log(error);
            });
    }

    public isLogged(){
        return this.angularFireAuth.authState;
    }

    public registro = (email,password) =>{
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
            .then((response)=>{
                alert('usuario registrado');
                console.log(response);
            })
            .catch((error) =>{
                alert('Un error ha ocurrido');
                console.log(error);
            })
    }
}