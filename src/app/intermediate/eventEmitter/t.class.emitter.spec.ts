import { testingClassEmitter } from './t.class.emitter';

describe('Testing a class that uses eventEmitter', () => {
    let classEmitter: testingClassEmitter;
    let lifeEmitted;
    beforeEach( () => {
        lifeEmitted = 0;
        classEmitter = new testingClassEmitter()
    });
    it('The value emitted should be 0 because the parameter in the function is greater than 100', () => {
        classEmitter.lifesChange.subscribe(life => lifeEmitted = life);
        classEmitter.receiveHit(300);
        expect(lifeEmitted).toBe(0);
    });
    it('The value emitted should be greater than 0 since the parameter in the function is fewer than 100', () => {
        classEmitter.lifesChange.subscribe(life => lifeEmitted = life);
        classEmitter.receiveHit(20);
        expect(lifeEmitted).toBe(80);
    });
});