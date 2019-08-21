import { Component, OnInit } from '@angular/core';

import { AttendanceHistoryService } from '../../app/_services/attendance-history.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	attendanceHistoryList = undefined;

	constructor(private _attendanceHistory: AttendanceHistoryService) {

	}

	ngOnInit() {

	}

	getAttendanceHistoryItems() {
		if (this.attendanceHistoryList === undefined) {
			this.attendanceHistoryList = null;

			this._attendanceHistory.get().then((list) => {
				this.attendanceHistoryList = list;
			})
		}

		return this.attendanceHistoryList;
	}

}
