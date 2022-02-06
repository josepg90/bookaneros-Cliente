import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss']
})
export class StarRateComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor() { }

  ngOnInit(): void {
  }

  countStar(star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

}
