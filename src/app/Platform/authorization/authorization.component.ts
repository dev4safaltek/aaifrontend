import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { DefaultNumber } from 'src/app/Shared/Enums/Default.enums';
import { ManagePatientFamilyService } from '../../Services/manage-patient-family.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  
  constructor(){}

  ngOnInit(): void {
    }


}
