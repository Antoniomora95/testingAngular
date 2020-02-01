export class testingClass {
    lifes: number;
    constructor() {
        this.lifes = 100;
    }
    receiveHit(level: number) {
        if (level >= this.lifes) {
            this.lifes = 0;
        } else {
            this.lifes -= level;
        }
        return this.lifes;
    }
}