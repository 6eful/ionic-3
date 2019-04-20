import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  //Exemplo de variavéis
  //public nome_usuario = "Luiz Fernando";
  public nome_usuario:string = "Luiz Fernando";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //public somaDoisNumero():void { alert(4+12); }
  //public somaDoisNumero(num1:number, num2:number) { alert(num1+num2); }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumero();
    //this.somaDoisNumero(12,8);
  }

}
