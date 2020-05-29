import { Component, OnInit, Input, Optional, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  maxDate: Date = new Date('12-31-9999');
  minDate: Date = new Date('01-01-1001');

  // default date format

  @Input()
  set max(value: Date) {
    if (value && !isNaN(value.getTime())) {
      this.maxDate = value;
      this.maxDate.setHours(23, 59, 59, 60);
    }
  }

  @Input()
  set min(value: Date) {
    if (value && !isNaN(value.getTime())) {
      this.minDate = value;
      this.minDate.setHours(0, 0, 0, 0);
    }
  }

  @Input() dateInvalidMessage = 'Invalid Date';

  @Output()
  public inputChanged: EventEmitter<Date> = new EventEmitter();

  @Input()
  public label;

  @Input()
  public disable = false;

  inputDate: string;

  triggeredOutput = false;

  @Input()
  set selectedDate(value: Date) {

    if (!this.triggeredOutput && value) {
      // this.inputDate = this.dateCalculateService.converToDateWithFormat(value, 'YYYY-MM-DD');
    }
    if (this.triggeredOutput) {
      this.triggeredOutput = false;
    }

  }

  dateValidity = true;

  constructor() {

  }


  ngOnInit() {
  }

  getCalendarInputDateFormat(date) {
    // return this.dateCalculateService.converToDateWithFormat(date, 'YYYY-MM-DD');
  }



  validateDate() {
    // const date = new Date(this.dateCalculateService.convertStringToISODateFormat(this.inputDate, 'YYYY-MM-DD'));
    // if (this.dateCalculateService.isValidDate(this.inputDate)) {
    //   // if input is in min and max range

    //   if (this.maxDate && !isNaN(this.maxDate.getTime()) && date.getTime() > new Date(this.maxDate).getTime()) {
    //     this.dateValidity = false;
    //   } else if (this.minDate && date.getTime() < new Date(this.minDate).getTime()) {
    //     this.dateValidity = false;
    //   } else {
    //     this.dateValidity = true;
    //   }

    // } else {
    //   this.dateValidity = false;
    // }
    // this.triggeredOutput = true;
    // this.inputChanged.emit(date);
  }

}
