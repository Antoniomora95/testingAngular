import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { InputDirective } from './input.directive';
import { DirectiveComponent } from './directive.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Testing the input directive', () => {
    let debugInput: DebugElement;
    let inputElement: HTMLInputElement;
    let fixture: ComponentFixture<DirectiveComponent>;
    let component: DirectiveComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[DirectiveComponent, InputDirective]
        });
        fixture = TestBed.createComponent(DirectiveComponent);
        component = fixture.componentInstance;
        debugInput = fixture.debugElement.query(By.css('input'));
        inputElement = debugInput.nativeElement;
        fixture.detectChanges();
    });
    it('keydown works well, and only digits', () => {
        let str = '2a2d3d9h4k2j4';
        fakeTyping(str, inputElement);
        expect(inputElement.value).toBe('2239424');
    });
    it('test the paste event in the input', () => {
        // Setting up event data
        const pasteData = new DataTransfer();
        pasteData.setData('text', 'qw123s');
        fixture.detectChanges();
        // Creating event
        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: pasteData
        });
        inputElement.dispatchEvent(pasteEvent);
        fixture.detectChanges();
        expect(inputElement.value).toBe('123');
    });
    function fakeTyping(value: string, inputEl: HTMLInputElement) {
        let result: string = '';
        for (let char of value) {
            let eventMock = createKeyDownEvent(char);
            inputEl.dispatchEvent(eventMock);
            if (eventMock.defaultPrevented) {
            } else {
                result += char;
            }
        }
        inputEl.value = result;
        fixture.detectChanges();
    }
    function createKeyDownEvent(value: string) {  
        return new KeyboardEvent('keydown', { 
            key: value,
            cancelable : true
        });  
    }
});