import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import {AnimationBuilder, trigger,
  state,
  style,
  animate,
  transition,} from '@angular/animations';
 import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-slot-game-home',
  templateUrl: './slot-game-home.component.html',
  styleUrls: ['./slot-game-home.component.css'],
   animations: [
    trigger('btnState', [
      state(
        'move',
        style({
          transform: 'translate3d(300px,50px,0)',
        })
      ),
      state(
        'state2',
        style({
          transform: 'translate3d(300px,50px,0)',
        })
      ),

      transition('state=>state2', animate('1s ease-in')),
      transition('state2=>state',animate('1s ease-in')),
   ]),

  ],
})
export class SlotGameHomeComponent implements OnInit {
 
   symbolReel:any[] = [{
    value: "C",
    symbolLink: "/assets/Images/cheery.jpg",
    credits:10
    }, 
    {
    value: "L",
    symbolLink: "/assets/Images/lemon3.png",
     credits:20
    }, 
    {
    value: "O",
    symbolLink: "/assets/Images/orange.jpg",
    credits:30
  }, {
    value: "W",
    symbolLink: "/assets/Images/w.jpg",
    credits:40
  }];
 @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild('panel') public panel:ElementRef;
  currentSym1:any;
  currentSym2: any;
  currentSym3: any;
  user:string|any
  user_name:string|any
  credits: number|any;

  slot1_eq_slot2: boolean=false
  slot2_eq_slot3: boolean=false
  slot1_eq_slot3: boolean=false
  stopSpin:any; 
  stopSpin1:any
  stopSpin2:any
   isapin:boolean=false
  totaltry:number|any= 0;
  wintry:number|any=0;
  position: string|any;
  position1:string|any;
  currentState:any
  btnDisabled:boolean|any=false

   
  public pieChartLabels: string|any = ["Total Try"," Success Try"];
  public data: number|any = [this.totaltry,this.wintry];
  public pieChartType: string|any = "pie";

  

     h:any 
      w:any
   
  
  
  constructor(private animationBuilder:AnimationBuilder) { }

  ngOnInit(): void {
    this.currentSym1 = this.symbolReel[1];
    this.currentSym2 = this.symbolReel[2];
    this.currentSym3 = this.symbolReel[0]; 
    this.user=JSON.parse(localStorage.getItem('currentUser') || '{}')    
    this.user_name=this.user.username
    this.credits=this.user.credits
  }

obj_spin1(){
   this.isapin=true
    this.btnDisabled=false
  if(this.credits>0){
 this.stopSpin= setInterval(() => {
        setTimeout(() => {this.currentSym1 = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))]},1000);
      }, 10);

        setTimeout(() => {
        clearInterval(this.stopSpin);
      }, 1000);

  this.stopSpin1=setInterval(() => {
        setTimeout(() => {this.currentSym2  = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))] },2000);
      }, 10);
      setTimeout(() => {
        clearInterval(this.stopSpin1);
      }, 2000);

  this.stopSpin2=setInterval(() => {
        setTimeout(() => {this.currentSym3 = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))] },3000);
      }, 10 );
      setTimeout(() => {
        clearInterval(this.stopSpin2);
      }, 3000);
      setTimeout(()=>{this.winOrLose()},6500)
  }
else{
  alert("Insufficent credits .. Restart game")
}
       this.totaltry++;
 console.log("total try::",this.totaltry)
 this.chart_update()
}

   
winOrLose(){    
  this.isapin=false
  this.slot1_eq_slot2 = (this.currentSym1.value == this.currentSym2.value);
  this.slot2_eq_slot3 = (this.currentSym2.value == this.currentSym3.value);
  this.slot1_eq_slot3 = (this.currentSym1.value == this.currentSym3.value);

if(this.slot1_eq_slot2 && this.slot2_eq_slot3 && this.slot1_eq_slot3){
     
      if(this.slot1_eq_slot2){
        this.credits += this.currentSym1.credits ;
      }else if(this.slot2_eq_slot3){
        this.credits += this.currentSym3.credits;
      }else if(this.slot1_eq_slot3){
        this.credits += this.currentSym2.credits;
      }
      alert("You WON!");
      this.wintry++
      console.log("success try::",this.wintry)
      this.chart_update()
    }else{
       this.credits--
      alert("You have Lost!");
     
    }
   }
   chart_update(){
        setTimeout(() => {
           this.chart.chart.data.datasets[0].data=[this.totaltry,this.wintry]
            this.chart.update()
        }, 50);  
   }
disableButton(){
    var rand =  Math.floor(Math.random() * 3);
    setTimeout(() => {
      this.btnDisabled= true;
    }, rand * 3000);
  }
   changePosition(){
    this.position = 'state2';
    this.currentState = this.currentState === 'initial'?'final':'initial';
    this.panel.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.disableButton();
  }

   existing:any = JSON.parse(localStorage.getItem('users') || '[]')
    onClick() {
      let index = this.existing.findIndex((x:any) => x.id===this.user.id);
      console.log("index",index)
      console.log("existing user",this.existing)
      if ( index>-1) {
            this.user.credits=this.credits
            this.existing.splice(index, 1, this.user);
            console.log("user===",this.user)
            console.log("existing user====",this.existing) 
            localStorage.setItem('users', JSON.stringify( this.existing));
             localStorage.setItem('currentUser', JSON.stringify( this.user));
             alert("Your credits now :"+this.credits)
      }
  }
  restart(){
    this.credits=10
    this.isapin=false
     //this.onClick()
  
  } 
  public chartClicked(e: any): void {
    //console.log(e);
  }
  public chartHovered(e: any): void {
    //console.log(e);
  }
    public pieChartOptions: ChartOptions = {
    responsive: true,
  };
}
