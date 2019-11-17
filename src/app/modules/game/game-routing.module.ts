import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeSixNineComponent } from './components/threesixnine/threesixnine.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IntroComponent } from './components/intro/intro.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { OpenDoorComponent } from './components/open-door/open-door.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CollectiveMemoryComponent } from './components/collective-memory/collective-memory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateGameComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: '3-6-9',
    component: ThreeSixNineComponent
  },
  {
    path: 'open-door',
    component: OpenDoorComponent
  },
  {
    path: 'puzzle',
    component: PuzzleComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'collective-memory',
    component: CollectiveMemoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
