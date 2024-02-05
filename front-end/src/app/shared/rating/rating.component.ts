import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating!:number;
  ratingFilled=[];
  ratingEmpty=[];
  ngOnInit(): void {
     for(let i=0;i<this.rating;i++){
       this.ratingFilled.push(i as never);
     }
     for(let i=0;i<5-this.rating;i++){
       this.ratingEmpty.push(i as never);
     }
  }
}
