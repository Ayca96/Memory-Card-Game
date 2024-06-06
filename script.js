const cards = document.querySelectorAll(".card");
//console.log(cards);

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;


function flipCard (e){
  let clickedCard = e.target;  // getting user clicked card
 if(clickedCard !== cardOne && !disableDeck){

  clickedCard.classList.add("flip");
  if(!cardOne){
    return cardOne = clickedCard;
  }
  cardTwo = clickedCard;
  disableDeck = true;
  
  let cardOneImg = cardOne.querySelector("img").src,
  cardTwoImg = cardTwo.querySelector("img").src;
  matchCards(cardOneImg,cardTwoImg);

 }
}

function matchCards(img1, img2){
  if(img1 === img2){
    matchedCard++
    if(matchedCard == 8) {
      setTimeout(()=>{
        return shuffleCard();
      },1000); // calling shuffleCard function after 1 sec
    }
    cardOne.removeEventListener("click",flipCard);
    cardTwo.removeEventListener("click",flipCard);
    cardOne = cardTwo = "";
    return disableDeck = false;
  }
  
  // if two card not matched
  setTimeout(()=>{
    // adding shake class to both card after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400)

  setTimeout(()=>{
    // removing both shake & flip classes from the both card after 1.2 seconds
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}


function shuffleCard (){
   matchedCard = 0;
   cardOne = cardTwo = "";
   disableDeck = false;
   let arr =  [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,];
   arr.sort(()=> Math.random() > 0.5 ? 1 : -1); // sorting array item randomly

   // removing
    cards.forEach((card,index) => { 
    card.classList.remove("flip")
    let imgTag = card.querySelector("img");
    imgTag.src = `./Memory Card Game Images/Memory Card Game Images/img-${arr[index]}.png`;
     card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach(card => { // adding click event to all cards
  card.addEventListener("click", flipCard);
});