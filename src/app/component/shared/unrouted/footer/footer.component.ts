import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public oIconService: IconService) { }

  ngOnInit() {
  }

}
