const cards = document.querySelectorAll('.card'); 
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; 
let moves =0;
let timer = null;
let minutes = 0;
let seconds = 0;


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
        moves++;
        updateMoves();
    }
}
function matchCards(img1, img2){ 
    if(img1 === img2){ 
        matchedCard++; 
        if(matchedCard == 6){ 
            setTimeout(() => { 
                endGame();
            }, 1200); 
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return disableDeck = false;
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
}

function updateMoves(){
    const movesElement = document.getElementById('moves');
    movesElement.textContent = moves;
}

function startTimer(){
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60){
            seconds = 0;
            minutes++;
        }
        const timerElement = document.getElementById('timer');
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();
  
function endGame() {
stopTimer();
setTimeout(() => {
    alert(`Congratulations! 🎉 You have completed the game. \n  You went ${moves} moves \n You spent  ${minutes} min ${seconds} seconds \n  Rating ⭐ ⭐ ⭐ ⭐` );
}, 500);
}
  
function shuffleCard(){
    matchedCard = 0;
    moves = 0;
    minutes = 0;
    seconds = 0;
    cardOne = cardTwo = '';
    disableDeck=false;
    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let imgTag = card.querySelector('img');
        card.addEventListener("click",flipCard);
    });
    updateMoves();
    startTimer();
}
shuffleCard();
cards.forEach(card => { 
    card.addEventListener('click', flipCard); 
});