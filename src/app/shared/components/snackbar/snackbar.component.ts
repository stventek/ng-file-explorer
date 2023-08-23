import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        })
      ),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out')),
    ]),
  ],
})
export class SnackbarComponent implements OnDestroy {
  @Input() type!: string;
  @Input() hideDuration!: number;
  @Input() message!: string;
  @Output() afterClose = new EventEmitter<void>();
  private _open!: boolean;
  visibilityState = 'hidden';
  private timerSubscription!: Subscription;

  @Input() set open(value: boolean) {
    this._open = value;
    if (value) {
      this.showSnackbar();
    }
  }

  get open() {
    return this._open;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  showSnackbar() {
    this.visibilityState = 'visible';

    this.timerSubscription = timer(this.hideDuration).subscribe(() => {
      console.log('hide');
      this.closeSnackbar();
    });
  }

  closeSnackbar() {
    this.visibilityState = 'hidden';
    this.afterClose.emit();
  }
}
