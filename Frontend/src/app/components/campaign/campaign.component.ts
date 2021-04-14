import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaigns?: Campaign[];
  currentCampaign?: Campaign;
  currentIndex = -1;
  title = '';
  PhotoFilePath = '';
  daysLeft= '';

  p: number = 1;

  constructor(private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.retrieveCampaigns();
  }

  retrieveCampaigns(): void {
    this.campaignService.getAllhomeCampaigns()
      .subscribe(
        data => {
          this.campaigns = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCampaigns();
    this.currentCampaign = undefined;
    this.currentIndex = -1;
  }

  setActiveCampaign(campaign: Campaign, index: number): void {
    this.currentCampaign = campaign;
    this.currentIndex = index;
  }

  removeAllCampaigns(): void {
    this.campaignService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.campaignService.findByTitle(this.title)
      .subscribe(
        data => {
          this.campaigns = data;
          console.log(data);
        },
        error => {
          this.campaignService.findByStatus(this.title)
          .subscribe(
            data => {
              this.campaigns = data;
              console.log(data);
            },
            error => {
              console.log(error);
            });
        });
  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
 
     return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
   }
}
