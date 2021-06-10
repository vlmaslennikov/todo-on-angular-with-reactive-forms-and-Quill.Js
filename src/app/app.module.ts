import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuillComponent } from './quill-component/quill.component';
import { DetailsComponent } from './details-page/details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RoutingModule } from './router-module/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuillComponent,
    DetailsComponent,
    MainPageComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RoutingModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
