import { useState } from "react";
import { Button } from "@mui/material";
import PlayingCard from "./PlayingCard";
import { getDeckColour } from "../Helpers/CardHelpers";

// Custom button style - standard material UI ones weren't quite right for the bg colour
const buttonStyle = {
    background: "#F4FFF8",
    color: "#1C3738",
    marginRight: "15px",
    ':hover': {
        bgcolor: '#8BAAAD',
        color: "black" // increase contrast on hover
    },
}

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♦', '♣', '♥', '♠'];

// Function for entire deck
function CardDeck() {
    const [deckOrder, setDeckOrder] = useState<string[]>([]);
    const [canShuffle, setCanShuffle] = useState<boolean>(true);
    const [lastCardDraw, setLastCardDraw] = useState<string>("");

    // Builds or rebuilds the deck
    const buildDeck = () => {
        // Allow shuffle after a build/rebuild of the deck
        !canShuffle && setCanShuffle(true);
        let deckObj: string[] = [];
        // Builds the deck array in the correct order
        suits.map(suit => {
            return cards.map(card => {
                const cardInfo = `${card} ${suit}`
                return deckObj.push(cardInfo)
            })
        })
        // set state to correctly ordered deck
        setDeckOrder(deckObj)
        // clear out last drawn card
        setLastCardDraw("")
    }

    // Draw a single card at random
    const drawCard = () => {
        // Get a random index from the deckOrder array
        const randomIndex = Math.floor(Math.random() * deckOrder.length);
        // Get the randomly drawn card
        const randomCard = deckOrder[randomIndex];
        // set last drawn card which will display above remaining cards
        setLastCardDraw(randomCard)
        // filter down deck order to remove the selected card
        setDeckOrder(deckOrder.filter(c => c !== randomCard))
        // Explicit false rather than flip as its fixed after a single draw
        canShuffle && setCanShuffle(false);
    }

    // Used to actually render the visual cards
    const printCards = (cardArr?: String[]) => {
        let cardInfo;
        let cards = cardArr ? cardArr : deckOrder;
        return cards.map((card => {
            cardInfo = `${card}`
            return <PlayingCard key={cardInfo} cardStr={cardInfo}></PlayingCard>
        }))
    }

    const shuffleDeck = (arr: string[]) => {
        // use array sort with custom sorting using random number to shuffle array randomly
        const shuffledDeck = [...arr].sort((a, b) => 0.5 - Math.random());
        // set the deck order in state to the new shuffled array
        setDeckOrder(shuffledDeck)
    }

    return (
        <>
            <section className="buttonGroup centerAllFlex m20">
                <Button size="large" variant="contained" sx={buttonStyle} onClick={() => { drawCard() }} disabled={!deckOrder.length}>Draw</Button>
                <Button size="large" variant="contained" sx={buttonStyle} onClick={() => shuffleDeck(deckOrder)} disabled={!deckOrder.length || deckOrder.length < 52}>Shuffle</Button>
                <Button className="m10 p10" size="large" variant="contained" sx={buttonStyle} onClick={() => { buildDeck() }}>{!deckOrder.length ? "New Deck" : "Reset"}</Button>
            </section>
            {lastCardDraw &&
                <div className="centerAllFlex flexColumn m20">
                    <div className="lastCardInfo">Last Card Drawn:</div>
                    <div className={`card ${getDeckColour(lastCardDraw.at(-1))}`}>{lastCardDraw}</div>
                </div>
            }
            <div className="centerAllFlex flexColumn m20">
                {lastCardDraw && deckOrder.length > 0 && <div className="lastCardInfo">Remaining Cards:</div>}
                <div className='cardHolder centerAllFlex'>{printCards()}</div>
            </div>
        </>
    );
}

export default CardDeck