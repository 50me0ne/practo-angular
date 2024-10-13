import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponseModel, Hospital, User } from './core/classes/Hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from './core/services/hospital.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userObj:User=new User();
  private hospitalSrv=inject(HospitalService);
  loggedHospitalData:Hospital=new Hospital();

  constructor(private router:Router){
    const loggedData=localStorage.getItem("practoLogin");
    if(loggedData!=null){
      this.loggedHospitalData=JSON.parse(loggedData);
    }
  }

  showLogin(){
    const model=document.getElementById("logInModal");
    if(model!=null){
      model.style.display="block";
    }
  }

  closeLogin(){
    const model=document.getElementById("logInModal");
    if(model!=null){
      model.style.display="none";
    }
  }

  onLogin(){
    this.hospitalSrv.logIn(this.userObj).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        this.loggedHospitalData=res.data
        localStorage.setItem("practoLogin", JSON.stringify(res.data));
        this.closeLogin();
      }else{
        alert(res.message);
      }
    });
  }
  logOut(){
    localStorage.removeItem("practoLogin");
    this.loggedHospitalData=new Hospital();
    this.router.navigateByUrl("home");
  }
}
