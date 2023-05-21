const cards =document.querySelectorAll('.card');
let initialCard, cardTwo;

function flipCard(e){
    let clickedCard =e.target;


}
if (clickedCard !==initialCard){
    clickedCard.classList.add('flip');

    if(!initialCard) {
        return initialCard=clickedCard;
    }
    cardTwo=clickedCard;

    let initialCardImg = initialCard.querySelector('img').src,
    cardTwoImg =cardTwo.querySelector('img').src;
    matchCards(initialCardImg, cardTwoImg);
}





