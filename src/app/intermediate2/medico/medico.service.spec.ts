import { TestBed } from '@angular/core/testing';
import { MedicoService } from './medico.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Subscriber } from 'rxjs';

describe('Testing medicoService', () => {
    let service: MedicoService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MedicoService],
            imports: [HttpClientTestingModule]
        });
        service = TestBed.get(MedicoService);
    });

    it('The service should be created', () => {
        expect(service).toBeTruthy();
    });
    it('Test getMedicos, should havebeen called', () => {
        const spy = spyOn(service, 'getMedicos').and.callThrough();
        service.getMedicos();
        expect(spy).toHaveBeenCalled();
    });
    it('test getMedicos should return 2 doctors', () => {
        spyOn(service, 'getMedicos').and.callFake(() => {
            return new Observable((observer: Subscriber<any>) => {
                observer.next(['as','es']);
            });
        });
        service.getMedicos().subscribe((docs: any[]) => {
            expect(docs.length).toBe(2);
        });
    });
});