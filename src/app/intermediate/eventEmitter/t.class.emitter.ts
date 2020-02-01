import { EventEmitter } from '@angular/core'
export class testingClassEmitter {
    lifes: number;
    lifesChange = new EventEmitter<number>();
    constructor() {
        this.lifes = 100;
    }
    receiveHit(level: number) {
        if (level >= this.lifes) {
            this.lifes = 0;
        } else {
            this.lifes -= level;
        }
        this.lifesChange.emit(this.lifes);
    }
}