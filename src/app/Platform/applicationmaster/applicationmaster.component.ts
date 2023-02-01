import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { DefaultNumber } from 'src/app/Shared/Enums/Default.enums';
import { ManagePatientFamilyService } from '../../Services/manage-patient-family.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-applicationmaster',
  templateUrl: './applicationmaster.component.html',
  styleUrls: ['./applicationmaster.component.css']
})
export class ApplicationMasterComponent implements OnInit {
  
  constructor(){}

  ngOnInit(): void {
    }


}
