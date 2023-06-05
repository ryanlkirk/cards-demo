export const getDeckColour = (card: string | undefined ) => {
    let defaultSuit = 'blackSuit';
    defaultSuit = card && (card.at(-1) === '♠' || card.at(-1) === '♣') ? 'redSuit' : 'blackSuit';
    return defaultSuit;
};

export const getNumericalValue = (card: string) => {
    const cardVal = parseInt(card.slice(0,1));
    if( card.slice(0,1) === "A") {
        return 11;
    } else if( !cardVal ) {
        return 10;
    } else {
        return cardVal;
    }
}