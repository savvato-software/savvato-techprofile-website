import { Component, OnInit } from '@angular/core';

import { AttendanceHistoryService } from '../../app/_services/attendance-history.service';
import { UserService } from '../../app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	attendanceHistoryList = undefined;

	constructor(private _attendanceHistoryService: AttendanceHistoryService
				,private _userService: UserService) {

	}

	ngOnInit() {

	}

	getAttendanceHistoryItems() {
		if (this.attendanceHistoryList === undefined) {
			this.attendanceHistoryList = null;

			this._attendanceHistoryService.get().then((list) => {
				this.attendanceHistoryList = list;
			})
		}

		return this.attendanceHistoryList;
	}

	getQuestions(item) {
		return item.questionGradeList;
	}

	getSessionString(item) {
		let date = new Date(item.session.timestamp);

		return date;
	}

	getUsername() {
		return this._userService.getCurrentUser()["name"];
	}

	getEmail() {
		return this._userService.getCurrentUser()["email"];
	}

	getPhone() {
		return this._userService.getCurrentUser()["phone"];
	}
}
