//variable initialization
var targetColor;
var LastResult=false;
document.getElementById('targetColor').innerText=targetColor;

var tryAgain=false;
var level='easy';
var colorOptions;//=[targetColor];
newGame()
//events
document.getElementsByTagName('input')[0].addEventListener('click',newGame);
for(i=0;i<document.getElementsByClassName('card').length;i++){
    document.getElementsByClassName('card')[i].addEventListener('click',guessColor);
}

//main functions

function setAllCardsColor(color){
    for(i=0;i<colorOptions.length;i++){
        document.getElementsByClassName('card')[i].style.backgroundColor=color;
    }
    document.getElementById('logo').style.backgroundColor=color;
}

function choseEasy(){
    tryAgain=false;
    level='easy'
    newGame();
}

function choseHard(){
    tryAgain=false;
    level='hard'
    newGame();
}

function guessColor(){
    if(this.style.backgroundColor===targetColor){
        hitColor(this.style.backgroundColor);
    } else {
        missedColor(this.style.backgroundColor);
    }
}

function hitColor(color){
    tryAgain=false;
    document.getElementById('message').innerText='Correct!';
    document.getElementsByClassName('newGame')[0].value='Play Again?';
    //newGame();
    setAllCardsColor(color);
}

function missedColor(wrongColor){
    indexWrong=colorOptions.indexOf(wrongColor);
    if((level==='easy' && indexWrong<3) || level==='hard'){
        fadeAway(indexWrong);
        tryAgain=true;
    }
}

function fadeAway(indexWrong){
    document.getElementsByClassName('card')[indexWrong].style.backgroundColor='rgb(31,31,31)';
    document.getElementById('message').innerText='Try again';
}

function displayTargetColor(){
    document.getElementById('targetColor').innerText=targetColor.toUpperCase();
}

function newGame(){
    document.getElementsByClassName('newGame')[0].value='NEW GAME'
    document.getElementById('message').innerText=''
    document.getElementById('logo').style.backgroundColor='rgb(59,118,169)';
    generateTargetColor();
    colorOptions=[targetColor];
    document.getElementById('easyLevel').classList.toggle("selectedLevel",level=='hard');
    document.getElementById('hardLevel').classList.toggle("selectedLevel",level=='easy');
    var amountCards;
    if(level==='easy'){
        amountCards=3;
        // document.getElementById('easyLevel').style.backgroundColor=;
    } else {
        amountCards=6;
        // document.getElementById('hardLevel').style.backgroundColor=;
    }
    for(i=0;i<amountCards-1;i++){
        colorOptions.push(generateColor());
    }   
    colorOptions=shuffle(colorOptions)
    for(i=0;i<6;i++){
        document.getElementsByClassName('card')[i].style.backgroundColor=colorOptions[i];
        if(i>=amountCards){
            document.getElementsByClassName('card')[i].style.backgroundColor='rgb(31,31,31)';
        }
    }
    displayTargetColor();
}


function generateColor(){
    var randomRed=getRandomInt(0, 255);
    var randomGreen=getRandomInt(0, 255);
    var randomBlue=getRandomInt(0, 255);
    return('rgb('+randomRed+', '+randomGreen+', '+randomBlue+')')
}

function generateTargetColor(){
    targetColor=generateColor();
}

//aux functions
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  
