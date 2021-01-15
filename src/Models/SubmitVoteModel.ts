export class SubmitVoteModel {
    readonly proposalId: string;
    readonly imgId: string;

    constructor(proposalId: string, imgId: string) {
        this.proposalId = proposalId;
        this.imgId = imgId;
    }
}