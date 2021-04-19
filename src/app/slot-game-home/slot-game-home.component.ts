import { Component, OnInit } from '@angular/core';
import {AnimationBuilder, trigger,
  state,
  style,
  animate,
  transition,} from '@angular/animations';
 import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-slot-game-home',
  templateUrl: './slot-game-home.component.html',
  styleUrls: ['./slot-game-home.component.css'],
  animations:[
    trigger('btncaseout',[
      state('move', style({
        transform: 'translateX(300px) ',
      })),
      transition('state=>move',animate('3000ms ease')),
    ])
  ]

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

  currentSym1:any;
  currentSym2: any;
  currentSym3: any;
  user:string|any
  user_name:string|any
  credits: number|any;
  position:any
  slot1_eq_slot2: boolean=false
  slot2_eq_slot3: boolean=false
  slot1_eq_slot3: boolean=false
  stopSpin:any; 
  stopSpin1:any
  stopSpin2:any
  wins:number|any['']=[]
  totaltry:number=0
  isapin:boolean=false    
  
  

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
    this.totaltry=0
    this.totaltry++
    console.log("trying",this.totaltry)

    if(this.credits > 0){
        this.stopSpin=setInterval(()=> {this.currentSym1 = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))];},20)
        setTimeout(() => {clearInterval(this.stopSpin);}, 1000);

        this.stopSpin1=setInterval(()=> {this.currentSym2 = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))];},20)
        setTimeout(() => {clearInterval(this.stopSpin1);}, 2000);

        this.stopSpin2=setInterval(()=> {this.currentSym3 = this.symbolReel[Math.floor(Math.random() * (this.symbolReel.length))];},20)
        setTimeout(() => {clearInterval(this.stopSpin2); this.winOrLose()}, 3000);
    
    }
    else{
      alert("Credits are No more . You have to restart");
    } 
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
    }else{
       this.credits--
      alert("You have Lost!");
    }
   }

   changePosition(){
    this.position = "move"

  }

  stopSpinning(){
    clearInterval(this.stopSpin);
    this.winOrLose()
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
      }
  }
  restart(){
    this.credits=10
     //this.onClick()
  
  }


  
    public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  
 public pieChartLabels: string|any = ["total try"];
  public data: number|any = [this.totaltry];
  public pieChartType: string|any = "pie";
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }
  public chartHovered(e: any): void {
   // console.log(e);
  }
  
}
