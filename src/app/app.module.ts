import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchBusComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot('G-Z4WLLDW1C7')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
