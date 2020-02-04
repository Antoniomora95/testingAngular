import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class UserAgentService {

  constructor() { }

  getUserAgent(): string {
      return navigator.userAgent;
  }
}