import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
	// 
	milliToTimeString(milli:number): string {
		let sec:number = Math.trunc((milli/1000) % 60);
		let min:number = Math.trunc((milli/(1000*60)) % 60);
		let hr:number  = Math.trunc((milli/(1000*60*60)) % 24);

		let sec_str:string = sec.toString();
		let min_str:string = min.toString();

		if (sec < 10) 
			sec_str = "0"+sec;
		if (min < 10) 
			min_str = "0"+min;

		return ""+hr+":"+min_str+":"+sec_str;
	}

	// Convert minute to millisecond
	minToMilli(min:number): number {
		return min*1000*60;
	}

}