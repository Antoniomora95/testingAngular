import { FormRegister } from './forms';
import { FormBuilder } from '@angular/forms';
describe('Test a simple form', () => {
    let component: FormRegister;
    let email;
    beforeEach(() => {
        component = new FormRegister(new FormBuilder);
        email = component.form.get('email');
    });
    it('Should create a form with two fields, email & password', () => {
        expect(component.form.contains('email')).toBeTruthy();
        expect(component.form.contains('password')).toBeTruthy();
    });
    it('The field email is required and now it is empty', () => {
        email.setValue('');
        expect(email.valid).toBeFalsy();
    });
    it('Email has a value but it is not valid', () => {
        email.setValue('asddjdcnd');
        expect(email.errors.email).toBeTruthy();
    });
    it('Email has a value and it is valid', () => {
        email.setValue('amora@prokarma.com');
        expect(email.errors).toBeFalsy();
    });
});