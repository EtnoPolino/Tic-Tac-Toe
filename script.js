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


const displayController = (function(){
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    const okSubmit = document.querySelectorAll('button[type=submit');
    const playerLabel1 = document.querySelector('.player1');
    const playerLabel2 = document.querySelector('.player2');

    const _setPlayersName = function(e){
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
        ok.addEventListener('click', _setPlayersName);
    });

    return{player1, player2}
})();


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
    const resetButton = document.querySelector('footer > button');
    const playerTurn = document.querySelector('article > span');
    let players = [displayController.player1.getSigne(), displayController.player2.getSigne()];

    let activePlayer = 0;
    let round = 0;

    let Xres = [];
    let Ores = [];


    const _checkWin = function(arg, squareId){
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

    const _changeTurn = function(e){
        let squareClickedId = e.target.dataset.square;
        const squareClicked = document.getElementById(squareClickedId)
        
        if(activePlayer == 0){
            if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
                return;
            }else{
                squareClicked.innerText = players[activePlayer];
                _checkWin(players[activePlayer], squareClickedId);
                if(_checkWin(players[activePlayer], squareClickedId)){
                    for(let i = 0; i < squareGrid.length; i++){
                        squareGrid[i].removeEventListener('click', _changeTurn);
                        playerTurn.innerText = `${displayController.player1.getName()} WON`;
                    }
                }else{
                    playerTurn.innerText = `${displayController.player2.getName()} turn`;
                    activePlayer = 1;
                    round++; 
                }               
            }
        }else{
            if(squareClicked.innerText.includes('X') || squareClicked.innerText.includes('O')){
                return;
            }else{
                squareClicked.innerText = players[activePlayer];
                _checkWin(players[activePlayer], squareClickedId);
                if(_checkWin(players[activePlayer], squareClickedId)){
                    for(let i = 0; i < squareGrid.length; i++){
                        squareGrid[i].removeEventListener('click', _changeTurn);
                        playerTurn.innerText = `${displayController.player2.getName()} WON`;
                    }
                }else{
                    playerTurn.innerText = `${displayController.player1.getName()} turn`;
                    activePlayer = 0;
                    round++; 
                }    
            }
        }

        if(round == 9 && (!Module.compareWinPossibilityToXOresult(winPossibilities, Xres) || !Module.compareWinPossibilityToXOresult(winPossibilities, Ores))){
            playerTurn.innerText = `DRAW`;
            return;
        }
    }
  
    const _resetAll = function(){
        round = 0;
        activePlayer = 0
        Xres = [];
        Ores = [];
        squareGrid.forEach(square =>{
            square.innerText = '';
        });
        for(let i = 0; i < squareGrid.length; i++){
            squareGrid[i].addEventListener('click', _changeTurn);
        };
    }


    for(let i = 0; i < squareGrid.length; i++){
        squareGrid[i].addEventListener('click', _changeTurn);
    }

    resetButton.addEventListener('click', _resetAll);

})();


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