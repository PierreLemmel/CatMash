import React from 'react';

export const Jumbotron = () => <section className="jumbotron text-center">
    <JumbotronBanneer/>
    <MainTitle />
    <TagLine />
</section>;

const JumbotronBanneer = () => <img src="img/maki.png" alt="cutest cat ever" id="maki-banneer" />;
const MainTitle = () => <h1 className="main-title">Cat Mash</h1>;
const TagLine = () => <p className="tagline">Qui sera le chat le plus mignon ?</p>