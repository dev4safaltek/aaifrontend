import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../../auth/auth.service";
import {ChartComponent,ApexAxisChartSeries,ApexNonAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle,
  ApexDataLabels,ApexPlotOptions,ApexTooltip,ApexStroke,ApexLegend,ApexFill,ApexStates,ApexResponsive,} from "ng-apexcharts";
import { DashboardService } from '../../Services/dashboardService/dashboard.service';
import { DefaultNumber } from 'src/app/Shared/Enums/Default.enums';
import { ResponseStatus } from '../../Model/ResponseStatusModel';
import { DropdownList } from '../../Model/DropDownModel';
import { ManagePatientFamilyService } from '../../Services/manage-patient-family.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
  states: ApexStates;
  responsive: ApexResponsive[];
  labels: any;
};

// for donut chart
export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels; 
  colors: any[]; 
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashBoardForm!: FormGroup;
  userName: any;
  userId : any;
  loaderflag :boolean = false;  
  agencyList:DropdownList[] =[];
  dataSource:any[];
  tab1Data :any[];
  tab2Data :any[];
  tab3Data :any[];
  tab4Data :any[];

  totalClients:number=0;
  totalAgency:number=0;
  totalCaregiver:number=0;
  totalReferral:number=0;

  totalReferralShift:number=0;
  totalAgencyShift:number=0;
  totalCaregiverShift:number=0;
  totalPatientShift:number=0;
  totalOverAllShift:number =0
  donut1data:any[]= [50,50]
  donut2data:any[]= [50,50]
  donut3data:any[]= [50,50]
  donut4data:any[]= [50,50]
  donut5data:any[]= [50,50]

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public ReviewChartOptions: Partial<ChartOptions>;
  public donutchartOptions: Partial<DonutChartOptions>;
  constructor(
    public authService: AuthService,
    public dashboardService : DashboardService,
    private _AddPatientFamilyService :ManagePatientFamilyService,
    private fb: FormBuilder) {

    // review chart
    this.ReviewChartOptions = {
      series: [
        {
          name: "Caregivers",
          data: [30, 68, 28, 60, 42, 65, 45,25,15,40,48,50],
          color: "#e91e63",
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false
        },
      },
      legend: {
        position: 'top',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        colors: undefined,
        opacity: 0.3,
      },
      xaxis: {
        // type: "datetime",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sept","Oct","Nov","Dec"]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },

      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 340,
            },      
          },
        },
        {
          breakpoint: 767,
          options: {
            chart: {
              height: 250,
            },      
          },
        },
      ],
    };


    // do'nt send again chart
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [10, 20, 40, 60, 110, 62, 30, 10],
          color: "#D3E9FF",
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        }
      },
      title: {
        text: ""
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          dataLabels: {
            position: "top",
          }
        }
      },

      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 1,
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'darken',
            value: 1,
          }
        },
      },

      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        style: {
          fontSize: "10px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
      },
      // tooltip: {
      //   y: {
      //     formatter: function (val) {
      //       return "$ " + val + "";
      //     }
      //   }
      // }
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="arrow_box">' +
            "<span>" +
            series[seriesIndex][dataPointIndex] +
            "</span>" +
            "</div>"
          );
        }
      },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 300,
            },      
          },
        },
        {
          breakpoint: 767,
          options: {
            chart: {
              height: 250,
            },      
          },
        },
      ],
    };

        // donut chart 
     this.donutchartOptions = {
          series: [],
          chart: {
            width: 180,
            height: 180,
            type: 'donut',
          },
          legend: {
            show: false,
          },
          dataLabels: { 
            enabled: false,
          },     
          // colors: ['#0B62A4', '#679DC6'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  show: false, 
                },
              },
            },
          ],
        };


  }

  ngOnInit(): void {
    this.userName = this.authService.fullUserName;
    this.userId = this.authService.userID;
    this.CreateFormGroup();
    this.getDashboardData();
    this.GetAgencyDropDownList()
  }

  CreateFormGroup(): void {
    this.dashBoardForm = this.fb.group({    
      AgencyId: new FormControl(""),
    })
  }

  GetAgencyDropDownList(){
    this.loaderflag=true;
    this._AddPatientFamilyService.GetPatientDropDownListService().subscribe((response:ResponseStatus<DropdownList[]>)=>{
     if(response.data!=null){
      this.loaderflag=false;
      this.agencyList = response.data;
      this.agencyList = this.agencyList.filter(p=>p.FlagId == DefaultNumber.Seven)
     // this.agencyList.unshift({ FlagId: DefaultNumber.Seven, Label: "Please Select", Id: "" });
     }
     else{
      this.loaderflag=false;
     }
    })  
   } 
  

  getDashboardData() {
     this.loaderflag = true;
     let AgencyId= this.dashBoardForm.controls['AgencyId'].value;
     let OfficeId =1;
     this.dashboardService.GetCareCoordinatorDashboardService(AgencyId,OfficeId).subscribe((response: any) => {
      if(response.data !=null){
        this.loaderflag = false;
      //debugger
      this.dataSource = response.data;
      //------------------Tab1
      this.tab1Data = this.dataSource.filter(p=>p.FlagId == DefaultNumber.One)
      this.totalAgency = this.tab1Data[0].Column1;
      this.totalCaregiver = this.tab1Data[0].Column2;
      this.totalReferral = this.tab1Data[0].Column3;
      this.totalClients = this.tab1Data[0].Column4;
      //------------------Tab2
      this.tab2Data = this.dataSource.filter(p=>p.FlagId == DefaultNumber.Two);
      this.totalOverAllShift = Number(this.tab2Data[0].Column9) + Number(this.tab2Data[0].Column10);
      this.CalulatePercentage5(Number(this.tab2Data[0].Column9),Number(this.tab2Data[0].Column10));

      this.totalPatientShift = Number(this.tab2Data[0].Column7) + Number(this.tab2Data[0].Column8);
      this.CalulatePercentage4(Number(this.tab2Data[0].Column7),Number(this.tab2Data[0].Column8));

      this.totalCaregiverShift = Number(this.tab2Data[0].Column5) + Number(this.tab2Data[0].Column6);
      this.CalulatePercentage3(Number(this.tab2Data[0].Column5),Number(this.tab2Data[0].Column6));

      this.totalAgencyShift = Number(this.tab2Data[0].Column3) + Number(this.tab2Data[0].Column4);
      this.CalulatePercentage2(Number(this.tab2Data[0].Column3),Number(this.tab2Data[0].Column4));

      this.totalReferralShift = Number(this.tab2Data[0].Column1) + Number(this.tab2Data[0].Column2);
      this.CalulatePercentage1(Number(this.tab2Data[0].Column1),Number(this.tab2Data[0].Column2));

      //------------------Tab3
      this.tab3Data = this.dataSource.filter(p=>p.FlagId == DefaultNumber.Three)
      //------------------Tab4
      this.tab4Data = this.dataSource.filter(p=>p.FlagId == DefaultNumber.Four)
      
      
     }
     else{
      this.loaderflag = false;
     }
    })
  }

  CalulatePercentage1(value1:any,value2:any){
    this.donut1data =[];
    let divident = ((value1-value2)/((value1+value2)/2));
    let totalpercent = divident *100;
    if(totalpercent>100){
    //--------decrease value
    let divident2 = (value1-value2)/value1;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut1data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut1data.push(this.numberRoundDecimal(totalpercent2,0));
    }
    else{
      
    let divident2 = (value2-value1)/value2;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut1data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut1data.push(this.numberRoundDecimal(totalpercent2,0));


      // this.donut1data.push(50);
      // this.donut1data.push(50);
    }
  }

  CalulatePercentage2(value1:any,value2:any){
    debugger
    this.donut2data =[];
    let divident = ((value1-value2)/((value1+value2)/2));
    let totalpercent = divident *100;
    if(totalpercent>100){
    //--------decrease value
    let divident2 = (value1-value2)/value1;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut2data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut2data.push(this.numberRoundDecimal(totalpercent2,0));
    }
    else{
      let divident2 = (value2-value1)/value2;
      let totapercent1 = divident2 *100;
      let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
      this.donut2data.push(this.numberRoundDecimal(totapercent1,0));
      this.donut2data.push(this.numberRoundDecimal(totalpercent2,0));

      //this.donut2data.push(50);
      //this.donut2data.push(50);
    }
  }

  CalulatePercentage3(value1:any,value2:any){
    this.donut3data =[];
    let divident = ((value1-value2)/((value1+value2)/2));
    let totalpercent = divident *100;
    if(totalpercent>100){
    //--------decrease value
    let divident2 = (value1-value2)/value1;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut3data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut3data.push(this.numberRoundDecimal(totalpercent2,0));
    }
    else{
      let divident2 = (value2-value1)/value2;
      let totapercent1 = divident2 *100;
      let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
      this.donut3data.push(this.numberRoundDecimal(totapercent1,0));
      this.donut3data.push(this.numberRoundDecimal(totalpercent2,0));
      //this.donut3data.push(50);
      //this.donut3data.push(50);
    }
  }

  
  CalulatePercentage4(value1:any,value2:any){
    this.donut4data =[];
    let divident = ((value1-value2)/((value1+value2)/2));
    let totalpercent = divident *100;
    if(totalpercent>100){
    //--------decrease value
    let divident2 = (value1-value2)/value1;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut4data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut4data.push(this.numberRoundDecimal(totalpercent2,0));
    }
    else{
      let divident2 = (value2-value1)/value2;
      let totapercent1 = divident2 *100;
      let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
      this.donut4data.push(this.numberRoundDecimal(totapercent1,0));
      this.donut4data.push(this.numberRoundDecimal(totalpercent2,0));
      //this.donut4data.push(50);
      //this.donut4data.push(50);
    }
  }
  CalulatePercentage5(value1:any,value2:any){
    this.donut5data =[];
    let divident = ((value1-value2)/((value1+value2)/2));
    let totalpercent = divident *100;
    if(totalpercent>100){
    //--------decrease value
    let divident2 = (value1-value2)/value1;
    let totapercent1 = divident2 *100;
    let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
    this.donut5data.push(this.numberRoundDecimal(totapercent1,0));
    this.donut5data.push(this.numberRoundDecimal(totalpercent2,0));
    }
    else{
      let divident2 = (value2-value1)/value2;
      let totapercent1 = divident2 *100;
      let totalpercent2 = 100-this.numberRoundDecimal(totapercent1,0);
      this.donut5data.push(this.numberRoundDecimal(totapercent1,0));
      this.donut5data.push(this.numberRoundDecimal(totalpercent2,0));
      //this.donut5data.push(50);
      //this.donut5data.push(50);
    }
  }


  numberRoundDecimal(v:any,n:any) {
    return Math.round((v+Number.EPSILON)*Math.pow(10,n))/Math.pow(10,n)
  }



}
