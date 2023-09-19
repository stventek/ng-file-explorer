import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  isFE = false;
  private routerSubscription!: Subscription;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
      this.isFE = this.router.url.startsWith('/local');
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
