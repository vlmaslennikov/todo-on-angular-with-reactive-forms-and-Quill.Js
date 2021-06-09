import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { MainPageComponent } from '../main-page/main-page.component';

const appRoutes: Routes =[
  { path: '', component: MainPageComponent},
  { path: 'details/:id', component: DetailsComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],

  exports:[RouterModule]
})
export class RoutingModule {}
