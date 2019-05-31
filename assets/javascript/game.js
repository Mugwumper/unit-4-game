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
    $(this).fadeOut(2000,function(){
        $(this).remove();
    })
    flashready();
});

$(".notificationItem").on("click", function () {
    $(this).fadeIn(300,function(){});
    $(this).fadeOut(300,function(){});
//    $(this).remove();
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
    applyitem(ItemsCurrent[0]);
}

function applyitem(item) {
    spookynotification(item.name);
}

function spookynotification(name) {
    $("#itemName").text("afasd "+name);
    $(".notificationItem").fadeIn(300,function(){});
    $(".notificationItem").fadeOut(600,function(){});
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
    initItems();
    currentTotal = 0;
    currentValue = 0;
    currentTarget = generateTarget();
    c1v = ItemsCurrent[0].ivalue;
    c2v = ItemsCurrent[1].ivalue;
    c3v = ItemsCurrent[2].ivalue;
    c4v = ItemsCurrent[3].ivalue;
    updateGUIitems();
}

function updateGUIitems() { // one time per game
    $("#c1").html('a'+ItemsCurrent[0].symbol);
    $("#c1").attr('title', ItemsCurrent[0].name);
    $("#c2").text('b'+ItemsCurrent[1].symbol);
    $("#c2").attr('title', ItemsCurrent[1].name);
    $("#c3").text('c'+ItemsCurrent[2].symbol);
    $("#c3").attr('title', ItemsCurrent[2].name);
    $("#c4").text('d'+ItemsCurrent[3].symbol);
    $("#c4").attr('title', ItemsCurrent[3].name);
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

$( "#foo" ).bind( "click", function() {
    alert( "User clicked on 'foo.'" );
  });