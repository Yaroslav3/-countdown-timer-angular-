import {Component, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('counter', {read: TimerComponent})
  private counter: TimerComponent;

  ngOnInit(): void {
    this.counter.startAt = 10;
    this.counter.start();
    this.counter.counterState.subscribe(state => {
      if (state === 'COMPLETE') {
        console.log('Counter has done the job');
      }
    });
  }
}

