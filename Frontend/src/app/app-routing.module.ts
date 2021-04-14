import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { CampaignsListComponent } from './components/campaigns-list/campaigns-list.component';
import { CampaignEditComponent } from './components/components/campaign-edit/campaign-edit.component';
import { MyCampaignComponent } from './components/my-campaign/my-campaign.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path : 'home',  component: HomeComponent },
  { path : 'login', component:LoginComponent},
  { path : 'register', component:RegisterComponent},
  //{ path : 'profile', component: ProfileComponent },
  { path : 'profile-edit', component: ProfileEditComponent },
  { path : 'about', component: AboutComponent },
  { path : 'contact', component: ContactComponent },
  { path : 'campaign', component:CampaignComponent},
  { path : 'campaigns', component: CampaignsListComponent },
  { path : 'mycampaigns', component: MyCampaignComponent },
  { path: 'campaigns/:id', component: CampaignDetailsComponent },
  { path: 'campaign-edit/:id', component: CampaignEditComponent },
  { path: 'add', component: AddCampaignComponent },

  { path : '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
