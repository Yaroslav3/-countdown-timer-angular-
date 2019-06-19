import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import 'rxjs-compat/add/operator/map';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() startAt = 0;
  @Output() counterState = new EventEmitter<string>();

  currentValue = '';
  currentSubscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  public start() {
    this.currentValue = this.formatValue(this.startAt);
    this.changeDetector.detectChanges();
    const t: Observable<number> = interval(1000);

    this.currentSubscription = t.pipe(take(this.startAt)).map(v => this.startAt - (v + 1)).subscribe(v => {
      this.currentValue = this.formatValue(v);
      this.changeDetector.detectChanges();
    }, error => {
      this.counterState.error(error);
    }, () => {
      this.currentValue = '00:00';
      this.counterState.emit('COMPLETE');
      this.changeDetector.detectChanges();
    });

  }

  public stop() {
    this.currentSubscription.unsubscribe();
    this.counterState.emit('ABORTED');
  }

  private formatValue(v) {
    const minutes = Math.floor(v / 60);
    const formattedMinutes = '' + (minutes > 9 ? minutes : '0' + minutes);
    const seconds = v % 60;
    const formattedSeconds = '' + (seconds > 9 ? seconds : '0' + seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

}
