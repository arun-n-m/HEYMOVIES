import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { MovieServicesService } from '../services/movie-services.service';
import { FilterComponent } from '../filter/filter.component';
import { TitlePipe } from '../pipe/title.pipe';
import { ImagePipe } from '../pipe/image.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-browser',
  imports: [LoaderComponent, ImagePipe, TitlePipe, FilterComponent],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css',
})
export class BrowserComponent implements OnInit {

  constructor(
    private apiService: MovieServicesService,
    private route: Router,
    private aroute: ActivatedRoute
  ) {
    this.aroute.queryParams.subscribe(params => {
      this.media_type = params['type'];
      if (this.media_type) {
        this.apiService.getAllMedia(this.page, this.language_code, this.media_type).subscribe((data: any) => {
          this.allMedia = data.results;
        });
      }
    });
  }

  allMedia: any;
  media_type: any;
  page: number = 1;
  genres_type: number = 0;
  language_code: string = 'en';
  ngOnInit(): void {
    
  }
  getMovie(id: string) {
    const params = `${this.media_type}/${id}`;
    // this.route.navigateByUrl(`info/${params}`);
    this.route.navigateByUrl(`info/${this.media_type}/${id}`);

    console.log("getMovie(id: string)::::",params);
    
  }

  genres(value: number) {
    this.genres_type = value;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        value,
        this.page,
        this.language_code
      )
      .subscribe((data: any) => {
        this.allMedia = data.results;
        console.log("genres-data", data);
      });
  }

  language(value: string) {
    this.language_code = value;
    this.apiService
      .getAllMediaByGenresAndLanguage(
        this.media_type,
        this.genres_type,
        this.page,
        this.language_code
      )
      .subscribe((data: any) => {
        this.allMedia = data.results;
        console.log("language-data", data);
      });
  }

  loadMore() {
    this.page++;
    if (this.genres_type) {
      this.apiService
        .getAllMediaByGenresAndLanguage(
          this.media_type,
          this.genres_type,
          this.page,
          this.language_code
        )
        .subscribe((data: any) => {
          const newResults = data.results.filter(
            (newItem: any) => !this.allMedia.some((existingItem: any) => existingItem.id === newItem.id)
          );
          this.allMedia = [...this.allMedia, ...newResults];
        });
    } else {
      this.apiService
        .getAllMedia(this.page, this.language_code, this.media_type)
        .subscribe((data: any) => {
          const newResults = data.results.filter(
            (newItem: any) => !this.allMedia.some((existingItem: any) => existingItem.id === newItem.id)
          );
          this.allMedia = [...this.allMedia, ...newResults];
        });
    }
  }
 
}
