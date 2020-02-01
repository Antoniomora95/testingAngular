import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador.component';
import { By } from '@angular/platform-browser';
import { not } from '@angular/compiler/src/output/output_ast';


describe('Incremendator Component', () => {
    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ IncrementadorComponent ],
            imports: [ FormsModule ]
        });
        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;
    });
    it('H3 should show the legend', () => {
        const title = 'It is an awesome title';
        component.leyenda = title;
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
        expect(el.innerHTML).toContain(title);
    });
    it('Call cambiarValor and check if the value has changed in the input', () => {
        fixture.detectChanges();
        const input: HTMLInputElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
        const prevValue = input.getAttribute('ng-reflect-model');
        component.cambiarValor(5);
        // asign the new value in the input
        fixture.detectChanges();
        const newValue = input.getAttribute('ng-reflect-model');
        expect(parseInt(newValue)).toBeGreaterThan(parseInt(prevValue));
    });

    it('Call cambiarValor and check if the value has changed in the input second way', () => {
        component.cambiarValor(5);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const input = fixture.debugElement.query(By.css('.form-control'));
            const element = input.nativeElement;
            expect(element.value).toBe('55');
        });        
    });

    it('Click a button and check how progreso decrease an decrease', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
        buttons[0].triggerEventHandler('click', null);
        expect(component.progreso).toBe(45);  
        buttons[1].triggerEventHandler('click', null);
        expect(component.progreso).toBe(50);  
    });

    it('Click the - button and check the value decreased', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        buttons[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(input.value).toBe('45');
        });
    });
    it('Click the + button and check the value added', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        buttons[1].triggerEventHandler('click', null);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(input.value).toBe('55');
        });
    }); 
});
