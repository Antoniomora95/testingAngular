import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { InputDirective } from './input.directive';
import { DirectiveComponent } from './directive.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserAgentService } from './userAgent.service';

describe('Testing the input directive', () => {
    let debugInput: DebugElement;
    let inputElement: HTMLInputElement;
    let fixture: ComponentFixture<DirectiveComponent>;
    let component: DirectiveComponent;
    let userAgentService: UserAgentService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations:[DirectiveComponent, InputDirective],
            providers:[UserAgentService]
        });
        fixture = TestBed.createComponent(DirectiveComponent);
        component = fixture.componentInstance;
        userAgentService = TestBed.get(UserAgentService);
        debugInput = fixture.debugElement.query(By.css('input'));
        inputElement = debugInput.nativeElement;
        fixture.detectChanges();
    });
    it('keydown works well, and only digits', () => {
        let str = '223dsadas94kdcdc24';
        let result = fakeTyping(str, inputElement);
        inputElement.value = result;
        fixture.detectChanges();
        expect(inputElement.value).toBe('2239424');
    });
    it('check the different keyboard events in the directive', () => {
        let keyboardOptions = 'cvx';
        for (let char of keyboardOptions) {
            let evt = new KeyboardEvent('keydown', {
                key: char,
                metaKey: true
            });
            inputElement.dispatchEvent(evt);
            fixture.detectChanges();
            expect(evt).toBeTruthy();
        }
    });
     it('test the paste event in the input', () => {
        inputElement.dispatchEvent(pasteEvent());
        expect(inputElement.value).toBe('');
    });
    it('check the drop event in the input', () => {
        const data = new DataTransfer();
        data.setData('text', 'qw123s');
        const dropEvt = new DragEvent('drop',{
            dataTransfer: data
        });
        inputElement.dispatchEvent(dropEvt);
    });
    it('test different navigators explorer', () => {
        // explorer
        let spy = spyOn(userAgentService, 'getUserAgent').and.returnValue(' (KHTML, like Gecko) MSIE');
        inputElement.dispatchEvent(pasteEvent());
        expect(spy).toHaveBeenCalled();
    });
    it('test different navigators mozilla', () => {
        // explorer
        let spy = spyOn(userAgentService, 'getUserAgent').and.returnValue(' (KHTML, like Gecko) Firefox');
        inputElement.dispatchEvent(pasteEvent());
        expect(spy).toHaveBeenCalled();
    });
    it('test different navigators opera', () => {
        // opera
        let spy = spyOn(userAgentService, 'getUserAgent').and.returnValue(' (KHTML, like Gecko) Opera');
        inputElement.dispatchEvent(pasteEvent());
        expect(spy).toHaveBeenCalled();
    });
    it('test different navigators safari', () => {
        // Safari
        let spy = spyOn(userAgentService, 'getUserAgent').and.returnValue(' (KHTML, like Gecko) Safari');
        inputElement.dispatchEvent(pasteEvent());
        expect(spy).toHaveBeenCalled();
    });
    it('Test with an input without maxLength', () => {
        if(inputElement.hasAttribute('maxlength')) {
            inputElement.removeAttribute('maxlength')
        }
        for (let index = 0; index < 3; index++) {
            let evt = inputElement.dispatchEvent(pasteEvent());
            expect(evt).toBeTruthy();
        } 
    });
    it('not allow more content than the maxLength', () => {
        inputElement.value = '12345';
        fixture.detectChanges();
        let evt = inputElement.dispatchEvent(pasteEvent());
        expect(inputElement.value).toBe('12345');
    });
    function fakeTyping(value: string, inputEl: HTMLInputElement):string {
        let result: string = '';
        for (let char of value) {
            let eventMock = createKeyDownEvent(char);
            inputEl.dispatchEvent(eventMock);
            if (eventMock.defaultPrevented) {
            } else {
                result += char;
            }
        }
        return result;
    }
    function createKeyDownEvent(value: string) {  
        return new KeyboardEvent('keydown', { 
            key: value,
            cancelable : true
        });  
    }
    function pasteEvent() {
        // Setting up event data
        const pasteData = new DataTransfer();
        pasteData.setData('text', 'qw123s');
        // Creating event
        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: pasteData
        });
        return pasteEvent;
    }
});