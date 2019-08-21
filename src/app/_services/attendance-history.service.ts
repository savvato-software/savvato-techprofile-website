import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { UserService } from './user.service'

import { environment } from '../../_environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AttendanceHistoryService {

	constructor(private _apiService: ApiService,
				private _userService: UserService) { 

	}

	get() {
	  	let userId = this._userService.getCurrentUser()["id"];
	  	let url = environment.apiUrl + "/api/attendance-history/" + userId;

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => { 
						console.log("Attendance history for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err) => {
						reject(err);
					});
			});

		return rtn;
	}
}
