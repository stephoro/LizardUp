GameEngine.launch();
var mainChild = createDiv(false,false);
var mainPrompt = new GameEngine.prompt(mainChild,"shopPopMain");


var shopSkinsChild = createDiv(false,false,"Shop Enviro");
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem slt",mainChild);
shopSkinsPrompt.prompt.addEventListener("click",function(){
	window.location.href="./shop.html";
});

var shopSkinsChild = createDiv(false,false,"Shop Powerups");
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem srt",mainChild);
shopSkinsPrompt.prompt.addEventListener("click",function(){
	window.location.href="./shopPowerups.html";
});

var shopSkinsChild = createDiv(false,false,"Shop Real");
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem slb",mainChild);
shopSkinsPrompt.prompt.addEventListener("click",function(){
	window.location.href="./shopReal.html";
});

var shopSkinsChild = createDiv(false,false,"Shop Skins");
var shopSkinsPrompt = new GameEngine.prompt(shopSkinsChild,"shopPopItem srb",mainChild);
shopSkinsPrompt.prompt.addEventListener("click",function(){
	window.location.href="./shopSkins.html";
});

var continueChild = createDiv(false,false,"Play Again");
var continuePrompt = new GameEngine.prompt(continueChild,"shopPopContinue");
