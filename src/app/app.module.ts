import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelpContentComponent } from './modal-help-content/modal-help-content.component';
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [
    AppComponent,
    ModalHelpContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
	NgbModule,
	AdsenseModule.forRoot({
		adClient: 'ca-pub-1665609390198428',
		adSlot: 1234567,
	  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
