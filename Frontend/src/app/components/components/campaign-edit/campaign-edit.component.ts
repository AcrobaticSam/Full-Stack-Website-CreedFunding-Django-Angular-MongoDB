import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  campaign: Campaign = {
    title: '',
    description: '',
    category: '',
    subcategory: '',
    summary: '',
    details: '',
    intro: '',
    impact: '',
    targetammount: '',
    PhotoFileName: '',
    PhotoFileName2: '',
    PhotoFileName3: '',
    PhotoFilePath: '',
    PhotoFilePath2: '',
    PhotoFilePath3: '',
    targetDate: '',
    comment: '',
    published: false
  };
  currentCampaign: Campaign = {
    title: '',
    description: '',
    category: '',
    subcategory: '',
    summary: '',
    details: '',
    intro: '',
    impact: '',
    targetammount: '',
    PhotoFileName: '',
    PhotoFileName2: '',
    PhotoFileName3: '',
    PhotoFilePath: '',
    PhotoFilePath2: '',
    PhotoFilePath3: '',
    targetDate: '',
    comment: '',
    published: false
  };
  submitted = false;
  constructor(private campaignService: CampaignService, private datePipe: DatePipe, private cookieService: CookieService, private router: Router,    private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/login']);
    }
    this.getCampaign(this.route.snapshot.params.id);
  }
  saveCampaign(): void {
    const data = {
      title: this.campaign.title,
      targetammount: this.campaign.targetammount,
      targetDate: this.datePipe.transform(this.campaign.targetDate, 'yyyy-MM-dd'),
      category: this.campaign.category,
      description: this.campaign.description,
      PhotoFileName: this.campaign.PhotoFilePath,
      PhotoFileName2: this.campaign.PhotoFilePath2,
      PhotoFileName3: this.campaign.PhotoFilePath3,
      summary: this.campaign.summary,
      intro:  this.campaign.intro,
      impact: this.campaign.impact,
      details: this.campaign.details,
      subcategory: this.campaign.subcategory
    };

    this.campaignService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert("Done!")
        },
        error => {
          console.log(error);
          alert("oh boy!")
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
  updateCampaign(): void {

    //this.currentCampaign.raisedAmmount = Number(this.currentCampaign.raisedAmmount)+ Number(this.amount.value);
    this.campaignService.update(this.currentCampaign.id, this.currentCampaign)
      .subscribe(
        response => {
          console.log(response);
          //console.log(this.currentCampaign.raisedAmmount);

          alert("Campaign Updated!!")
        },
        error => {
          console.log(error);
          alert("oh no")
        });
  }


  newCampaign(): void {
    this.submitted = false;
    this.campaign = {
      title: '',
      description: '',
      PhotoFileName: '',
      PhotoFilePath: '',
      published: false
    };
  }

  uploadPhoto(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.campaignService.UploadPhoto(formData).subscribe((data: any) => {
      this.currentCampaign.PhotoFileName = this.campaignService.PhotoUrl + data.toString();
      this.currentCampaign.PhotoFilePath = this.currentCampaign.PhotoFileName;
    })
  }
  uploadPhoto2(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.campaignService.UploadPhoto(formData).subscribe((data: any) => {
      this.currentCampaign.PhotoFileName2 = this.campaignService.PhotoUrl +data.toString();
      this.currentCampaign.PhotoFilePath2 =  this.currentCampaign.PhotoFileName2;
    })
  }
  uploadPhoto3(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.campaignService.UploadPhoto(formData).subscribe((data: any) => {
      this.currentCampaign.PhotoFileName3 = this.campaignService.PhotoUrl + data.toString();
      this.currentCampaign.PhotoFilePath3 =  this.currentCampaign.PhotoFileName3;
    })
  }

}
