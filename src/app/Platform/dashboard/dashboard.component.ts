import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultNumber } from 'src/app/Shared/Enums/Default.enums';
import { ManagePatientFamilyService } from '../../Services/manage-patient-family.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor() {

  }

  ngOnInit(): void {
    }

 

}
