import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  googleScriptLoad = false;

  ngOnInit() {
    this.winLoad(this.renderGooogle.bind(this));
  }

  winLoad(callback: () => void) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }
  ngOnDestroy(): void {
    google.accounts.id.cancel();
  }

  renderGooogle() {
    this.googleScriptLoad = true;
    const parent = document.getElementById('google_btn_signup')!;
    google.accounts.id.renderButton(parent, {
      theme: 'outline',
      width: 300,
      text: 'signup_with',
    });
    google.accounts.id.prompt();
  }

  onClose() {
    this.closeModal.emit();
  }
}
