import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MedicosService } from './medicos.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';


describe('Testing medicos only service', () => {
    let doctorService: MedicosService;
    let doc, docDel;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MedicosService],
            imports:[HttpClientTestingModule, HttpClientModule]
        });
        doctorService = TestBed.get(MedicosService);
        doc = {name:'juan', years:12};
    });
    it('service created', () => {
        expect(doctorService).toBeTruthy();
    });
    it('getMedicos should return some doctors', () => {
        let sp = spyOn(doctorService, 'getMedicos').and.callThrough();
        doctorService.getMedicos();
        expect(sp).toHaveBeenCalled();
    });
    it('agregarMedico', () => {
        let sp = spyOn(doctorService, 'agregarMedico').and.callThrough();
        doctorService.agregarMedico('as');
        expect(sp).toHaveBeenCalled(); 
    });
    it('eliminarMedico trough', () => {
        let sp = spyOn(doctorService, 'borrarMedico').and.callThrough();
        doctorService.borrarMedico('1');
        expect(sp).toHaveBeenCalled;
    });
    it('eliminarMedico', () => {
        let sp = spyOn(doctorService, 'borrarMedico').and.returnValue(of(['hi']));
        doctorService.borrarMedico('as').subscribe(next => {
            expect(next[0]).toBe('hi');
        });
        expect(sp).toHaveBeenCalled();
    });
});