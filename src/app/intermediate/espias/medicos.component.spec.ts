import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { of, from, empty, Observable, Subscriber, throwError } from 'rxjs';
import { mensaje } from '../../basicas/string/string';

describe('Testing MedicosComponent', () => {
    let component: MedicosComponent;
    const doctors = ['doctor1', 'doctor2', 'doctor3'];
    const service = new MedicosService(null);
    beforeEach( () => {
        component = new MedicosComponent(service);
    });
    it('Must load the doctors', () => {
        /*
        pyOn instruction that allows us to made a fake request
        when SOMETHING OCCURS in this case the post method is called
        in the ngonInit */
        spyOn(service, 'getMedicos').and.callFake(() => {
            return of(doctors);
        });
        component.ngOnInit();
        expect(component.medicos.length).toBeGreaterThan(0);
    });
    it('Must call agregarMedico in the component', () => {
        const spy = spyOn(service, 'agregarMedico').and.callFake((medico) => {
            return empty();
        });
        component.agregarMedico();
        expect(spy).toHaveBeenCalled();
    });
    it('agregarMedico should return and add the new doctor to medicos array', () => {
        spyOn(service, 'agregarMedico').and.callFake((medico) => {
            return new Observable((observer: Subscriber<any>) => {
                observer.next(medico);
                observer.complete();
            }); 
        });
        component.agregarMedico();
        expect(component.medicos && component.medicos.length).toBeGreaterThan(0);
    });
    it('agregarMedico should return and add the new doctor to medicos array second way', () => {
        const medico = {id:1, nombre: 'Antonio'};
        spyOn(service, 'agregarMedico').and.returnValue( of(medico));
        component.agregarMedico();
        expect(component.medicos && component.medicos.length).toBeGreaterThan(0);
    });
    it('Return an error of an observable', () => {
        const err = 'err in line 48';
        spyOn(service, 'agregarMedico').and.returnValue(throwError(err));
        component.agregarMedico();
        expect(component.mensajeError && component.mensajeError).toBe(err);
    });
    it('Must have a response from the server in order to delete a doctor', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const spy = spyOn(service, 'borrarMedico').and.callFake(id => {
          return of(id);
      });
      component.borrarMedico('1');
      expect(spy).toHaveBeenCalledWith('1');
    });

    it('The user does not accept the confirm window, therefore the doctor will not be deleted', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const spy = spyOn(service, 'borrarMedico').and.callFake(id => {
          return of(id);
      });
      component.borrarMedico('1');
      expect(spy).not.toHaveBeenCalled();
    });
});
