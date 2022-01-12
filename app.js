const warHeader = document.getElementById("header");
const deck = document.getElementById("getDeck");
const draw = document.getElementById("drawCards");
const remainingText = document.getElementById("remaining");
let deckId;
const playerCardImg = document.getElementById("card1");
const computerCardImg = document.getElementById("card2");
const roundWinner = document.getElementById("currentWinner");
let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const cardsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

function getDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => {
      return res.json();
    }).then(data => {
      deckId = data.deck_id;
      console.log(deckId);
      remainingText.textContent =`Remaining: ${data.remaining}`
    })
}

deck.addEventListener("click", getDeck);

draw.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`) //Ensure to use the url as a template string
  .then(res => {
    return res.json();
  }).then(data => {
    let playerCard = data.cards[0];
    let computerCard = data.cards[1];
    playerCardImg.innerHTML = `<img src=${data.cards[0].image} alt="player card">`
    computerCardImg.innerHTML = `<img src=${data.cards[1].image} alt="computer card">`
    roundWinner.textContent = checkWinner(playerCard, computerCard);
    remainingText.textContent =`Remaining: ${data.remaining}`
    if(data.remaining === 0) {
      draw.setAttribute("disabled", true)

      if(playerScore > computerScore) {
        warHeader.textContent = "Player Wins War! 🎉💪🏾";
      }else if(computerScore > playerScore) {
        warHeader.textContent = "Computer Wins War! 🎉🤖";
      }
      else {
        warHeader.textContent = "It's a tie! 🤝🏾"
      }
    }
  });
});

function checkWinner(firstCard, secondCard) {

  if(cardsArray.includes(firstCard.value) && cardsArray.includes(secondCard.value)) {

    if(cardsArray.indexOf(firstCard.value) > cardsArray.indexOf(secondCard.value)){
      playerScore ++;
      playerScoreDisplay.textContent = `${playerScore}`;
      return "Player Wins!";
    }else if(cardsArray.indexOf(secondCard.value) > cardsArray.indexOf(firstCard.value)){
      computerScore ++;
      computerScoreDisplay.textContent = `${computerScore}`;
      return "Computer Wins!";
    }else {
      return "It's a tie!";
    };
  };
};



// function checkObj(obj, checkProp) {
//   // Only change code below this line
//   if(obj.hasOwnProperty(checkProp)) {
//     console.log(obj[checkProp]);
//   }else {
//     console.log("Not Found");
//   };
//   // Only change code above this line
// }

// checkObj({gift: "pony", pet: "kitten", bed: "sleigh"}, "gift") 
