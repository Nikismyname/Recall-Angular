import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  data: string = '<span style="color: blue">test</span>';

  constructor() { }

  ngOnInit() {
  }

}