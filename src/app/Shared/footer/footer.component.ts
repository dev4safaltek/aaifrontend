import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year:any;
  text:any;
  constructor() { }

  ngOnInit(): void {
    this.year = environment.footeryear;
    this.text = "© "+this.year+" AAI";
  }

}
