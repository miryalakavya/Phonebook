import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-search-input',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchInputComponent {
  @Output()
  public inputChanged: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeHolder = 'Search';

  constructor() {
  }
  public onSearchChange(event) {
    this.inputChanged.emit((<HTMLInputElement>event.target).value);
  }
}
