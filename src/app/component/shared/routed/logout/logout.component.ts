import { SessionService } from './../../../../service/session.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
    private oSessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  public closeSession() {
    this.oSessionService.logout().subscribe(data => {
      localStorage.clear();
      this.oRouter.navigate(['/home']);
    });
  }

  goBack() {
    this._location.back();
  }

}
