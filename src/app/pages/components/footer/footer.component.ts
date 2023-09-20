import { Component } from '@angular/core';
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedIn = faLinkedin;
  faEnvelope = faEnvelope;
}
