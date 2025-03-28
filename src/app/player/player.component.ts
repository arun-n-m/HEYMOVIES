import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { MovieServicesService } from '../services/movie-services.service';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit{

  constructor(
    private apiService:MovieServicesService,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  videoId: string | undefined
  videoUrl: SafeResourceUrl | undefined;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.videoId = params['id'];
    });
    console.log("bypassSecurityTrustResourceUrl",this.videoId);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}?autoplay=1`
    );
  }
  goBack() {
    this.location.back();
  }
}
