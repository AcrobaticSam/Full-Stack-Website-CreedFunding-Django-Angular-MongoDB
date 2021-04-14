import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';
const baseUrl = 'http://localhost:8080/api/campaigns';
const baseUrl2 = 'http://localhost:8080/api/campaigns/published';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  readonly APIUrl = "http://127.0.0.1:8080";
  readonly PhotoUrl = "http://127.0.0.1:8080/media/";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(baseUrl);
  }
  getAllHome(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(baseUrl);
  }
  getAllhomeCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(baseUrl2);
  }


  get(id: any): Observable<Campaign> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${baseUrl}?title=${title}`);
  }
  findByStatus(status: any): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${baseUrl}?category=${status}`);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SaveFile',val);
  }
}
