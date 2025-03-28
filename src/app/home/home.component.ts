import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, HostListener,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieServicesService } from '../services/movie-services.service';
import { ImagePipe } from '../pipe/image.pipe';
import { DescriptionPipe } from '../pipe/description.pipe';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [ImagePipe,LoaderComponent,DescriptionPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private api: MovieServicesService) { }
  Trending: any
  upcomming: any
  tvShows: any
  movies: any
  video:any
  ngOnInit(): void {
    this.api.getMovies().subscribe((data: any) => {
      console.log("getMovies", data);
      this.movies = data.results
    })
    this.api.getTrendingAll().subscribe((data: any) => {
      this.Trending = data.results;
      this.api.getVideos(this.Trending[0].id,this.Trending[0].media_type ).subscribe((data: any) => {
        this.video = data.results;
      });
    })
    this.api.getAllShows().subscribe((data: any) => {
      this.tvShows = data.results
    })
    this.api.getUpcommingAll().subscribe((data: any) => {
      console.log("getUpcommingAll", data);
      this.upcomming = data.results

    })
  }
  new: any
  movie: any
  getMovie(media_type: string, id: string) {
    const params = `${media_type}/${id}`;
    this.router.navigateByUrl(`/info/${params}`);
  }
  playTrailer() {
    console.log("(click)=playTrailer()");
    const id = this.video[0].key;
    this.router.navigateByUrl(`player/${id}`);
  }
  @ViewChildren('arrow') arrows!: QueryList<ElementRef>;
  @ViewChildren('movieList') movieLists!: QueryList<ElementRef>;
  
  clickCounters: number[] = [];

  ngAfterViewInit() {
    this.arrows.forEach((arrow, i) => {
      this.clickCounters[i] = 0;
      arrow.nativeElement.addEventListener('click', () => this.handleArrowClick(i));
    });
  }

  handleArrowClick(index: number) {
    const movieList = this.movieLists.toArray()[index].nativeElement;
    const itemNumber = movieList.querySelectorAll('img').length;
    const ratio = Math.floor(window.innerWidth / 270);
    
    this.clickCounters[index]++;
    if (itemNumber - (4 + this.clickCounters[index]) + (4 - ratio) >= 0) {
      const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(movieList).transform);
      movieList.style.transform = `translateX(${currentTransform.m41 - 300}px)`;
    } else {
      movieList.style.transform = 'translateX(0)';
      this.clickCounters[index] = 0;
    }

    console.log(ratio);
  }

  @HostListener('window:resize')
  onResize() {
    console.log(Math.floor(window.innerWidth / 270));
  }


}
