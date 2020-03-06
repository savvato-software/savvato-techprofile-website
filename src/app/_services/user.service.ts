import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	promise = undefined;
	currentUser = undefined;

  constructor(private _apiService: ApiService) {

  }

  getCurrentUser() {
  	return this.currentUser;
  }

  verifyAndLoginUser(username, password) {
	let self = this;
	let url = environment.apiUrl + "/api/authenticate";

	self.promise = new Promise(
		(resolve, reject) => {
			this._apiService.getWithUsernameAndPassword(url, username, password).subscribe(
				(userObj) => { 
					console.log("Credentials Valid! Setting current user to...");
					console.log(userObj);

					self.currentUser = userObj;

					resolve(userObj);
				 }, (err) => {
				 	reject(err);
				 });
		});

	return self.promise;
  }

  updateUserPassword(user, newPassword) {
	let data = "pw=" + newPassword;
	let url = environment.apiUrl + "/api/user/" + user['id'];

	return new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(b) => { 
				 	resolve(b);
				}, (err) => {
					reject(err);
				});
		});
  }

  getUserByEmailOrPhone(query) {
  	let url = environment.apiUrl + "/api/user?q=" + query;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("User query call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getCandidateByEmailOrPhone(query) {
  	let url = environment.apiUrl + "/api/user?q=" + query;

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
  	let url = environment.apiUrl + "/api/user/" + id;

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
