import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { BrowserComponent } from './browser/browser.component';
import { PlayerComponent } from './player/player.component';
import { VideoComponent } from './video/video.component';


export const routes: Routes = [
    {
        path: "",
        component: NavComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full', },
            { path: "home", component: HomeComponent },
            { path: "vidoes", component: BrowserComponent },
            { path: "info/:media_type/:id", component:VideoComponent },
            {path:"player/:id",component:PlayerComponent}
        ],
    },
    
    { path: "**", component: Error404Component },
];
