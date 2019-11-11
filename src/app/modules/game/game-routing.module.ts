import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeSixNineComponent } from './components/threesixnine/threesixnine.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IntroComponent } from './components/intro/intro.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
