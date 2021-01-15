import { CatModel } from "../Models/ImageModel";
import { ProposalModel } from "../Models/ProposalModel";
import { SubmitVoteModel } from "../Models/SubmitVoteModel";
import { Auth } from "./Auth";
import { CatStatModel } from "../Models/CatStatModel";

export module Api {

    //const baseUrl = "https://catmash-plml-back.azurewebsites.net/";
    const baseUrl = "http://localhost:5000/";
    
    const requireProposalUrl = baseUrl + "catmash/require-proposal";
    const submitVoteUrl = baseUrl + "catmash/submit-vote";
    const getCatStatsUrl = baseUrl + "catmash/cat-stats";

    export function requireProposal() : Promise<ProposalModel> {

        const body : RequireProposalApiModel = {
            userId: Auth.getCurrentUser().uid
        };

        console.log(JSON.stringify(body));

        const request : RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json"}
        };

        return fetch(requireProposalUrl, request)
            .then(response =>{
                
                return response.json();
            })
            .then((json: ProposalApiModel) => new ProposalModel(
                json.proposalId,
                json.userId,
                new CatModel(json.cat1.catId, json.cat1.src),
                new CatModel(json.cat2.catId, json.cat2.src))
            );
    }

    export function submitVote(vote : SubmitVoteModel) : Promise<void> {
        
        const body : VoteApiModel = {
            proposalId: vote.proposalId,
            userId: Auth.getCurrentUser().uid,
            catId: vote.imgId, 
        };

        const request : RequestInit = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json"}
        };

        return fetch(submitVoteUrl, request)
            .then(response =>{
                if (!response.ok) {
                    console.error(response.statusText);
                }
            });
    }

    export function getCatStats() : Promise<CatStatModel[]> {

        const request : RequestInit = {
            method: 'GET',
        };

        return fetch(getCatStatsUrl, request)
            .then(response => response.json())
            .then((stats: CatStatApiModel[]) => stats.map(stat => new CatStatModel(
                stat.catId,
                stat.matches,
                stat.votes,
                stat.src,
                stat.winRate))
            );
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

    type VoteApiModel = {
        proposalId: string,
        catId: string,
        userId: string|null
    };

    type RequireProposalApiModel = {
        userId: string|null
    };

    type CatStatApiModel = {
        catId: string,
        matches: number,
        votes: number,
        src: string,
        winRate: number
    };
}