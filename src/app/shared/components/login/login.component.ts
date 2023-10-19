import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  googleScriptLoad = false;

  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit() {
    this.winLoad(this.renderGooogle.bind(this));
  }

  ngOnDestroy(): void {
    google.accounts.id.cancel();
  }

  winLoad(callback: () => void) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  renderGooogle() {
    this.googleScriptLoad = true;
    const parent = document.getElementById('google_btn')!;
    google.accounts.id.renderButton(parent, {
      theme: 'outline',
      width: 300,
      text: 'signin_with',
    });
    google.accounts.id.prompt();
  }
}
