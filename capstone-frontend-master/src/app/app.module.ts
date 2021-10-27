import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RewardComponent } from './reward/reward.component';
import { ProfileComponent } from './profile/profile.component';
import { RewardCardComponent } from './reward-card/reward-card.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WalletComponent } from './wallet/wallet.component';

import { NgxLoadingModule } from 'ngx-loading';
import { LoadingComponent } from './wallet/loading';
import { ProfileWalletComponent } from './profile-wallet/profile-wallet.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentComponent,
    HomeComponent,
    HeaderComponent,
    RewardComponent,
    ProfileComponent,
    RewardCardComponent,
    RewardCardComponent,
    TransactionComponent,
    WalletComponent,
    LoadingComponent,
    ProfileWalletComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
