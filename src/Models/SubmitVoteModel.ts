export class SubmitVoteModel {
    readonly proposalId: string;
    readonly userId: string | null;
    readonly imgId: string;

    constructor(proposalId: string, userId: string | null, imgId: string) {
        this.proposalId = proposalId;
        this.userId = userId;
        this.imgId = imgId;
    }
}