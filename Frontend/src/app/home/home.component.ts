import { Component, OnInit } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { CampaignService } from '../services/campaign.service';
import SwiperCore from 'swiper/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  campaigns?: Campaign[];
  currentCampaign?: Campaign;
  currentIndex = -1;
  term = "Creative Works";
  ispub = "featured";
  constructor(private campaignService: CampaignService) {
    this.loadScripts(); 
    
  }

  ngOnInit(): void {
    this.retrieveHomeCampaigns();
  }

  retrieveHomeCampaigns(): void {
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
    this.retrieveHomeCampaigns();
    this.currentCampaign = undefined;
    this.currentIndex = -1;
  }
  
  searchTitle(): void {
    this.campaignService.findByStatus(this.term)
      .subscribe(
        data => {
          this.campaigns = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
 
     return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) -Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
   }

   // Method to dynamically load JavaScript 
   loadScripts() { 
  
    // This array contains all the files/CDNs 
    const dynamicScripts = [ 
       
       'assets/vendor/swiper/swiper-bundle.min.js',
       'assets/js/main.js'

    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } 
 }

}
