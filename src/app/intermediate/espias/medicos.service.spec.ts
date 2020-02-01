import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MedicosService } from './medicos.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';


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
        expect(sp).toHaveBeenCalledWith('as');
       /* let sp = spyOn(doctorService, 'agregarMedico').and.callFake((doc) => {
            return new Observable((observer: Subscriber<any>) => {
                if(doc.name) return observer.next(doc.name);
            });
        });*/    
    });
});