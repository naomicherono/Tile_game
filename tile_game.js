const cards = document.querySelectorAll('.card'); 
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let moves = 0;
const stars = document.querySelectorAll('.fa-star');
let timer = null;
let seconds =0;

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);


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

                return shuffleCard();
            }, 1200); 
            
        
        moves++;
        updateMoves();
      }
      updateMoves();

    
          
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
  
}
function updateRating() {
    if (moves <= 10) {
      
      stars.forEach(star => star.style.display = 'inline');
    } else if (moves <= 20) {
      
      stars[2].style.display = 'none';
    } else {
      
      stars[1].style.display = 'none';
    }
  }


function updateMoves() {
    const movesText = document.getElementById('moves');
    movesText.textContent = moves.toString();
    updateRating();


}



function startTimer() {
    let seconds = 0;
    const timerText = document.getElementById('timer');
    timerInterval = setInterval(() => {
        seconds++;
        timerText.textContent = `Time: ${seconds}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
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
function restartGame() {
    // Reset game variables
    matchedCard = 0;
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
    moves = 0;
    seconds = 0;
  
    // Reset cards
    cards.forEach(card => {
      card.classList.remove('flip', 'match', 'shake');
      card.addEventListener('click', flipCard);
    });
  
    // Reset star rating
    stars.forEach(star => star.style.display = 'inline');
  
    // Reset moves
    updateMoves();
  
    // Reset timer
    stopTimer();
    const timerText = document.getElementById('timer');
    timerText.textContent = 'Time: 0s';
  }
shuffleCard();
cards.forEach(card => { 
    card.addEventListener('click', flipCard); 
});

// function finishGame() {
//     stopTimer();
//     isGameFinished = true;
//     // Show congratulations message and display moves and time
//     const movesText = `Moves: ${moves}`;
//     const timeText = `Time: ${seconds}s`;
//     const ratingText = getStarRating();
//     alert(`Congratulations!\n\nMoves: ${movesText}\nTime: ${timeText}\nRating: ${ratingText}`);
//   }

  