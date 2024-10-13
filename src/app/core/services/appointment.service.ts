import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseModel, Appointment } from '../classes/Hospital.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  newAppointment(obj:Appointment):Observable<ApiResponseModel>{
    return this.http.post<ApiResponseModel>(environment.api_url+Constant.API_END_POINT.NEW_APPOINTMENT,obj);
  }

  getAppointmentsByHospital(id:number):Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(environment.api_url+Constant.API_END_POINT.GET_APPOINTMENTS_BY_HOSPITAL+id);
  }

  getAppointments():Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(environment.api_url+Constant.API_END_POINT.GET_APPOINTMENTS);
  }
}
