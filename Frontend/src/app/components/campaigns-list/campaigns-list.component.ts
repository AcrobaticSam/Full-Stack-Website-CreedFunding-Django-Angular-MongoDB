import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.css']
})
export class CampaignsListComponent implements OnInit {
  campaigns?: Campaign[];
  currentCampaign?: Campaign;
  currentIndex = -1;
  title = '';
  PhotoFilePath = '';
  daysLeft = '';
  term: string;

  constructor(private campaignService: CampaignService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveCampaigns();
  }

  retrieveCampaigns(): void {
    this.campaignService.getAll()
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

  updatePublished(id): void {

    //this.currentCampaign.raisedAmmount = Number(this.currentCampaign.raisedAmmount)+ Number(this.amount.value);
    this.getCampaign(id);
    this.currentCampaign.published = true;
    this.campaignService.update(this.currentCampaign.id, this.currentCampaign)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Done!', 'Campaign published!', 'success')

        },
        error => {
          console.log(error);
          Swal.fire('Whooa!', 'Order has been proceeded!', 'error')

        });
  }

  getCampaign(id: string): void {
    this.campaignService.get(id)
      .subscribe(
        data => {
          this.currentCampaign = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  deleteCampaign(id): void {
    this.campaignService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/campaign']);
        },
        error => {
          console.log(error);
        });
  }
  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

}
