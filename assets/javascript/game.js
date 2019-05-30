var wins = 0;
var losses = 0;
var currentTarget = 0;
var currentValue = 0;
var currentTotal = 0;
var c1v = 0; // item 1's value
var c2v = 0;
var c3v = 0;
var c4v = 0;
var timeoutID;
var gTimeoutVar;
var gmsToShow = 1000;
var gmsToShowLastMove = 4000;

reset();

$(".notificationClose").on("click", function () {
    $(this).fadeOut(3000,function(){
        $(this).remove();
    })
    flashready();
});

function flashready() {
   // todo: make buttons light up or something; 
}

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
    updateGUI();
    if (currentTotal === currentTarget) {
        // report win and reset
        reportWin();
    } else { 
        if (currentTotal > currentTarget) {
            reportLoss();
            // report lose and reset
        } else {
            // this must be a still active game.
            //updateGUI();
            updateGUIforMove();
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
    c1v = generateItemValue();
    c2v = generateItemValue();
    c3v = generateItemValue();
    c4v = generateItemValue();
    //sbm("main:"+currentTarget+" c1v="+c1v+" c2v="+c2v+" c3v="+c3v+" c4v="+c4v);
}

function generateItemValue() {
    // Each item should have a random hidden value between 1 - 12.
    var random = 0;
    do { // loop until the value is not used by other items.
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
    if (currentValue === 0) {
        $("#currentValue").text('Current Value: ? (unknown)');
    } else {
        $("#currentValue").text('Current Value: ' + currentValue);
    }
}

function updateGUIforMove() {
    var msg = "added "+currentValue+" to the total we now have " + currentTotal + " and we need " + currentTarget + ".";
    sbm(msg, gmsToShowLastMove);    
}
    
// sbm = Status Bar Message
function sbm(msg, msToShow) {
    if ( msToShow === undefined ) {
        msToShow = gmsToShow;
    }
    clearTimeout(gTimeoutVar);
    gTimeoutVar = $("#sbmPanel").text(msg);
    setTimeout(clearSBM, msToShow);
}

function clearSBM() {
    $("#sbmPanel").text('');
}    
