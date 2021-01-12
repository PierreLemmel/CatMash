import { CatModel } from "./ImageModel";

export class ProposalModel {
    readonly proposalId: string;
    readonly userId: string | null;
    readonly img1: CatModel;
    readonly img2: CatModel;

    constructor(proposalId: string, userId: string | null,  img1: CatModel, img2: CatModel) {
        this.proposalId = proposalId;
        this.userId = userId;
        this.img1 = img1;
        this.img2 = img2;
    }
}