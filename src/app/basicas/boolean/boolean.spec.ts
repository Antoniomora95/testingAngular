import { UserLogued } from './boolean';


describe('Testing some booleans', () => {
    it('That function should return a boolean true', () => {
        const bol: boolean = UserLogued();
        expect(bol).toBeTruthy();
    });
});