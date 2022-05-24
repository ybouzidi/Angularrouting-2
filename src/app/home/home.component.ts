import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  intervalSubscription: Subscription;
  routeSubscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      //console.log(data);
    }, error => {
      //console.log(error);
    });

    /* this.intervalSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    }) */

    let customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 3) {
          observer.error('count can\'t be greater than 3 !!!');
        }
        if (count > 2) {
          observer.complete();
        }
        count++;
      }, 1000)
    });

    this.intervalSubscription = customObservable.pipe(map((data: number) => {
      return 'count = ' + (data + 1);
    })).subscribe(data => {
      //console.log(data);
    }, error => {
      //console.log(error);
    }, () => {
      //console.log('complete');
    });
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
