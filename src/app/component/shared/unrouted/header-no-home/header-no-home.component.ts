import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-no-home',
  templateUrl: './header-no-home.component.html',
  styleUrls: ['./header-no-home.component.scss']
})
export class HeaderNoHomeComponent implements OnInit {

  @Input() title: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
