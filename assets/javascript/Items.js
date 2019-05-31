

var ItemsAll = [];
var ItemsCurrent = [];

var IObj;

class Mi {
    constructor(symbol, name) {
        this.symbol = symbol;
        this.name = name;
        this.ivalue = 0;
    }
}

function initItems() {
    createItems();
    setCurrentItems();
    generateItemValues();
    testItems();
}

function testItems() {
    console.log("testing items:");
    console.log("ItemsCurrent");
    console.log(ItemsCurrent);
    console.log("ItemsAll");
    console.log(ItemsAll);
}

function createItems() {
    ItemsAll.length = 0;
    var MIObj = new Mi("💎","Diamond of Kulgare");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💍","Gaudy Ring of Zuull");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("🔆","Emrial's Star of Shining");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("🎶","Song of Infinite Sorrow");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💀","Skull of the Demon Child");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💀","Skull2");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💀","Skull3d");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💀","Skull o4");
    ItemsAll.push(MIObj);

    var MIObj = new Mi("💀","Skull of the5");
    ItemsAll.push(MIObj);
}

function setCurrentItems() {
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var c4 = 0;

    c1 = generateIndexValue();
    c2 = generateIndexValue();
    c3 = generateIndexValue();
    c4 = generateIndexValue();
    
    function generateIndexValue() {
        // Each item should have a random hidden value between 1 - TotalItemCount.
        var random = 0;
        var TotalItemCount = ItemsAll.length;
        do { // loop until the value is not used by other items.
            random = Math.floor(Math.random() * TotalItemCount) + 1;
        } while ( ! isIndexUnique(random));
        return (random -1);
    }
    
    function isIndexUnique(random) {
        return ((c1 !== random) && 
                (c2 !== random) &&
                (c3 !== random) &&
                (c4 !== random)); 
    }

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
