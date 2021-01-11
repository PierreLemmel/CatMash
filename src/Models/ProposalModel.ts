import { ImageModel } from "./ImageModel";

export class ProposalModel {
    readonly proposalId: string;
    readonly userId: string | null;
    readonly img1: ImageModel;
    readonly img2: ImageModel;

    constructor(proposalId: string, userId: string | null,  img1: ImageModel, img2: ImageModel) {
        this.proposalId = proposalId;
        this.userId = userId;
        this.img1 = img1;
        this.img2 = img2;
    }
}