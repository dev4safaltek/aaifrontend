import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultNumber } from 'src/app/Shared/Enums/Default.enums';
import { ManagePatientFamilyService } from '../../Services/manage-patient-family.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  authorizationForm!: FormGroup;
  hide : boolean = false;
  // mat Table settings
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ["action","fund", "act","section", "counsel", "amount", "date","active"];  
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  recordcount: number = DefaultNumber.Zero;
  pagesize = environment.defaultPageSize;
  totalPages = environment.defaultshowTotalPages;
  pageIndex: number = DefaultNumber.Zero;
  pageSizeList = environment.pageSizeList;
  pageChangeEvent(event:any) {}

  
  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.CreateFormGroup();
    }

    CreateFormGroup(): void {
      this.authorizationForm = this.fb.group({
        Search: new FormControl("")
      })
    }

    GetUserList(){
       this.dataSource =  new MatTableDataSource();
       this.dataSource.paginator = this.paginator;
       this.recordcount =  this.dataSource.data.length > 0 ? this.dataSource.data.length :0;
       if(this.recordcount>0)
       {
         this.hide= true;
       }
       else{
         this.hide = false;
       }
    }

    deleteUser(id:any){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // this._manageUserService.DeleteUser(id).subscribe((response:any) => {
          //   if(response.message='OK'){
          //     Swal.fire(
          //       'Deleted!',
          //       'User has been deleted.',
          //       'success'
          //     )
          //     this.GetUserList();
          //   }
          // })
        }
      })
    }

    ActiveDeactiveUser(UserId:any,value:any){
    }

    BlockUnBlockUser(UserId:any,value:any){
     
    }

    //--Client-Side Sorting
    sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a:any,b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {        
        case 'name': return compare(a.EmpName, b.EmpName, isAsc);
        case 'title': return compare(a.Title, b.Title, isAsc);
        case 'email': return compare(a.Email, b.Email, isAsc);
        case 'userName': return compare(a.UserName, b.UserName, isAsc);
        case 'role': return compare(a.RoleName, b.RoleName, isAsc);
        default: return 0;
      }
    });
    } 

 

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
