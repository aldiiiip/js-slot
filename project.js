

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;
const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
};
const SYMBOLS_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
};




const deposit = () => {
    while(true){
        var depositAmount = prompt("Input Your Deposit Amount: ");
        depositAmount = parseFloat(depositAmount);
        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log("Enter valid deposit amount");
        }
        else{
            return depositAmount;
        }
    }
    
};


const getNumberLines = () => {
    while(true){
        var lines = prompt("Input Number of lines to bet (1-3): ");
        lines = parseFloat(lines);

        if(isNaN(lines) || lines <= 0 || lines > 3){
            console.log("Invalid number of lines");    
        }
        else{
            return lines;
        }
    }
};

const getBet = (balance, numberOfLines) => {
    while(true){

        var bet = prompt("Input Number of lines to bet per line: ");
        bet = parseFloat(bet);
        console.log(balance / numberOfLines);

        if(isNaN(bet) || bet <= 0 || bet > balance / numberOfLines){
            console.log("Invalid amount of bet");    
        }
        else{
            return bet;
        }
    }
};




const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = []
    for (let i =0; i < COLUMNS; i++){
        reels.push([])
    }
    for (let i =0; i < reels.length; i++){
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[j].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
        
    }
    return reels;
};


const printRows = (reels) => {
    for (const reel of reels){
        let reelString = "";
        for (const[i,symbol] of reel.entries()){
            reelString += symbol;
            if (i != reel.length-1){
                reelString += " | ";
            }
        }
        console.log(reelString);
    }
};


const getWinnings = (reels, bet, numberOfLines) =>{

    let winnings = 0;
    for (let row = 0; row < numberOfLines; row++){
        const symbols = reels[row];
        let allSame = true;

        for (const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};


const game = () =>{

    let balance = deposit();

    while(true){
        console.log("Current balance: $"+balance);
        let numberOfLines = getNumberLines();
        let bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reels= spin();
        printRows(reels);
        const winnings = getWinnings(reels, bet, numberOfLines);
        balance += winnings;
        console.log("You won: $"+winnings);

        if (balance <= 0){
            const addDeposit = prompt("No money left, add deposit? (y/n): ");
            if(addDeposit == 'y') balance += deposit(); 
            else break;

        }

        const playAgain = prompt("Want to play again? (y/n): ");
        if (playAgain != 'y') break;
        
    }
    
};

game();

