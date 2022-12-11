import {getDeckColour} from "../Helpers/CardHelpers";

function PlayingCard(props: {cardStr:string}) {
    let suitColour: string = getDeckColour(props.cardStr);
    return (
        <div key={`card-${props.cardStr}}`} className={`card ${suitColour}`}>{props.cardStr}</div>
    );
}

export default PlayingCard;