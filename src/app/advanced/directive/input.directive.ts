
import { Directive, HostListener, ElementRef } from '@angular/core';
import { WindowRefService } from './windowReferenceService';
@Directive({
  selector: '[digitOnly]'
})
export class InputDirective {
  inputElement: HTMLInputElement;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Left',
    'Right',
    'Clear',
    'Copy',
    'Paste'
  ];

  constructor(public el: ElementRef, private windowRef: WindowRefService) {
    this.inputElement = el.nativeElement;
  }

  // allowing only digits and numbers
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: KeyboardEvent) {
    event.preventDefault();
    let clipboardData = event['clipboardData'] || this.windowRef.nativeWindow['clipboardData'];
    let pastedInput = clipboardData.getData('text');
    this.pasteData(pastedInput);
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    let textData: string;
    if (
      this.getNavigator() === 'Microsoft Internet Explorer'
    ) { // IE
    textData = event.dataTransfer.getData('text');
    } else if (event['dataTransfer'] && event['dataTransfer'].getData) { // other browsers
      textData = event['dataTransfer'].getData('text/plain');
    }
    this.inputElement.focus();
    this.pasteData(textData);
  }
  private pasteData(pastedContent: string): void {
    //Chrome, Opera, Safari, Edge
    const sanitizedContent = this.sanatizeInput(pastedContent);
    console.log(sanitizedContent, 'sss');
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      const navigator = this.getNavigator();
      if ( navigator === 'Mozilla Firefox' ) {
        const { selectionStart: start, selectionEnd: end } = this.inputElement;
         this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
      } else if (navigator === 'Microsoft Internet Explorer') {
        // IE11
        this.insertTextIE11(this.inputElement, sanitizedContent);
      }
    }
  }
private insertTextIE11(input, newText) {
  const start = input.selectionStart
  const end = input.selectionEnd
  const text = input.value
  const before = text.substring(0, start)
  const after  = text.substring(end, text.length)
  input.value = (before + newText + after)
  //input.selectionStart = input.selectionEnd = start + newText.length
  input.focus()
}
  private getNavigator ():string {
    let sBrowser, sUsrAg = navigator.userAgent;
    if(sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome";
      } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
      } else if (sUsrAg.indexOf("Opera") > -1) {
        sBrowser = "Opera";
      } else if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
    }else if(sUsrAg.indexOf('MSIE')!==-1
|| navigator.appVersion.indexOf('Trident/') > -1) {
  sBrowser = "Microsoft Internet Explorer";
      }
      return sBrowser;
  }
  private sanatizeInput(input: string): string {
    let result = input.replace(/[^0-9]/g, '');
    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) { // the input element has maxLength limit
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
  }
}