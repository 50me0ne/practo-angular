import { Component,OnInit } from '@angular/core';
import { ApiResponseModel, Appointment, User } from '../../core/classes/Hospital.model';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  newAppointment:Appointment=new Appointment();
  appointmentList:Appointment[]=[];
  loggedUserData:User=new User;

  constructor(private appointmentSrv: AppointmentService){
    const loggedData=localStorage.getItem("practoLogin");
    if(loggedData!=null){
      this.loggedUserData=JSON.parse(loggedData);
      this.newAppointment.hospitalId=JSON.parse(loggedData).hospitalId;
    }
  }

  ngOnInit():void{
    this.loadGrid();
  }

  loadGrid(){
    if(this.loggedUserData.userName=="superadmin"){
      this.getAllAppointments();
    }else{
      this.getAllAppointmentsByHospital();
    }
  }

  bookAppointment(){
    this.appointmentSrv.newAppointment(this.newAppointment).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert("Appointment Created");
        this.loadGrid();
      }else{
        alert(res.message);
      }
    });
  }

  getAllAppointmentsByHospital(){
    this.appointmentSrv.getAppointmentsByHospital(this.newAppointment.hospitalId).subscribe((res:ApiResponseModel)=>{
      this.appointmentList=res.data;
    });
  }

  getAllAppointments(){
    this.appointmentSrv.getAppointments().subscribe((res:ApiResponseModel)=>{
      this.appointmentList=res.data;
    });
  }
}
