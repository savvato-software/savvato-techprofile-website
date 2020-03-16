import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AlertService } from '../_services/alert.service'
import { UserService } from '../_services/user.service'
import { CareerGoalService } from '@savvato-software/savvato-javascript-services'
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'

@Component({
	selector: 'app-career-path',
	templateUrl: './career-path.page.html',
	styleUrls: ['./career-path.page.scss'],
})
export class CareerPathPage implements OnInit {

	// TODO: Rename this to career goal page

	// TODO: SkillsMatrixPage and CareerPathPage need to be in the same folder. They are very related.

	user = undefined;
	userId = undefined;	
	careerGoal = undefined;

	funcKey = "careerPathPageController"

	constructor(private _functionPromiseService: FunctionPromiseService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _alertService: AlertService,
		private _careerGoalService: CareerGoalService
		) { 

	}

	ngOnInit() {
		let self = this;

		self.user = self._userService.getCurrentUser();
		self.userId = self.user && self.user['id'];

		self._careerGoalService._init(environment);
		self._careerGoalService.getCareerGoalForUserId(self.userId).then((cg) => {
			if (cg === null) {
				// no career goal has been set
				self._alertService.show({
					header: 'Choose a Goal',
					message: "You will need to choose a goal first!<br/><br/>Its in the dropdown at the top.<br/><br/>You can change it at any time.",
					buttons: [
					{
						text: 'OK'
					}]
				})
			}

			self.careerGoal = cg;
		})

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getUser: () => {
						return self.user;
					},
					getCareerGoalProviderFunction: () => {
						return self.careerGoal;
					},
					getRoutePrefix: () => {
						return "skills-matrix";
					}
				});
			})
		})

		self._functionPromiseService.initFunc("getAllCareerGoals", () => {
			return new Promise((resolve, reject) => {
				self._careerGoalService.getAllCareerGoals().then((allCGs) => {
					resolve(allCGs);
				})
			})
		})
	}

	getCareerPathComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	}

	getAllCareerGoals() {
		return this._functionPromiseService.get("getAllCareerGoals", "getAllCareerGoals", { });
	}

	onSelectedCareerGoalChange(evt) {
		let self = this;
		self._careerGoalService.getCareerGoalById(evt.currentTarget.value).then((cg) => {
			self.careerGoal = cg;
		});
	}

	careerGoalIsSelected() {
		return !!this.careerGoal;
	}
}
