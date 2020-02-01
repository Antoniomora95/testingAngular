import { incrementar } from './numeros';
describe('Testing a number', () => {
    it('Should return 100 if the value sent to the function is grater than 100', () => {
       const value: number = incrementar(400);
       expect(value).toBe(100);
    });
    it('Should return the number inserted + 1 if that number is fewer than 100', () => {
        const value: number = incrementar(40);
        expect(value).toBe(41);
     });
}); 