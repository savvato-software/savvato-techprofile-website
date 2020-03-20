import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../_services/user.service'
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-skills-matrix',
  templateUrl: './skills-matrix.page.html',
  styleUrls: ['./skills-matrix.page.scss'],
})
export class SkillsMatrixPage implements OnInit {


	// TODO: SkillsMatrixPage and CareerPathPage need to be in the same folder. They are very related.


	funcKey = "skillsMatrixPageController"

	constructor(private _functionPromiseService: FunctionPromiseService,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _location: Location,
			    private _userService: UserService
				) { 

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getUser: () => {
								return self._userService.getCurrentUser();
							},
							getRoutePrefix: () => {
								return "skills-matrix";
							}
					});
				})
			})
		})
	}

	getTechProfileUserHistoricalViewController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });		
	}

	onBackBtnClicked() {
		this._location.back();
	}
}
