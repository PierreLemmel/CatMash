import React from 'react';
import { SubmitVoteModel } from '../Models/SubmitVoteModel';
import { Vote } from '../Models/Vote';
import { Api } from '../Services/Api';
import { AuthContext } from '../Services/AuthContext';
import { VoteContext, VoteContextObject } from '../Services/VoteContext';

let initialized = false; // Can't use state to track this information
type VotePanelState = {
    readonly voteContext : VoteContextObject,
}
export const VotePanel = () => {

    const [state, setState] = React.useState({ vote: VoteContextObject.uninitialized(), busy: true });

    return <AuthContext.Consumer>{
        auth => {

            const waitForKittens = () => {
                Api.requireProposal(auth.uid).then(proposal => {
                    const newState = VoteContextObject.initialized(proposal.proposalId, proposal.img1, proposal.img2);
                    setState({ vote: newState, busy:true });
                });
            };

            if (!initialized) {
                waitForKittens();
                initialized = true;
            }

            const setNewVote = (newVote : Vote) => setState({vote: new VoteContextObject(
                true,
                state.vote.proposalId,
                state.vote.image1,
                state.vote.image2,
                newVote), busy: state.busy
            });

            const toggleImage1 = () => {
                const newVote = state.vote.vote === Vote.Img1 ? Vote.Blank : Vote.Img1;
                setNewVote(newVote);
            };

            const toggleImage2 = () => {
                const newVote = state.vote.vote === Vote.Img2 ? Vote.Blank : Vote.Img2;
                setNewVote(newVote);
            };

            const submitVote = () => {
                const imgId = state.vote.vote === Vote.Img1 ? state.vote.image1!.id : state.vote.image2!.id;
                
                Api.submitVote(new SubmitVoteModel(state.vote.proposalId!, auth.uid, imgId))
                    .then(() => console.log("Vote submitted"));
                
                setState({ vote: VoteContextObject.uninitialized(), busy:true });
                waitForKittens();

                const audio = new Audio('meow.mp3');
                audio.play();
            };

            return <VoteContext.Provider value={state.vote}>
                <VotePanelContent toggleImage1={toggleImage1} toggleImage2={toggleImage2} submitVote={submitVote} />
            </VoteContext.Provider>
        }}
    </AuthContext.Consumer>;
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

        return <section className="row align-items-center justify-content-center">
            <CatColumn imgSrc={vote.image1!.src} imgState={img1State} clickHandler={props.toggleImage1}/>
            <CatColumn imgSrc={vote.image2!.src} imgState={img2State} clickHandler={props.toggleImage2}/>
            <VoteRow submitVote={props.submitVote} />
        </section>;
    }
    else {
        return <div className="text-center my-5">2 secondes, je cherche des petits chats...</div>
    }}}
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

const CatColumn = (props : CatColumnProps) => <div className="col cat-col">
    <div className={`cat-img-container p-3 ${stateToClassMap.get(props.imgState)}`}>
        <img src={props.imgSrc} onClick={() => props.clickHandler()} />
    </div>
</div>

type VoteRowProps = {
    readonly submitVote: Function
}
const VoteRow = (props : VoteRowProps) => <div className="text-center mt-2">
    <VoteButton submitVote={props.submitVote} />
</div>;
const VoteButton = (props : VoteRowProps)  => <VoteContext.Consumer>
    {vote => <button className="btn btn-primary" disabled={vote.vote === Vote.Blank} onClick={() => props.submitVote()}>Voter !</button>}
</VoteContext.Consumer>;