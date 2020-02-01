import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {
  emoji: string = '';
  constructor() { }

  ngOnInit() {
  }
  assign(event: KeyboardEvent) {
    this.emoji = event.key;
  }
}
