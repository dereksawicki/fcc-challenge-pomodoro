import { Component } from '@angular/core';
import { TimeService } from './time.service';


@Component({
	selector: 'pomodoro',
	templateUrl: './pomodoro.component.html',
	styleUrls: ['./pomodoro.component.css'],
	providers: [TimeService]
})
export class PomodoroComponent{
	break_length: number;
	sess_length: number;
	timer: number;
	time_string: string;
	timer_label: string;
	timer_paused: boolean;
	timer_state: string;

	constructor(private _timeSerivce: TimeService) {
		this.break_length = 5;
		this.sess_length = 25;
		this.timer_label = "Session";
		this.timer = this._timeSerivce.minToMilli(this.sess_length);
		this.time_string = this._timeSerivce.milliToTimeString(this.timer);
		this.timer_paused = true;
		this.timer_state = "timer-paused";


		setInterval(()=>{
			if (!this.timer_paused) {
				if (this.timer <= 0) {// toggle break/session
					if (this.timer_label == "Break!") {
						this.timer_label = "Session";
						this.timer = this._timeSerivce.minToMilli(this.sess_length);
					} else {
						this.timer_label = "Break!";
						this.timer = this._timeSerivce.minToMilli(this.break_length);
					}
					this.time_string = this._timeSerivce.milliToTimeString(this.timer);
				}
				this.timer -= 1000; // subtract one second
				this.time_string = this._timeSerivce.milliToTimeString(this.timer);
			} 

			if (this.timer_paused) {
				this.timer_state = "timer-paused";
			} else {
				if (this.timer_label == "Break!")
					this.timer_state = "timer-break";
				else
					this.timer_state = "timer-sess";
			}
		}, 1000) // update once every 1000 seconds
	}


	decBreakLength(){
		if (this.timer_paused) {
			if (this.break_length > 1){
				this.break_length -= 1;
			}
			if (this.timer_label == "Break!"){
				this.timer = this._timeSerivce.minToMilli(this.break_length);
				this.time_string = this._timeSerivce.milliToTimeString(this.timer);
			}
		}
	}

	incBreakLength() {
		if (this.timer_paused){
			this.break_length += 1;

			if (this.timer_label == "Break!"){
				this.timer = this._timeSerivce.minToMilli(this.break_length);
				this.time_string = this._timeSerivce.milliToTimeString(this.timer);
			}
		}
	}

	decSessLength(){
		if (this.timer_paused) {
			if (this.sess_length > 1)
				this.sess_length -= 1;

			if (this.timer_label == "Session"){
				this.timer = this._timeSerivce.minToMilli(this.sess_length);
				this.time_string = this._timeSerivce.milliToTimeString(this.timer);
			}
		}
	}

	incSessLength() {
		if (this.timer_paused) {
			this.sess_length += 1;

			if (this.timer_label == "Session"){
				this.timer = this._timeSerivce.minToMilli(this.sess_length);
				this.time_string = this._timeSerivce.milliToTimeString(this.timer);
			}
		}
	}

	toggleTimer() {
		this.timer_paused = !this.timer_paused;
	}

}