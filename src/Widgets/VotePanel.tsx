import React from 'react';
import { Vote } from '../Models/Vote';
import { VoteContext } from '../Services/VoteContext';

export const VotePanel = () => 

    <VoteContext.Consumer>
        {vote => {
            if (vote) {

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
                    <CatColumn imgSrc={"http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg"} imgState={img1State} clickHandler={vote.toggleImage1Vote}/>
                    <CatColumn imgSrc={"http://25.media.tumblr.com/tumblr_m4pwa9EXE41r6jd7fo1_500.jpg"} imgState={img2State} clickHandler={vote.toggleImage2Vote}/>
                    <VoteRow />
                </section>;
            }
            else {
                return <div className="text-center my-5">2 secondes, je cherche des petits chats...</div>
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

const CatColumn = (props : CatColumnProps) => <div className="col cat-col">
    <div className={`cat-img-container p-3 ${stateToClassMap.get(props.imgState)}`}>
        <img src={props.imgSrc} onClick={() => props.clickHandler()} />
    </div>
</div>

const VoteRow = () => <div className="text-center mt-2">
    <VoteButton />
</div>;
const VoteButton = () => <button className="btn btn-primary">Voter !</button>;