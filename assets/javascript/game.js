var wins = 0;
var losses = 0;
var currentTarget = 0;
var currentValue = 0;
var currentTotal = 0;
var timeoutID;
var gTimeoutVar;
var gmsToShow = 1000;
var gmsToShowLastMove = 5000;
var gmsToShowLastItem = gmsToShowLastMove + 300;


reset();

$(".notificationClose").on("click", function () {
    $(this).fadeOut(2000,function(){
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
    sbm2("");
}

function buttonA() {
    applyitem(ItemsCurrent[0]);
}

function buttonB() {
    applyitem(ItemsCurrent[1]);
}

function buttonC() {
    applyitem(ItemsCurrent[2]);
}

function buttonD() {
    applyitem(ItemsCurrent[3]);
}

function applyitem(item) {
    applyvalue(item.ivalue);
    sbm2(item.name, gmsToShowLastItem);
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
    initItems();
    initLocalVars();
    updateGUIitems();
}

function initLocalVars() {
    currentTotal = 0;
    currentValue = 0;
    currentTarget = generateTarget();
}

function updateGUIitems() { // one time per game
    $("#buttonA").html("a<div id='symbol'>" + ItemsCurrent[0].symbol + "</div>");
    $("#buttonA").attr('title', ItemsCurrent[0].name);
    $("#buttonB").html("b<div id='symbol'>" + ItemsCurrent[1].symbol + "</div>");
    $("#buttonB").attr('title', ItemsCurrent[1].name);
    $("#buttonC").html("c<div id='symbol'>" + ItemsCurrent[2].symbol + "</div>");
    $("#buttonC").attr('title', ItemsCurrent[2].name);
    $("#buttonD").html("d<div id='symbol'>" + ItemsCurrent[3].symbol + "</div>");
    $("#buttonD").attr('title', ItemsCurrent[3].name);
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
    $("#sbmPanel").stop();
    $("#sbmPanel").text('');
    $("#sbmPanel").fadeIn(300);
    if ( msToShow === undefined ) {
        msToShow = gmsToShow;
    }
    clearTimeout(gTimeoutVar);
    gTimeoutVar = $("#sbmPanel").text(msg);
    setTimeout(clearSBM, msToShow);
}

function clearSBM() {
    $("#sbmPanel").fadeOut(2000);
}    
  
// sbm2 = (quick replication of above code to satisfy new function)
function sbm2(msg, msToShow) {
    $("#itemName").stop();
    $("#itemName").text('');
    $("#itemName").fadeIn(300);
    if ( msToShow === undefined ) {
        msToShow = gmsToShow + 200;
    }
    clearTimeout(gTimeoutVar);
    gTimeoutVar = $("#itemName").text(msg);
    setTimeout(clearSBM2, msToShow);
}

function clearSBM2() {
    $("#itemName").fadeOut(2000);
}    

