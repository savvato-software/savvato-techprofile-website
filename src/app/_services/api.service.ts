import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Events } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	
	currentUser = undefined;

	constructor(private _http: HttpClient, private _events: Events, private _platform: Platform) {
		this._events.subscribe('app:login', (currentUser) => { this.currentUser = currentUser; });
		this._events.subscribe('app:currentUserPasswordChanged', (currentUser) => {	this.currentUser = currentUser;	})
	}

	getHeaders(username, password) {
		let httpHeaders = new HttpHeaders()
			.set("Authorization", "Basic " + btoa(username + ":" + password))
			.set("Content-Type", "application/x-www-form-urlencoded");

		return { headers: httpHeaders };
	}

	getAuthHeadersForCurrentUser() {
		let httpHeaders = new HttpHeaders()
			.set("Authorization", "Basic " + btoa(this.currentUser["name"] + ":" + this.currentUser["password"]));

		return httpHeaders;
	}

	get(url: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

	    return this.getWithUsernameAndPassword(url, username, password);
	}

	getWithUsernameAndPassword(url: string, uName: string, uPW: string) {
		let httpHeaders = this.getHeaders(uName, uPW);
		
		if (this._platform.is('ios'))
			return this._http.get(url, httpHeaders) // TODO.. figure out how to do this on ios.. was '.timeout(5000);'
		else
			return this._http.get(url, httpHeaders);
	}

	getUnsecuredAPI(url: string) {
		//let httpHeaders: HttpHeaders = new HttpHeaders();
		return this._http.get(url);
	}

	post(url: string, data: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

		let httpHeaders = this.getHeaders(username, password);
	    return this._http.post(url, data, httpHeaders);
	}

	postUnsecuredAPI(url: string, data: string) {
		let httpHeaders: HttpHeaders = new HttpHeaders({}); 
		httpHeaders.set("Content-Type", "application/x-www-form-urlencoded");

		return this._http.post(url + "?" + data, data, { headers: httpHeaders});
	}

	delete(url: string) {
		let user = this.currentUser;

	    let username: string = user["name"];
	    let password: string = user["password"];

		let httpHeaders = this.getHeaders(username, password);

	    return this._http.delete(url, httpHeaders);
	}
}