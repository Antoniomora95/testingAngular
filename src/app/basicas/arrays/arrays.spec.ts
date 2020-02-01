import { getBeers } from './arrays';
// you can skip all the test adding a x before describe
xdescribe('Testing an array', () => {
    const array: Array<string> = getBeers();
    it('The length of the array should be 3', () => {
        expect(array.length).toBeGreaterThanOrEqual(3);
    });
    //or you can skip a test adding a x before the 
    // it
    xit('The array should contains an specific beer', () => {
        expect(array).toContain('Bohemia');
        expect(array).toContain('Modelo');
    });
});