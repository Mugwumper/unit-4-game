var wins = 0;
var losses = 0;
var currentTarget = 0;
var currentValue = 0;
var currentTotal = 0;
var c1v = 0; // crystal 1's value
var c2v = 0;
var c3v = 0;
var c4v = 0;
var timeoutID;
var gTimeoutVar;

reset();
detailBegining();

function reset() {
    wins = 0;
    losses = 0;
    generateGame();
    currentValue = 0;
    currentTotal = 0;
    updateGUI();
    sbm("game reset");
}

function c1() {
    applyvalue(c1v);
    detailCV("c1");
}

function c2() {
    applyvalue(c2v);
}

function c3() {
    applyvalue(c3v);
}

function c4() {
    applyvalue(c4v);
}

function applyvalue(cv) {
    if (cv !== 0) {
        currentTotal += cv;
        currentValue = cv;
        checkStatus();
    }
}

function checkStatus() {
    if (currentTotal === currentTarget) {
        // report win and reset
        reportWin();
    } else { 
        if (currentTotal > currentTarget) {
            reportLoss();
            // report lose and reset
        } else {
            // this must be a still active game.
            updateGUI();
        }
    }
}

function reportWin() {
    wins++;
    sbm("Game Won!");
    setTimeout(nextGame, 1500);
}

function reportLoss() {
    losses++
    sbm("Game Lost!");
    setTimeout(nextGame, 1500);
}

function nextGame() {
    generateGame();
    updateGUI();
}


function generateGame() {
    currentTotal = 0;
    currentValue = 0;
    currentTarget = generateTarget();
    c1v = 0;
    c2v = 0;
    c3v = 0;
    c4v = 0;
    c1v = generateCrystalValue();
    c2v = generateCrystalValue();
    c3v = generateCrystalValue();
    c4v = generateCrystalValue();
    sbm("main:"+currentTarget+" c1v="+c1v+" c2v="+c2v+" c3v="+c3v+" c4v="+c4v);
}

function generateCrystalValue() {
    // Each crystal should have a random hidden value between 1 - 12.
    var random = 0;
    do { // loop until the value is not used by other crystals.
        random = Math.floor(Math.random() * 12) + 1;
    } while ( ! isUnique(random));
    return random;
}

function isUnique(random) {
    return ((c1v !== random) && 
            (c2v !== random) &&
            (c3v !== random) &&
            (c4v !== random)); 
}

function generateTarget() {
    // The random number shown at the start of the game should be between 19 - 120.
    var random = Math.floor(Math.random() * 101) + 1;
    random = random + 19;
    return random;
}

function updateGUI() {
    $("#currentTotal").text('Current Total: ' + currentTotal);
    $("#wins").text('wins: ' + wins);
    $("#losses").text('losses: ' + losses);
    $("#currentTarget").text('Target: ' + currentTarget);
    $("#currentValue").text('Current Value: ' + currentValue);
}
    
function sbm(msg) {
    clearTimeout(gTimeoutVar);
    gTimeoutVar = $("#sbmPanel").text(msg);
    setTimeout(clearSBM, 1000);
}

function clearSBM() {
    $("#sbmPanel").text('_');
}    

function sleep(milliseconds) {
    setTimeout(clearSBM, 100);
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}


function detailBegining() {
htm = "Welcome to the Crystal Aggregation Tool <BR><BR>Press each crystal to apply it's value to the Current Total. Beware for each crystal has a value between 1 and 12. The values don't change until starting a new game. The goal is to learn the values while applying them such that you can make Current Total match the Target. Go over this value and you lose.<BR><BR>Press any Crystal to begin." ;
$("#details").html(htm);
//$("#details").text(htm);
}

function detailCV(cv) {
    if (cv === "c1") {
        htm = "You mashed A. It has a value of " ;
        $("#details").html(htm);        


    }
}