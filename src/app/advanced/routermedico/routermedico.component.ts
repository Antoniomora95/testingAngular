import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routermedico',
  templateUrl: './routermedico.component.html',
  styles: []
})
export class RoutermedicoComponent implements OnInit {
  id: string;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  saveDoctor() {
    this.router.navigate(['medico', '123']);
  }

}
