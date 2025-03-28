import { Component, OnInit } from '@angular/core';
import lottie from "lottie-web"

@Component({
  selector: 'app-error404',
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component implements OnInit {
  ngOnInit(): void {
    lottie.loadAnimation({
      container: document.getElementById('lottie')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/Animation - 1737457063032.json'
    });
  }
}

