import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }
  getLatestMovie(page = 1) { return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey()); }
  getMovieDetails(filmeId) { return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=` + this.getApiKey()); }
  getApiKey(): string{ return "270322e6187f402eed20e1195b95ae87"; }
}
