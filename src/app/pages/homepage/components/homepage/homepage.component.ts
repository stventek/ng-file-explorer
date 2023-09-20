import { Component } from '@angular/core';
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedIn = faLinkedin;
  faEnvelope = faEnvelope;
}
