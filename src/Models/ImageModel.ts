export class CatModel {
    readonly id : string;
    readonly src : string;

    constructor(id: string, src : string) {
        this.id = id;
        this.src = src;
    }
};