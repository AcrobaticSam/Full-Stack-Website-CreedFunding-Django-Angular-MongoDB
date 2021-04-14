import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

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
  submitted = false;
  constructor(private campaignService: CampaignService, private datePipe: DatePipe, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/login']);
    }
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
          Swal.fire('Done!', 'Campaign Sent for Admin Aprroval!', 'success')
          //this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          Swal.fire('Error!', 'Something went wrong!', 'error')
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
      this.campaign.PhotoFileName = data.toString();
      this.campaign.PhotoFilePath = this.campaignService.PhotoUrl + this.campaign.PhotoFileName;
    })
  }
  uploadPhoto2(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.campaignService.UploadPhoto(formData).subscribe((data: any) => {
      this.campaign.PhotoFileName2 = data.toString();
      this.campaign.PhotoFilePath2 = this.campaignService.PhotoUrl + this.campaign.PhotoFileName2;
    })
  }
  uploadPhoto3(event) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.campaignService.UploadPhoto(formData).subscribe((data: any) => {
      this.campaign.PhotoFileName3 = data.toString();
      this.campaign.PhotoFilePath3 = this.campaignService.PhotoUrl + this.campaign.PhotoFileName3;
    })
  }



}
