import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	promise = undefined;

  constructor(private _apiService: ApiService) {

  }

  createNewUser(name, phone, email) {
  	let url = environment.apiUrl + "/api/candidate/new";
  	let data = "name=" + name;

  	if (phone) {
  		data += "&phone=" + phone;
  	}

  	if (email) {
  		data += "&email=" + email;
  	}

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(data) => { 
					console.log("New Account Saved!");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  verifyAndLoginUser(username, password) {
	let self = this;
	let url = environment.apiUrl + "/api/verifyCredentials";

	self.promise = new Promise(
		(resolve, reject) => {
			this._apiService.getWithUsernameAndPassword(url, username, password).subscribe(
				(userObj) => { 
					console.log("Credentials Valid!");
					resolve(userObj);
				 }, (err) => {
				 	reject(err);
				 });
		});

	return self.promise;
  }

  getCandidateByEmailOrPhone(query) {
  	let url = environment.apiUrl + "/api/candidate?q=" + query;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("Candidate query call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getCandidateById(id) {
  	let url = environment.apiUrl + "/api/candidate/" + id;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("Candidate by id call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  isPhoneNumberAvailable(ph) {
  	return new Promise((resolve, reject) => { return false; });
  }

  isEmailAddressAvailable(ph) {
  	return new Promise((resolve, reject) => { return false; });
  }

  sendCodeToPhoneNumber(ph) {
  	// do somethin
  }

  isAValidSMSChallengeCode(ph, code) {
  	return new Promise((resolve, reject) => { return true; });
  }

  changeLostPassword(code, ph, pw) {
	return new Promise((resolve, reject) => { return {id: -1}; });  
  }

}
