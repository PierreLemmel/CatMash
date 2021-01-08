const VotePanel = () => <section className="row align-items-center justify-content-center">

    <CatColumn imgSrc={"http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg"} isSelected={true}/>
    <CatColumn imgSrc={"http://25.media.tumblr.com/tumblr_m4pwa9EXE41r6jd7fo1_500.jpg"}  isSelected={false}/>
    <VoteRow />

</section>

const CatColumn = (props) => <div className="col cat-col">
    <div className={`cat-img-container p-3 ${props.isSelected ? "cat-selected" : "cat-unselected"}`}>
        <img src={props.imgSrc} />
    </div>
</div>

const VoteRow = () => <div className="text-center mt-2">
    <VoteButton />
</div>;
const VoteButton = () => <button className="btn btn-primary">Voter !</button>;