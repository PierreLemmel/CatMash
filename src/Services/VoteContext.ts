import React from "react";
import { ImageModel } from "../Models/ImageModel";
import { Vote } from "../Models/Vote";

export class VoteContextObject {
    readonly initialized : boolean;
    readonly proposalId : string|null;
    readonly image1 : ImageModel|null;
    readonly image2 : ImageModel|null;
    readonly vote : Vote;

    constructor(initialized : boolean, proposalId : string|null, image1 : ImageModel|null, image2 : ImageModel|null, vote : Vote) {
        this.initialized = initialized;
        this.proposalId = proposalId;
        this.image1 = image1;
        this.image2 = image2;
        this.vote = vote;
    }

    static uninitialized() : VoteContextObject {
        return new VoteContextObject(false, null, null, null, Vote.Blank);
    }

    static initialized(proposalId : string, image1 : ImageModel, image2 : ImageModel){
        return new VoteContextObject(true, proposalId, image1, image2, Vote.Blank);
    }
}

export const VoteContext = React.createContext(VoteContextObject.uninitialized());