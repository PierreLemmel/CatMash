import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubmitVoteModel } from '../Models/SubmitVoteModel';
import { Vote } from '../Models/Vote';
import { Api } from '../Services/Api';
import { VoteContext, VoteContextObject } from '../Services/VoteContext';
import { LoadingText } from './LoadingText';


export const VotePanel = () => {
    
    const [vote, setVote] = React.useState(VoteContextObject.uninitialized());

    const waitForKittens = () => {
        Api.requireProposal().then(proposal => {
            const newState = VoteContextObject.initialized(proposal.proposalId, proposal.img1, proposal.img2);
            setVote(VoteContextObject.initialized(proposal.proposalId, proposal.img1, proposal.img2));
        });
    };

    useEffect(() => {
        waitForKittens();
    }, []);

    const setNewVote = (newVote : Vote) => setVote(new VoteContextObject(
        true,
        vote.proposalId,
        vote.image1,
        vote.image2,
        newVote));

    const toggleImage1 = () => {
        const newVote = vote.vote === Vote.Img1 ? Vote.Blank : Vote.Img1;
        setNewVote(newVote);
    };

    const toggleImage2 = () => {
        const newVote = vote.vote === Vote.Img2 ? Vote.Blank : Vote.Img2;
        setNewVote(newVote);
    };

    const submitVote = () => {
        const imgId = vote.vote === Vote.Img1 ? vote.image1!.id : vote.image2!.id;
        
        Api.submitVote(new SubmitVoteModel(vote.proposalId!, imgId));
        
        setVote(VoteContextObject.uninitialized());
        waitForKittens();

        const audio = new Audio('meow.mp3');
        audio.play();
    };

    return <VoteContext.Provider value={vote}>
        <VotePanelContent toggleImage1={toggleImage1} toggleImage2={toggleImage2} submitVote={submitVote} />
    </VoteContext.Provider>
};

type VotePanelContentProps = {
    readonly toggleImage1: Function,
    readonly toggleImage2: Function,
    readonly submitVote: Function,
};
const VotePanelContent = (props: VotePanelContentProps) => <VoteContext.Consumer>
    {vote => {
        if (vote.initialized) {
                
        let img1State : CatImgState;
        let img2State : CatImgState; 

        switch(vote.vote) {
            case Vote.Blank:
                img1State = CatImgState.Neutral;
                img2State = CatImgState.Neutral;
                break;
            case Vote.Img1:
                img1State = CatImgState.Selected;
                img2State = CatImgState.Unselected;
                break;
            case Vote.Img2:
                img1State = CatImgState.Unselected;
                img2State = CatImgState.Selected;
                break;
        }

        return <section className="row align-items-center justify-content-center m-2">
            <CatColumn imgSrc={vote.image1!.src} imgState={img1State} clickHandler={props.toggleImage1}/>
            <CatColumn imgSrc={vote.image2!.src} imgState={img2State} clickHandler={props.toggleImage2}/>
            <ButtonsRow submitVote={props.submitVote} />
        </section>;
    }
    else {
        return <LoadingText text="2 secondes, je cherche des petits chats..."/>
    }
}}
</VoteContext.Consumer>;



enum CatImgState {
    Neutral,
    Selected,
    Unselected
}
type CatColumnProps = {
    readonly imgState: CatImgState,
    readonly imgSrc: string,
    readonly clickHandler: Function
};
const stateToClassMap: Map<CatImgState, string> = new Map([
    [CatImgState.Neutral, ""],
    [CatImgState.Selected, "cat-selected"],
    [CatImgState.Unselected, "cat-unselected"],
]);

const CatColumn = (props : CatColumnProps) => <div className={"col cat-col"}>
    <div className={`cat-img-container ${stateToClassMap.get(props.imgState)}`}>
        <img src={props.imgSrc} onClick={() => props.clickHandler()} />
    </div>
</div>

type ButtonsRowProps = {
    readonly submitVote: Function
}
const ButtonsRow = (props : ButtonsRowProps) => <div className="text-center my-4">
    <VoteButton submitVote={props.submitVote} />
    <ResultButton />
</div>;
const VoteButton = (props : ButtonsRowProps)  => <VoteContext.Consumer>
    {vote => <button className="btn btn-primary mx-1" disabled={vote.vote === Vote.Blank} onClick={() => props.submitVote()}>Voter !</button>}
</VoteContext.Consumer>;

const ResultButton = () => <Link to="/results">
    <button className="btn btn-primary mx-1" onClick={() =>console.log("results")}>Résultats</button>
</Link>