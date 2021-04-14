import { Component, OnInit } from '@angular/core';
import {AnimationBuilder, trigger,
  state,
  style,
  animate,
  transition,} from '@angular/animations';

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
 
move_button:any
 
  

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
  constructor(private animationBuilder:AnimationBuilder) { }

  ngOnInit(): void {
    this.currentSym1 = this.symbolReel[1];
    this.currentSym2 = this.symbolReel[2];
    this.currentSym3 = this.symbolReel[0]; 

    this.user=JSON.parse(localStorage.getItem('currentUser') || '{}')    
    this.user_name=this.user.username

    this.credits=this.user.credits
  }

spin(){
    let randomNum1 = Math.floor(Math.random() * (this.symbolReel.length));
    let randomNum2 = Math.floor(Math.random() * (this.symbolReel.length));
    let randomNum3 = Math.floor(Math.random() * (this.symbolReel.length));
    
    this.currentSym1 = this.symbolReel[randomNum1];
    this.currentSym2 = this.symbolReel[randomNum2];
    this.currentSym3 = this.symbolReel[randomNum3];
  }

  spinning(){
   if(this.credits > 0){
    this.stopSpin = setInterval(()=>{this.spin()},30);
    }else{
      alert("Credits are No more . You have to restart");
    } 
     
  }

  restart(){
    this.credits=10
  }

   winOrLose(){
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
}
