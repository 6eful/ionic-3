import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  //Exemplo de variavéis
  //public nome_usuario = "Luiz Fernando";
  public nome_usuario:string = "Luiz Fernando";
  public obejto_feed = {
    titulo: "Luiz Fernando",
    data: "November 5, 1955",
    descricao: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
    qntd_likes: 12,
    qntd_comment: 4,
    time_comment: "11h ago"
  }
  public loader;
  public lista_filmes = new Array<any>();
  public refresher;
  public isRefreshing:boolean = false;
  public page = 1;
  public infiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) { }

  //public somaDoisNumero():void { alert(4+12); }
  //public somaDoisNumero(num1:number, num2:number) { alert(num1+num2); }
    abrirCarregamento() {
     this.loader = this.loadingCtrl.create({
       content: "Carregando filmes..."
     });
     this.loader.present();
   }
   fecharCarregamento(){
     this.loader.dismiss();
   }
   doRefresh(refresher) {
     this.refresher = refresher;
     this.isRefreshing = true;
     this.carregarFilme();
   }
  ionViewDidEnter() {
    //ionViewDidLoad
    //console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumero();
    //this.somaDoisNumero(12,8);
    this.carregarFilme();
  }
  abrirDetalhes(filme){
    console.log(filme.id);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilme(true);
  }

  carregarFilme(newpage: boolean = false) {
    this.abrirCarregamento();
    this.movieProvider.getLatestMovie(this.page).subscribe(
      data=> {

        const response = (data as any);//transforma o retorno em qualquer coisa, sendo possivel usar mesmo se for privada
        const objeto_retorno = JSON.parse(response._body);
        if(newpage){
            this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
            console.log(this.page);
            console.log(this.lista_filmes);
            this.infiniteScroll.complete();
        } else {
            this.lista_filmes = objeto_retorno.results;
        }

        console.log(objeto_retorno);
        this.fecharCarregamento();

        if(this.refresher){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }, error=> {
        console.log(error);
        this.fecharCarregamento();

        if(this.refresher){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

}
