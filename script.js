/* debut 30/08/2022 à 11h03 - 11h47    https://www.google.com/search?client=firefox-b-e&q=switch+players+js 
https://github.com/garyarzuma
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


const displayController = function(){
   /* 
    const okSubmit_1 = document.querySelector('.left > form > button');
    const okSubmit_2 = document.querySelector('.right > form > button'); */

    const okSubmit = document.querySelectorAll('button[type=submit');

    const form = document.querySelector('form');
    const playerLabel1 = document.querySelector('.player1');
    const playerLabel2 = document.querySelector('.player2');
    const inputPlayer1 = document.querySelector('#player1');
    const inputPlayer2 = document.querySelector('#player2');

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');


    okSubmit.forEach(ok =>{
        ok.addEventListener('click', test)
    })

 /*   okSubmit_1.addEventListener('click',test)
    okSubmit_2.addEventListener('click',test) */
    
    function test(e){
        e.preventDefault();
        log(e.target.form[0].name)

     /*   if(inputPlayer1.value != ''){
            playerLabel1.innerText = `HELLO 1`;
        }
        if(inputPlayer2.value != ''){
            playerLabel2.innerText = `HELLO 2`;
        } */
    }
}


displayController();

























/*---------------------------------------------------------------------------*/
const gridboard = ["0", "1", "2",
                   "3", "4", "5",
                   "6", "7", "8",];


                   


const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

winningCondition.forEach((item, index) =>{
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
for(let i = 0; i < winningCondition.length; i++){
    table[i] = equalsIgnoreOder(winningCondition[i], [0, 8, 4, 8]);
}






/**
 * Pour un joeur 
 * 
*/
























/*---------------- le joueur --------------------------*/



const players_1 = Player('Player 1', 'X');
const players_2 = Player('Player 2', 'O');














const divSquare = document.querySelectorAll('.square');

divSquare.forEach(divSquare => {
    divSquare.addEventListener('click', display_input)
})

function display_input(event){    
    log(event.target.dataset.square)
}


/*-------------- How to switch players when we click --------------*/ 
/*let playerId = 1;
let turn = 0;

function display_input(event){
    
 const divClicked = document.getElementById(square)

    turn++;

    if(playerId == 1){
        if(divClicked.innerText.includes('X') || divClicked.innerText.includes('O')){
            return;
        }else{
            divClicked.innerHTML = 'X';
            playerId = 2;
        } 
    }else if(playerId == 2){
        if(divClicked.innerText.includes('X') || divClicked.innerText.includes('O')){
            return;
        }else{
            divClicked.innerHTML = 'O';
            playerId = 1;
        }
    }
    
    if(turn == 9){
        alert('END OF GAME');
    }
    log('le prochain à jouer est player : '+playerId);
    log(turn); 
}
*/
