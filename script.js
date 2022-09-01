/* debut 30/08/2022 à 11h03 - 11h47    https://www.google.com/search?client=firefox-b-e&q=switch+players+js 
https://github.com/garyarzuma/Tic-Tac-Toe
https://garyarzuma.github.io/Tic-Tac-Toe/ */

const log = console.log;
const logT = console.table;



/*-----------------------------------------------------------------------*/

const Player = function(name, signe){
    const setName = function(newName){
        name = newName;
    }
    const getName = function(){
        return name;
    }
    const getSigne = function(){
        return signe;
    }

   return {getName, setName, getSigne}
}


const displayController = (function(){

    const okSubmit = document.querySelectorAll('button[type=submit');
    const playerLabel1 = document.querySelector('.player1');
    const playerLabel2 = document.querySelector('.player2');

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    function test(e){
        e.preventDefault();
        const playerName = e.target.form[0].name;

        if(playerName === 'player1' && e.target.form[0].value != ''){
            player1.setName(`${e.target.form[0].value}`)
            e.target.form.reset();
        }
        
        if(playerName === 'player2' && e.target.form[0].value != ''){
            player2.setName(`${e.target.form[0].value}`)
            e.target.form.reset();
        }

        playerLabel1.innerText = player1.getName();
        playerLabel2.innerText = player2.getName();
    }
    
    okSubmit.forEach(ok =>{
        ok.addEventListener('click', test)
    });

})();



/*---------------------------------------------------------------------------*/
const gridboard = ["0", "1", "2",
                   "3", "4", "5",
                   "6", "7", "8",];


                   


const winPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*
winPossibilities.forEach((item, index) =>{
    log(`${index} : ${item}`);
})


const equalsIgnoreOder = function(a, b){
    if(a.length != b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for(const v of uniqueValues){
        const aCount = a.filter(e => e === v).length;
        const bCount = b.filter(e => e === v).length;
        if(aCount !== bCount) return false;       
    }
    return true;
}

let table = [];
for(let i = 0; i < winPossibilities.length; i++){
    table[i] = equalsIgnoreOder(winPossibilities[i], [0, 8, 4]);
}

log(table)
*/




/**
 * Pour un joeur 
 * 
*/



const squareGrid = document.querySelectorAll('.square');
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');
let activePlayer = 0;
let players = [player1.getSigne(), player2.getSigne()]

const Xres = [];
const Ores = [];


function game(){
    for(let i = 0; i < squareGrid.length; i++){
        squareGrid[i].addEventListener('click', changeTurn);
    }
}

function changeTurn(squareChosen){ 
    let squareClickedId = squareChosen.target.dataset.square;
    const squareClicked = document.getElementById(squareClickedId)
    

    
    /*--- check for the win logic --- */
    function checkWin(arg){
        if(arg == 'X'){
            Xres.push(squareClickedId);
        }else{
            Ores.push(squareClickedId);
        }
    }
        
        /*
        winPossibilities.forEach((wCondition) => {
            if(wCondition.every(item => (Xres.includes(item)))){
                log(Xres);
                log('WINNER X');
            }
            if(wCondition.every(item => (Ores.includes(item)))){
                log(Ores);
                log('WINNER Y');
            }
        }); */



       /* winningPossibilities.forEach( (possibilitie) =>{
            if(possibilitie.every( (arg) =>{
                Xres.includes(arg)
            })){
                alert('Winner')
            }

            if(possibilitie.every( (arg) =>{
                Ores.includes(arg)
            })){
                alert('Winner')
            }
        }) */

    /*--------------------------------*/
 
    if(activePlayer == 0){
        if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
            return;
        }else{
            squareClicked.innerText = players[activePlayer];
            checkWin(players[activePlayer]);
            activePlayer = 1  
        }
    }else{
        if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
            return;
        }else{
            squareClicked.innerText = players[activePlayer];
            checkWin(players[activePlayer]);
            activePlayer = 0;   
        }
    }

}

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/


const arrayTotal = [4, 2, 1, 5, 8];

let combinationArray = [];

arrayTotal.sort();


for (let i = 0; i < (arrayTotal.length - 2); i++) {

  for (let j = (i + 1); j < (arrayTotal.length - 1); j++) {

    for (let k = (j + 1); k < arrayTotal.length; k++) {

      combinationArray.push([arrayTotal[i], arrayTotal[j], arrayTotal[k]])
    }
  }
}
 console.log(combinationArray);

const a = [1, 2, 3, 5];
const b = [1, 2, 3, 5];
let result = false

function isEqual(a, b){
    // If length is not equal
    if(a.length!=b.length)
     return result;
    else{
     
    // Comparing each element of array
     for(let i=0;i<a.length;i++)
     if(a[i]!=b[i])
      return result;
      return !result;
    }
}



for(let i = 0; i < winPossibilities.length; i++){
    for(let j = 0; j <combinationArray.length; j++){
        if(isEqual(winPossibilities[i], combinationArray[j]) == true){
            log('HOURRAH');
            log(`(${i} : ${winPossibilities[i]}), (${j} : ${combinationArray[j]})`)
            break;
        };
    }
}