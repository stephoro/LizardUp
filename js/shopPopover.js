GameEngine.launch();
var mainChild = createDiv(false,false);
var mainPrompt = new GameEngine.prompt(mainChild,"shopPopMain");

var divSize = 20;
var childWidth = (GameEngine.width-24)/2 - 34-divSize/2;
var childHeight = (GameEngine.height-24)/2 - 34-divSize/2;
var shopSkinsChild = createDiv(false,false,"bye",undefined,undefined,childWidth,childHeight);
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem",mainChild);

var divHor = createDiv(mainChild,"inblo","&nbsp;",undefined,undefined,divSize,divSize);


var shopSkinsChild = createDiv(false,false,"bye",undefined,undefined,childWidth,childHeight);
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem",mainChild);

var divVer = createDiv(mainChild,false,"&nbsp;",undefined,undefined,divSize,divSize);


var shopSkinsChild = createDiv(false,false,"bye",undefined,undefined,childWidth,childHeight);
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem",mainChild);

var divHor = createDiv(mainChild,"inblo","&nbsp;",undefined,undefined,divSize,divSize);


var shopSkinsChild = createDiv(false,false,"bye",undefined,undefined,childWidth,childHeight);
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem",mainChild);