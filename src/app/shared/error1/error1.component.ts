import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error1',
  templateUrl: './error1.component.html',
  styleUrls: ['./error1.component.css']
})
export class Error1Component implements OnInit {

  constructor() { }

  @Input() mensaje:string;
  ngOnInit() {
  }

}
