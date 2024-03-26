import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

 @Output() onAdminChange = new EventEmitter()

  adminDetails:any={}
  editAdminStatus:boolean = false
  profilePicture:string ="https://cdn2.iconfinder.com/data/icons/web-hosting-19/50/70-512.png"

 constructor (private adminAPI:AdminService,private toastr:ToastrService){

 }

 ngOnInit(): void {
   this.adminAPI.getAdminDetails().subscribe((res:any)=>{
    this.adminDetails = res

if(res.profilePic){
  this.profilePicture=res.profilePic
}  
})
 }

  editAdminBtn(){
    this.editAdminStatus = true
  }

  onCancel(){
    this.editAdminStatus=false
  }

  getFile(event:any){
    let file = event.target.files[0]
    let fr =new FileReader()
    fr.readAsDataURL(file)
    fr.onload= (event:any)=>{
      console.log(event.target.result);
      this.profilePicture=event.target.result
      this.adminDetails.profilePic=event.target.value
      
    }
  }
  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toastr.success("admin details updated")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any)=>{
        this.toastr.warning("update failed..please try after some time")
      }
    })
  }
}
