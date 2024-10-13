import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Constant } from '../constant/constant';
import { ApiResponseModel, Hospital, User } from '../classes/Hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  registerHospital(obj:Hospital):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(environment.api_url+Constant.API_END_POINT.ADD_NEW_HOSPITAL,obj);
  }

  logIn(obj:User):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(environment.api_url+Constant.API_END_POINT.LOGIN,obj);
  }
}
