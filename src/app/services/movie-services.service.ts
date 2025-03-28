import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs'

const options = {
  params: {
    include_adult: 'true',
    include_video: 'true',
    sort_by: 'popularity.desc',
  },
  headers: {
    accept: 'application/json',
    Authorization: environment.tmdb_auth,
  },
};

@Injectable({
  providedIn: 'root',
})
export class MovieServicesService {
  http = inject(HttpClient);
  getTrendingAll() {
    return this.http.get(
      `${environment.tmdb_base_url}/trending/all/day?language=en-US`,
      options
    );
  }
  getMovies() {
    console.log('getMovies___');
    return this.http.get<any>(
      `${environment.tmdb_base_url}/discover/movie`,
      options
    );
  }
  getAllShows() {
    return this.http.get(
      `${environment.tmdb_base_url}/trending/tv/week?language=en-US`,
      options
    );
  }
  getUpcommingAll() {
    return this.http.get(
      `${environment.tmdb_base_url}/movie/upcoming?language=en-US`,
      options
    );
  }

  getAllMedia(p: number = 1, lang: string = 'en', media_type: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/discover/${media_type}?page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
      options
    );
  }

  getAllMediaByGenresAndLanguage(
    media: string,
    g: number,
    p: number = 1,
    lang: string = 'en'
  ) {
    if (g) {
      console.log("getAllMediaByGenresAndLanguage-genres");
      return this.http.get(
        `${environment.tmdb_base_url}/discover/${media}?with_genres=${g}&page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
        options
      );
    } else {
      return this.http.get(
        `${environment.tmdb_base_url}/discover/${media}?page=${p}&sort_by=popularity.desc&with_original_language=${lang}`,
        options
      );
    }
  }

  getMedia(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}?language=en-US`,
      options
    );
  }
  getActors(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/credits?language=en-US`,
      options
    );
  }
  getVideos(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/videos?language=en-US`,
      options
    );
  }
  getRecommentations(id: any, media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/${media}/${id}/recommendations?language=en-US&page=1`,
      options
    );
  }

  getGenres(media: any) {
    return this.http.get(
      `${environment.tmdb_base_url}/genre/${media}/list?language=en`,
      options
    );
  }

  // Fetch Available Languages
  getLanguages(): Observable<any> {
    console.log("getLanguages112312");
    return this.http.get(`${environment.tmdb_base_url}/configuration/languages`, options);
  }
}
