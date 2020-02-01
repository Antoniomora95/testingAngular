import { MedicoComponent } from './medico.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MedicoService } from './medico.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
describe('Doctor component', () => {
    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;
    let service: MedicoService;
    let http: HttpClient;

    beforeEach(() => {
        //The next object is declared almost like a module
        // it is module, to use components, providers and imports
        // used in this component
        //declarations -----> components used in this testing
        TestBed.configureTestingModule({
            declarations: [MedicoComponent],
            providers:[MedicoService],
            imports:[HttpClientModule, HttpClientTestingModule]
        });
        // create a compiled component
        // this return a fixture (access html, dom css)
        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
        service = TestBed.get(MedicoService);
        http = TestBed.get(HttpClient);
    });
    // the component must be created
    it('The component should be created', () => {
        expect(component).toBeTruthy();
    });
    it('Should return the doctor´s name', () => {
        let name = 'Antonio';
        expect(component.saludarMedico(name)).toContain(name);
    });
    
    it('The service should return an array of doctors', () => {
        let spy = spyOn(service, 'getMedicos').and.returnValue(of(['as','qw','dwe']));
        component.obtenerMedicos();
        expect(spy).toHaveBeenCalled();
        expect(component.medicos.length).toBe(3);
    });
    it('getMedicos should return an error', () => {
        let err = 'Se presento un error';
        spyOn(service, 'getMedicos').and.returnValue(throwError(err));
        component.obtenerMedicos();
        expect(component.err).toBe(err);
    });

});