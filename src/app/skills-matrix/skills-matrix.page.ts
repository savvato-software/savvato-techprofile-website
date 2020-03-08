import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FunctionPromiseService } from 'savvato-javascript-services'

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-skills-matrix',
  templateUrl: './skills-matrix.page.html',
  styleUrls: ['./skills-matrix.page.scss'],
})
export class SkillsMatrixPage implements OnInit {

	funcKey = "skillsMatrixPageController"

	constructor(private _functionPromiseService: FunctionPromiseService,
			    private _router: Router,
			    private _route: ActivatedRoute
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
							}
					})
				})
			})
		})
	}

	getTechProfileUserHistoricalViewController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });		
	}

}
