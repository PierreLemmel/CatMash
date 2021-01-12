import { CatModel } from "../Models/ImageModel";
import { ProposalModel } from "../Models/ProposalModel";
import { SubmitVoteModel } from "../Models/SubmitVoteModel";
import { v4 as uuidv4 } from 'uuid';

export module Api {

    const baseUrl = "https://localhost:5001/catmash/";
    const requireProposalUrl = baseUrl + "require-proposal";
    const submitVoteUrl = baseUrl + "submit-vote";

    export function requireProposal(userId : string|null) : Promise<ProposalModel> {

        const body : RequireProposalApiModel = {
            userId: userId
        };

        const request : RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json"}
        };

        return fetch(requireProposalUrl, request)
            .then(response => response.json())
            .then((json: ProposalApiModel) => new ProposalModel(
                json.proposalId,
                json.userId,
                new CatModel(json.cat1.catId, json.cat1.src),
                new CatModel(json.cat2.catId, json.cat2.src))
            );
    }

    export function submitVote(vote : SubmitVoteModel) : Promise<void> {
        
        const body : VoteModel = {
            proposalId: vote.proposalId,
            userId: vote.userId,
            catId: vote.imgId, 
        };

        const request : RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json"}
        };

        return fetch(submitVoteUrl, request)
            .then(response => response.text())
            .then(txt => console.log(txt));
    }

    type CatApiModel = {
        catId: string,
        src: string
    };

    type ProposalApiModel = {
        proposalId: string,
        userId: string|null,
        cat1: CatApiModel,
        cat2: CatApiModel 
    };

    type VoteModel = {
        proposalId: string,
        catId: string,
        userId: string|null
    };

    type RequireProposalApiModel = {
        userId: string|null
    };
}