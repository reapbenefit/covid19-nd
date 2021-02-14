import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventName: String,
    eventCategory: string, 
    eventLabel: string = null,
    eventAction: string){ 
         gtag('event', eventName, { 
                 'event_category': eventCategory,
                 'event_label': eventLabel, 
                 'event_action': eventAction
               })
    }
}
