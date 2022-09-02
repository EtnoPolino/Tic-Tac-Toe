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

   return {getName, setName, getSigne};
}


const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');


const Gameboard = (function(){

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

    const squareGrid = document.querySelectorAll('.square');
    const playerTurn = document.querySelector('article > span');
    let players = [player1.getSigne(), player2.getSigne()];
    let activePlayer = 0;

    const Xres = [];
    const Ores = [];


    const checkWin = function(arg, squareId){
        let isMarkWinning;
    
        if(arg == 'X'){
            Xres.push(squareId);
            isMarkWinning = Module.compareWinPossibilityToXOresult(winPossibilities, Xres);
            if(isMarkWinning == true){
                return true;
            }            
        }else{
            Ores.push(squareId);
            isMarkWinning = Module.compareWinPossibilityToXOresult(winPossibilities, Ores);
            if(isMarkWinning == true){
                return true;
            }
        }
    }

    const changeTurn = function(e){
        let squareClickedId = e.target.dataset.square;
        const squareClicked = document.getElementById(squareClickedId)
        
        if(activePlayer == 0){
            if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
                return;
            }else{
                squareClicked.innerText = players[activePlayer];
                checkWin(players[activePlayer], squareClickedId);
                if(checkWin(players[activePlayer], squareClickedId)){
                    for(let i = 0; i < squareGrid.length; i++){
                        squareGrid[i].removeEventListener('click', changeTurn);
                        playerTurn.innerText = `${player1.getName()} WON`;
                    }
                }else{
                    playerTurn.innerText = `${player2.getName()} turn`;
                    activePlayer = 1; 
                }               
            }
        }else{
            if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
                return;
            }else{
                squareClicked.innerText = players[activePlayer];
                checkWin(players[activePlayer], squareClickedId);
                if(checkWin(players[activePlayer], squareClickedId)){
                    for(let i = 0; i < squareGrid.length; i++){
                        squareGrid[i].removeEventListener('click', changeTurn);
                        playerTurn.innerText = `${player2.getName()} WON`;
                    }
                }else{
                    playerTurn.innerText = `${player1.getName()} turn`;
                    activePlayer = 0; 
                }    
            }
        }
    }

    for(let i = 0; i < squareGrid.length; i++){
        squareGrid[i].addEventListener('click', changeTurn);
    }

})();



const displayController = (function(){

    const okSubmit = document.querySelectorAll('button[type=submit');
    const playerLabel1 = document.querySelector('.player1');
    const playerLabel2 = document.querySelector('.player2');
    

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




/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

const Module = (function(){
    let isArrayEqual = false;  

    const _createAllTripletOfArray = function(arrayTotal){
        let combinationArray = [];
        arrayTotal.sort();

        for (let i = 0; i < (arrayTotal.length - 2); i++) {
            for (let j = (i + 1); j < (arrayTotal.length - 1); j++) {          
              for (let k = (j + 1); k < arrayTotal.length; k++) {          
                    combinationArray.push([arrayTotal[i], arrayTotal[j], arrayTotal[k]])
              }
            }
        }
        return combinationArray;
    }
                       
    const _findEqualArray = function(a, b){
        if(a.length!=b.length)
            return isArrayEqual;
        else{
            for(let i=0;i<a.length;i++)
                if(a[i]!=b[i]) return isArrayEqual;    
            return !isArrayEqual;
        }
    }

    function compareWinPossibilityToXOresult(winPos, randomArray){
        const combinationArray = _createAllTripletOfArray(randomArray)

        for(let i = 0; i < winPos.length; i++){
            for(let j = 0; j <combinationArray.length; j++){
                if(_findEqualArray(winPos[i], combinationArray[j]) == true){
                     return true;
                }
            }
        }
    }

    return {compareWinPossibilityToXOresult}
})();






/* -------------------------------------Reset the Game------------------------------------------ */

const resetButton = document.querySelectorAll('footer > button');
/*
resetButton.addEventListener('click', resetAll()); */

