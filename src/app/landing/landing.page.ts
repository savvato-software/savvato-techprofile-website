import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute) {

	}

	ngOnInit() {
	
	}

	onLoginBtnTap(evt) {
		this._router.navigate(['/login']);
	}
}
