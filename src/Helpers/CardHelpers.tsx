export const getDeckColour = (card: string | undefined ) => {
    let defaultSuit = 'blackSuit';
    defaultSuit = card && (card.at(-1) === '♠' || card.at(-1) === '♣') ? 'redSuit' : 'blackSuit';
    return defaultSuit;
};