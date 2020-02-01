import { IncrementadorComponent } from './incrementador.component';

let component: IncrementadorComponent;
beforeEach(() => {
    component = new IncrementadorComponent();
});
describe('Incrementador component unit test', () => {
    it('The biggest value accepted to progeso is 100, param = 100', () => {
        component.cambiarValor(100);
        console.log(component.progreso);
        expect(component.progreso).toBeLessThanOrEqual(100);
    });
    it('The biggest value accepted to progeso is 100, param=500', () => {
        component.cambiarValor(500);
        console.log(component.progreso);
        expect(component.progreso).toBeLessThanOrEqual(100);
    });
    it('The fewer value accepted is 0, param= -49', () => {
        component.cambiarValor(-49);
        console.log(component.progreso);
        expect(component.progreso).toBeGreaterThanOrEqual(0);
    });
    it('The fewer value accepted is 0, param= -51', () => {
        component.cambiarValor(-51);
        console.log(component.progreso);
        expect(component.progreso).toBeGreaterThanOrEqual(0);
    });
});