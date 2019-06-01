/// This unit handles most everything about the 'magical items'. 
var ItemsAll = [];
var ItemsCurrent = [];


class Mi {
    constructor(symbol, name) {
        this.symbol = symbol;
        this.name = name;
        this.ivalue = 0;
    }
}

function initItems() { // gets called once per new game 
    createItems();
    setCurrentItems();
    generateItemValues();
    testItems();
}

function setCurrentItems() {
    var IObj;
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var c4 = 0;

    c1 = generateValue();
    c2 = generateValue();
    c3 = generateValue();
    c4 = generateValue();
    
    function generateValue() {
        // Each item should have a random hidden value between 1 - TotalItemCount.
        var random = 0;
        var TotalItemCount = ItemsAll.length;
        do { // loop until the value is not already used by other items.
            random = Math.floor(Math.random() * TotalItemCount) + 1;
        } while ( ! isUnique(random));
        return (random);
    }
    
    function isUnique(random) {
        return ((c1 !== random) && 
                (c2 !== random) &&
                (c3 !== random) &&
                (c4 !== random)); 
    }

    c1 = c1-1;
    c2 = c2-1;
    c3 = c3-1;
    c4 = c4-1;

    // clear the list
    ItemsCurrent.length = 0; 

    IObj = ItemsAll[c1];
    IObj.imasterlistindex = c1;
    ItemsCurrent.push(IObj);

    IObj = ItemsAll[c2];
    IObj.imasterlistindex = c2;
    ItemsCurrent.push(IObj);

    IObj = ItemsAll[c3];
    IObj.imasterlistindex = c3;
    ItemsCurrent.push(IObj);

    IObj = ItemsAll[c4];
    IObj.imasterlistindex = c4;
    ItemsCurrent.push(IObj);
}

function generateItemValues() {
    // dev note: in a more complex version of this game the items would include constants used to set some to mostly low values, others to mostly high values still others to the current 'chaotic' random values. This would make the game a little more interesting as it would means experiance playing it would give users a clue as to what amount each item contains before it's first use. 

    ItemsCurrent[0].ivalue = generateItemValue();
    ItemsCurrent[1].ivalue = generateItemValue();
    ItemsCurrent[2].ivalue = generateItemValue();
    ItemsCurrent[3].ivalue = generateItemValue();

    function generateItemValue() {
        // Each item should have a random hidden value between 1 - 12.
        var random = 0;
        do { // loop until the value is not used by other items.
            random = Math.floor(Math.random() * 12) + 1;
        } while ( ! isUnique(random));
        return random;
    }

    function isUnique(random) {
        return ((ItemsCurrent[0].ivalue !== random) && 
                (ItemsCurrent[1].ivalue !== random) &&
                (ItemsCurrent[2].ivalue !== random) &&
                (ItemsCurrent[3].ivalue !== random)); 
    }
}

function testItems() {
    console.log("testing items:");
    console.log("ItemsCurrent:");
    console.log(ItemsCurrent);
    console.log("ItemsAll:");
    console.log(ItemsAll);
}


function createItems() { // Master list of magical items, mana value assigned only to those 4 choosen to be 'Current Items'.
    ItemsAll.length = 0;
    var IObj = new Mi("💎","Diamond of Kulgare");
    ItemsAll.push(IObj);

    var IObj = new Mi("💍","Gaudy Ring of Zuull");
    ItemsAll.push(IObj);

    var IObj = new Mi("🔆","Emrial's Star of Shining");
    ItemsAll.push(IObj);

    var IObj = new Mi("🎶","Song of Infinite Sorrow");
    ItemsAll.push(IObj);

    var IObj = new Mi("💀","Skull of the Demon Child");
    ItemsAll.push(IObj);

    var IObj = new Mi("🌠","Star of Destruction");
    ItemsAll.push(IObj);

    var IObj = new Mi("🔥","Flame of the Ancients");
    ItemsAll.push(IObj);

    var IObj = new Mi("⚡","Bolt of very frightening");
    ItemsAll.push(IObj);

    var IObj = new Mi("🌬","(not real sure about this ones 'power')");
    ItemsAll.push(IObj);

    var IObj = new Mi("🗿","Idol of the Watchers");
    ItemsAll.push(IObj);

    var IObj = new Mi("🎇","Flare of Destiny");
    ItemsAll.push(IObj);

    var IObj = new Mi("🏔","Spirit of the Mountain");
    ItemsAll.push(IObj);

    var IObj = new Mi("🔮","Future Vision");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("⛓","Links to the Past");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("💫","Orbit of Twins");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("🕯","Candle of the Sorcerer");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("♨","Snakes from the Pit");
    ItemsAll.push(IObj);

    var IObj = new Mi("♿","Chair of Perseverance");
    ItemsAll.push(IObj);

    var IObj = new Mi("⛇","Demon of Winter");
    ItemsAll.push(IObj);

    var IObj = new Mi("❧","Ivy of Pain");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("⛒","Cross of Out");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("⛩","Shrien  of Delight");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("🔱","Master of The Seas");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("🈲","Prohibited Extract");
    ItemsAll.push(IObj);
    
    var IObj = new Mi("🈴","Symbol of the Passing Grade");
    ItemsAll.push(IObj);
}



