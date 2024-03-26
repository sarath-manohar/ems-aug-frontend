import { Component } from '@angular/core';
import { UserSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  p: number = 1;
  searchKey:string=""
allUsers:UserSchema[]=[]

constructor(private api:ApiService,private toastr:ToastrService){}

ngOnInit():void{
  this.getAllUsersList()
}


getAllUsersList(){
  this.api.getAllUsersAPI().subscribe({
    next:(result:any)=>{
     debugger;
      this.allUsers = result
      console.log( this.allUsers);
    },
    error:(reson:any)=>{
      console.log(reson);
      
    }
  })
}

deleteUser(id:any){
  this.api.removeUserAPI(id).subscribe(
    (res:any)=>{
      this.toastr.success("user removed")
      this.getAllUsersList()
    }
  )
}

generatePDF(){
  let pdf = new jspdf()
  let head = [['EmpId','Username','Email','Status']]
  let body:any =[]
   this.allUsers.forEach((item:any)=>{
    if(item.id!='1'){
      body.push([item.empid,item.name,item.email,item.status])
    }
   })
   pdf.setFontSize(16)
   pdf.text('All Users List',10,10)
   autoTable(pdf,{head,body})
   pdf.output('dataurlnewwindow')
   pdf.save('alluserslist.pdf')
}

sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
}

sortById(){
   this.allUsers.sort((user1:any,user2:any)=>user1.empid.localeCompare(user2.name))
}

}
