import { Component, OnInit } from '@angular/core';
import { MedicoService } from './medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];
  err: string = '';
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
  }

  saludarMedico(name: string) {
    return `Hi, how are you ${name}`;
  }
  obtenerMedicos() {
    this._medicoService.getMedicos().subscribe({
      next:(medicos: any[]) => {
        this.medicos = medicos;
      },
      error: (err) => {
        this.err = err;
      },
      complete: () => {

      }
    });
  }
}
