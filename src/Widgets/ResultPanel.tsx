import React, { useEffect, useState } from 'react';
import { CatStatModel } from '../Models/CatStatModel';
import { ProposalModel } from '../Models/ProposalModel';
import { Api } from '../Services/Api';
import { LoadingText } from './LoadingText';

export const ResultPanel = () => {
    
    const [stats, setStats] = useState<CatStatModel[]|null>(null);

    useEffect(() => {
        Api.getCatStats()
            .then(result => setStats(result))
            .then(() => console.log(stats));
    }, [])
    
    if (stats !== null) {
        return <div className="row align-items-top justify-content-center m-4">
            {stats.map(stat => {

                const id = `cat-${stat.catId}`;
                const src = stat.src;
                const mignonitude = `Mignonitude: ${stat.winRate}%`;
                const votesText = `Votes : ${stat.votes} | Matchs : ${stat.matches}`;
                const additionnalText = (stat.votes > stat.matches) ? "(Ce chat a peut-être triché...)" : null;

                return <CatCell key={id} imgSrc={src} mignonitudeText={mignonitude} votesText={votesText} additionnalText={additionnalText} />;
            })}
            {
                //Quick and dirty bootstraphack to get a no-wrap effect on last row (we make sure the total numb of cols to be a multiple of 60)
                Array(60 - (stats.length % 60)).fill(0).map((_, i) => <FakeColPlaceHolder key={`cat-cell-placeholder-${i}`}/>)
            }
        </div>;
    }
    else {
        return <LoadingText text="2 secondes, je cherche cherche les résultats..."/>
    }
}

type CatCellProps = {
    imgSrc: string;
    mignonitudeText: string;
    votesText: string;
    additionnalText: string|null;
};
const CatCell = (props: CatCellProps) => <div className="cat-result-cell col my-2">
    <div className="cat-result-image-container">
        <img src={props.imgSrc}/>
    </div>
    <div className="cat-result-stat-information text-center">
        <div>{props.votesText}</div>
        <div>{props.mignonitudeText}</div>
        <div>{props.additionnalText ?? ""}</div>
    </div>
</div>

const FakeColPlaceHolder = () => <div className="col cat-result-cell" />