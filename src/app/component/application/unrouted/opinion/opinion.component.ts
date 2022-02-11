import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/opinion-interfaces';
import { OpinionService } from 'src/app/service/opinion.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit {

  oPost: IPost;

  constructor(
    private oOpinionService: OpinionService
  ) { }

  ngOnInit(): void {

    this.getOne();
  }

  getOne = () => {
    this.oOpinionService
      .get(1)
      .subscribe((oData: IPost) => {
        this.oPost = oData;
        console.log(this.oPost);

      });
  };
}
