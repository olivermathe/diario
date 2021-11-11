import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import ptBr from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    NzGridModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
