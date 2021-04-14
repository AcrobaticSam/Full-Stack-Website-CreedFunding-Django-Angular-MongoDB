import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {
  donateForm = new FormGroup({
    amount: new FormControl('')
  });
  currentCampaign: Campaign = {
    title: '',
    description: '',
    category:'',
    targetammount:'',
    PhotoFileName: '',
    PhotoFilePath: '',
    raisedAmmount:'',
    backers:'',
    published: false
  };
  submitted = false;
  message = '';
  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCampaign(this.route.snapshot.params.id);
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
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCampaign.title,
      description: this.currentCampaign.description,
      published: status
    };

    this.message = '';

    this.campaignService.update(this.currentCampaign.id, data)
      .subscribe(
        response => {
          this.currentCampaign.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateCampaign(): void {
    this.currentCampaign.raisedAmmount = Number(this.currentCampaign.raisedAmmount)+ Number(this.amount.value);
    this.currentCampaign.backers = Number(this.currentCampaign.backers)+1;
    this.campaignService.update(this.currentCampaign.id, this.currentCampaign)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire('Done!', 'Thank You For Your Contribution!', 'success')
          //this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          Swal.fire('Error!', 'Something Went erong!', 'error')
        });
  }

  deleteTutorial(): void {
    this.campaignService.delete(this.currentCampaign.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

  donate(){

  }

  get amount(){
    return this.donateForm.get('amount')
  }

  ConvertStringToNumber(input: string) { 
    
    if (!input) return NaN;

    if (input.trim().length==0) { 
        return NaN;
    }
    return Number(input);
  }

  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
 
     return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
   }

}
