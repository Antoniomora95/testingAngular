import { ROUTES } from './app.routes';
import { MedicoComponent } from '../../intermediate2/medico/medico.component';


describe('Testing the differents routes in a routing', () => {
    it('Must exist the route /medico/:id', () => {
        const found = ROUTES.find((rout) => {
           if (rout.path === 'medico/:id') return rout;
        });
        expect(found).toBeTruthy();
    });
});
describe('Testing the differents routes in a routing 2nd way', () => {
    it('Must exist the route /medico/:id', () => {
        expect(ROUTES).toContain({
            path:'medico/:id',
            component: MedicoComponent
        });
    });
});