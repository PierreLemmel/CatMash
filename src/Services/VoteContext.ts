import React from "react";
import { ImageModel } from "../Models/ImageModel";
import { Vote } from "../Models/Vote";

export class VoteContextData {
    readonly proposalId : string;
    readonly image1 : ImageModel;
    readonly image2 : ImageModel;
    readonly vote : Vote;

    constructor(proposalId : string, image1 : ImageModel, image2 : ImageModel, vote : Vote) {
        this.proposalId = proposalId;
        this.image1 = image1;
        this.image2 = image2;
        this.vote = vote;
    }

    static unitialized() : VoteContextData | null {
        return null;
    }

    with(fieldsToUpdate : Partial<VoteContextData>) {
        return {...this, ...fieldsToUpdate};
    }

    toggleImage1Vote() : VoteContextData {
        const newVote : Vote = this.vote === Vote.Img1 ? Vote.Blank : Vote.Img1;
        return this.with({ vote: newVote });
    }

    toggleImage2Vote(): VoteContextData {
        const newVote : Vote = this.vote === Vote.Img2 ? Vote.Blank : Vote.Img2;
        return this.with({ vote: newVote });
    }
}

export const VoteContext = React.createContext<VoteContextData | null>(null)