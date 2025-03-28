import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MovieServicesService } from '../services/movie-services.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImagePipe } from '../pipe/image.pipe';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-video',
  imports: [ImagePipe, CommonModule, RouterLink,SlicePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {

  // casts: any;
  casts: any[] = [];
  id: number | undefined;
  media_type: string | undefined;
  video: any;
  recommendations: any;
  trailer:any;

  constructor(
    private apiService: MovieServicesService,
    private route: Router,
    private aroute: ActivatedRoute
  ) {
    this.aroute.paramMap.subscribe(params => {
      this.media_type = params.get('media_type')!;
      this.id = params.get('id') ? Number(params.get('id')) : undefined;

      console.log("Route params:", this.media_type, this.id);

      if (this.media_type && this.id) {
        this.fetchMediaDetails();
      }
    });
  }

  private fetchMediaDetails() {
    if (!this.id || !this.media_type) return;
    this.apiService.getMedia(this.id, this.media_type).subscribe((data: any) => {
      this.video = data;
      console.log("Media Info:", this.video);
      if (this.video && this.video.production_companies) {
        this.productionCompanies = this.video.production_companies
          .map((p: any) => p.name)
          .join(', ');
      }
    });

    this.apiService.getActors(this.id, this.media_type).subscribe((data: any) => {
      this.casts = data.cast || [];
    });

    this.apiService
      .getRecommentations(this.id, this.media_type)
      .subscribe((data: any) => {
        if (Array.isArray(data.results)) {
          this.recommendations = data.results.slice(0, 10);
        }
      });

      this.apiService.getVideos(this.id, this.media_type).subscribe((data: any) => {
        this.trailer = data.results;
      });
  }

  productionCompanies: string = '';

  ngOnInit() {
    window.scrollTo(0, 0); 
  }

  @ViewChild('castContainer', { static:true }) castContainer!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.castContainer) {
        console.log('castContainer is available');
      } else {
        console.error('castContainer is still not assigned');
      }
    }, 0);
  }
  scrollLeft() {
    if (this.castContainer?.nativeElement) {
      this.castContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    } else {
      console.error('castContainer not found!');
    }
  }

  playTrailer() {
    console.log("(click)=playTrailer()");
    const id = this.trailer[0].key;
    this.route.navigateByUrl(`player/${id}`);
  }
}
