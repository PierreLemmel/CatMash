export class CatStatModel {
    readonly catId: string;
    readonly matches: number;
    readonly votes: number;
    readonly src: string;
    readonly winRate: number;

    constructor(catId: string, matches: number, votes: number, src: string, winRate: number) {
        this.catId = catId;
        this.matches = matches;
        this.votes = votes;
        this.src = src;
        this.winRate = winRate;
    }
}