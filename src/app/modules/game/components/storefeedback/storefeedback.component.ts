import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-storefeedback',
  templateUrl: './storefeedback.component.html',
  styleUrls: ['./storefeedback.component.scss']
})
export class StoreFeedbackComponent implements OnInit {

  @Input()
  public error?: any;

  @Input()
  public isFetching: string;


  ngOnInit(): void {
  }

}
