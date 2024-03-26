import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 email:string=""
 password:string=""

 constructor(private toastr: ToastrService,private api:AdminService,private router:Router) {

 }


 login(){
  // define logic to done login
if (this.email && this.password){
  // this.toastr.success("proceed to api call")
  this.api.getAdminDetails().subscribe({
    next:(res:any)=>{
      console.log(res);
      const {email,password}=res
      if(email==this.email && password==this.password){
        this.toastr.success("login success")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.email=""
        this.password=""

        // navigate
        this.router.navigateByUrl("/dashboard")
      }else{
        this.toastr.error("invalid email/password")
      }
      
    },
    error:(reson:any)=>{
      console.log(reson);
      
    }
  })
}else{
  this.toastr.info("please fill missing fields")
}
  
 }
}
