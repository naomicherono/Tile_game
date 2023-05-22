const cards = document.querySelectorAll('.card'); 
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let moves = 0;
let timer = null;

function flipCard(e){ 
    let clickedCard = e.target; 
    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');
        if(!cardOne){
            return cardOne = clickedCard; 
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src, 
        cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2){ 
    if(img1 === img2){ 
        matchedCard++; 
        if(matchedCard == 6){ 
            setTimeout(() => {
                showCongratulations() ;
                return shuffleCard();
            }, 1200); 
        }
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne.classList.add('match');
    cardTwo.classList.add('match');
        cardOne = cardTwo = '';
        disableDeck = false;
    }
    else{
        setTimeout(() => { 
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);
        setTimeout(() => { 
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200);
    }
    moves++;
    updateMoves();
}


function updateMoves() {
    const movesText = document.getElementById('moves');
    movesText.textContent = `Moves: ${moves}`;
}

function startTimer() {
    let seconds = 0;
    const timerText = document.getElementById('timer');
    timer = setInterval(() => {
        seconds++;
        timerText.textContent = `Time: ${seconds}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();
  
  
  
function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = '';
    disableDeck=false;
    moves = 0;
    updateMoves();
    stopTimer();
    startTimer();
    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let imgTag = card.querySelector('img');
        card.addEventListener("click",flipCard);

    
    });

    
}
shuffleCard();
cards.forEach(card => { 
    card.addEventListener('click', flipCard); 
});