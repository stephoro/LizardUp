var LSA;
LSA = localStorage || sessionStorage || LSA;
try {
    LSA.setItem("2", "2");
} catch (e) {
    LSA = {
        getItem: function(key) {
            return LS[key];
        },
        setItem: function(key, value) {
            LS[key] = value;
        }
    };
    alert("this may not work with your browser. if you are in private browsing, switch out of this mode to play");
}
var coinCount;

function getItem(item, callback) {
    var object = {};
    if (LSA) {
        if (typeof item == "string") {
            object[item] = JSON.parse(LSA.getItem(item));
        } else {
            for (var i in item) {
                object[item[i]] = JSON.parse(LSA.getItem(item[i]));
            }
        }
    }
    if (callback)
        callback(object);
}

function setItem(item, value, callback) {
    if (LSA) {
        LSA.setItem(item, JSON.stringify(value));
    }
    if (callback)
        callback();
}
function createDiv(apndTo, classes, text, x, y, w, h) {
    apndTo = apndTo || document.body;
    var div = document.createElement("DIV"); //our main canvas elem
    if (x !== undefined || y !== undefined) {
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
    }
    if (w !== undefined)
        div.style.width = w + "px";
    if (h !== undefined)
        div.style.height = h + "px";
    if (text) {
        div.innerHTML = text;
    }
    if (classes) {
        classes = classes.split(" ");
        for (var c in classes) {
            div.classList.add(classes[c]);
        }
    }
	
    apndTo.appendChild(div);

    return div;
}
function createSpan(classes, text, x, y, w, h) {
    var div = document.createElement("DIV"); //our main canvas elem
    if (x !== undefined || y !== undefined) {
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
    }
    if (w !== undefined)
        div.style.width = w + "px";
    if (h !== undefined)
        div.style.height = h + "px";
    if (text) {
        div.innerHTML = text;
    }
    if (classes) {
        classes = classes.split(" ");
        for (var c in classes) {
            div.classList.add(classes[c]);
        }
    }
    return div;
}
function Bar(item, value) {
    var space = "&nbsp;";

    this.buybtn = createDiv(item, "buybtn");
    this.coinVal = createDiv(this.buybtn, "coinVal", value + space);
    this.coin = createDiv(this.buybtn, "coin");
    this.coinInner = createDiv(this.coin, "coinInner");
}
Mprompt = function(child,cls,apndTo){
	cls = cls || "";
	if(cls.length > 0){
		cls = " " + cls
	}
	this.prompt = createDiv(apndTo,"prompt"+cls);
	this.top = createDiv(this.prompt,"top");
	this.left = createDiv(this.prompt,"left");
	this.bottom = createDiv(this.prompt,"bottom");
	this.right = createDiv(this.prompt,"right");
	this.tl = createDiv(this.prompt,"tl");
	this.tr = createDiv(this.prompt,"tr");
	this.bl = createDiv(this.prompt,"bl");
	this.br = createDiv(this.prompt,"br");
	this.cont = createDiv(this.prompt,"cont");
	this.cont.appendChild(child);
};
var shopDiv = document.getElementById("shop");
function addSkin(name,cost,text, itm){
	var bar = createDiv(shopDiv,"bar");
	var skin = createDiv(false,"skin","&nbsp;");
	skin.style.backgroundImage="url(imgs/"+name+".png)";
	skin.style.backgroundSize="58px 58px";
	var text = createSpan(false,text);
	var cont = createDiv(false,"conten");
	cont.appendChild(skin);
	cont.appendChild(text);
	var prm = Mprompt(cont,"prm",bar);
	var disp = new Bar(bar,cost);
	if(cost == 0){
	disp.buybtn.innerHTML = "use";
	}else if(cost == -1){
	disp.buybtn.innerHTML = "current";
		current =disp.buybtn;
		currentItm = itm;
	}
	disp.buybtn.addEventListener("click",function(){
		if(coins - itm.cost >= 0){
			coins -= itm.cost;
			itm.cost = 0;
			if(current && currentItm){
				current.innerHTML = "use";
currentItm.cost = 0;
			}
			current =disp.buybtn;
		currentItm = itm;
			disp.buybtn.innerHTML = "current";
			coinCount.coinVal.innerHTML = coins + "&nbsp;";
			setItem("OBSCOINS",coins);
			if(owned.indexOf(itm.name) == -1){
				owned.push(itm.name);
				ownedStr += " " + itm.name;
			}
			setItem("owned",ownedStr);
			setItem("enviro",itm.name);
			setItem("mtns",itm.mtns);
			setItem("trs",itm.trs);
			setItem("platform",itm.platform);
			setItem("bgColor",itm.bgColor);
			setItem("mtnsCLR",itm.mtnsCLR);
			setItem("trsCLR",itm.trsCLR);
			setItem("dirt",itm.dirt);
			setItem("cloud",itm.cloud);
			setItem("song",itm.song);
			setItem("OBSCOINS",coins);
			
		}
	});
	createDiv(shopDiv,"barcontainer","&nbsp;");
}
function makeCoinCount(value) {
    var space = "&nbsp;";
    var shop = document.getElementById("shop");
    this.self = createDiv();
    this.coinVal = createDiv(this.self, "coinVal", value + space);
    createDiv(createDiv(this.self, "coin"), "coinInner");
	Mprompt(this.self,"coinDisplay");
}
var owned = [
	"greengrass"
];
var ownedStr = "greengrass";
var items = [
	{name:"greengrass", mtns:"mtns", trs:"trs", platform:"platform", mtnsCLR:"#0B4300", trsCLR:"#005518", bgColor:"#D9EEFC", dirt:"dirt", cloud:"cloud", cost:0, text:"Green Grass - the grass is always greener and there's flowers in the air.", song:"Dubakupado"},
	{name:"pagodaPic", mtns:"pagoda2", trs:"pagoda", platform:"flowPlay", mtnsCLR:"#96C2FF", trsCLR:"#9ba2a7", bgColor:"#FFEAEA", dirt:"flowers", cloud:"cloud", cost:500, text:"<br>Pagoda - pretty in pink.", song:"DamaMay"},
	{name:"redstone", mtns:"savgras1", trs:"savgras", platform:"dirtfor", mtnsCLR:"#935207", trsCLR:"#ba9c0c", bgColor:"#78A9F4 ", dirt:"sandst", cloud:"cloud", cost:500, text:"<br>Desert - feel the heat.", song:"BumbaCrossing"}
];
var coins = 0;
var current = null;
var currentItm = null;
var using = "greengrass";
var coinCount;
getItem(["OBSCOINS","owned","enviro"], function(o) {
coins = o.OBSCOINS || 0;
        //coins = 1500;
owned = (o.owned || ownedStr).split(" ");
ownedStr = o.owned || ownedStr;
	using = o.enviro || using;
var asdf1 = createDiv(false, false, "Back");
	var r = (new Mprompt(asdf1,"back")).prompt
	document.getElementById("shop").appendChild(r);
	r.addEventListener("click", function() {
			hiderShow(function(){
            window.location.href="./game.html";
			});
        });
	createDiv(shopDiv,"barcontainer","&nbsp;");

for(var i in items){
	if(owned.indexOf(items[i].name) != -1){
		items[i].cost = 0;
	}
	if(items[i].name == using){
		items[i].cost = -1;
	}
	addSkin(items[i].name,items[i].cost,items[i].text,items[i]);
}
	createDiv(shopDiv,"barcontainer","&nbsp;");
	createDiv(shopDiv,"barcontainer","&nbsp;");


coinCount = new makeCoinCount(coins + "");
});
var hider = document.getElementById("hider"), hiderOP = 1,hiderInt;	
function hiderShow(compl){
	document.body.appendChild(hider);
	var hiderHide = function(){
		hiderOP +=.01;
		if(hiderOP > 1){
			hiderOP=1;
		}
		hider.style.opacity = hiderOP;
		if(hiderOP == 1){
			clearInterval(hiderInt);
			if(compl)
				compl();
		}
	};
	hiderInt = setInterval(hiderHide,.016);
}
window.addEventListener("load",function(){
	var hiderHide = function(){
		hiderOP -=.01;
		if(hiderOP < 0){
			hiderOP=0;
		}
		hider.style.opacity = hiderOP;
		if(hiderOP == 0){
			document.body.removeChild(hider);
			clearInterval(hiderInt);
		}
	};
	hiderInt = setInterval(hiderHide,.016);
});