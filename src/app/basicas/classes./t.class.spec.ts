import { testingClass } from './t.class';

describe('Testing a class', () => {
    let remainingLifes: testingClass = new testingClass();
    beforeAll(() => {
        console.log('beforeAll');
    });
    beforeEach(() => {
        console.log('beforeEach');
        remainingLifes = new testingClass();
    });
    afterAll(() => {
        console.log('afterAll');
    });
    afterEach(() => {
        console.log('afterEach');
    });
    it('Should return 80 if the level of the hit was 20', () => {
        expect(remainingLifes.receiveHit(20)).toBe(80)
    });

    it('Should return 49 if the level of the hit was 51', () => {
        expect(remainingLifes.receiveHit(51)).toBe(49)
    });
    it('Should return 0 if the level of the hit was greater than the lifes', () => {
        expect(remainingLifes.receiveHit(100)).toBe(0)
    });
});
/*this test fails in the second time due to we are using
 the same object and this is being decreased in each test 
 performed */