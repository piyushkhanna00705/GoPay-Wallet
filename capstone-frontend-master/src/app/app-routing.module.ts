import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authguard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileWalletComponent } from './profile-wallet/profile-wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { RewardComponent } from './reward/reward.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'reward',
    component: RewardComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'myreward',
    component: ProfileWalletComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
