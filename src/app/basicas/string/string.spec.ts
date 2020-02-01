import { mensaje } from './string';
//describe('Pruebas de strings');
//it('Debe de regresar un string');
// puede haber multiples expect dentro de un it
describe('Pruebas de strings', () => {
    it( 'Should return an string', () => {
        const message = mensaje('Antonio');
        expect(typeof message).toBe('string');
    });
    it( 'Should return a message with the name sent', () => {
        const name: string = 'Antonio'
        const message = mensaje(name);
        expect(message).toContain(name);
    });
});