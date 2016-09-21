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
    var div = document.createElement("SPAN"); //our main canvas elem
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
	skin.style.backgroundImage="url(2ximgs/"+name+".png)";
	skin.style.backgroundSize="232px 58px";
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
			current =disp.buybtn;
						}
		currentItm = itm;
			disp.buybtn.innerHTML = "current";
			coinCount.coinVal.innerHTML = coins + "&nbsp;";
			setItem("OBSCOINS",coins);
			if(owned.indexOf(itm.name) == -1){
				owned.push(itm.name);
				ownedStr += " " + itm.name;
			}
			setItem("owned",ownedStr);
			setItem("archiI",itm.name);
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
	"archie"
];
var ownedStr = "archie";
var items = [
	{name:"archie", cost:0, text:"Original Lizard"},
	{name:"blue", cost:250, text:"Lapis Lazuli Blue"},
	{name:"black", cost:250, text:"Charcoal"},
	{name:"red", cost:250, text:"Poppy Red"},
	{name:"white", cost:250, text:"Newsprint Gray"},
	{name:"yellow", cost:250, text:"Sunflower Yellow"},
	{name:"magenta", cost:250, text:"Orchid Magenta"},
	{name:"turquoise", cost:250, text:"Turquoise"},
	{name:"ninja", cost:1000, text:"Ninja Gear"},
	{name:"barbershop", cost:1000, text:"Barbershop Regalia"},
	{name:"royal", cost:9500, text:"Royal Garb"}
];
var coins = 0;
var current = null;
var currentItm = null;
var using = "archie";
var coinCount;
getItem(["OBSCOINS","owned","archiI"], function(o) {
coins = o.OBSCOINS || 0;
owned = (o.owned || ownedStr).split(" ");
ownedStr = o.owned || ownedStr;
	using = o.archiI || using;
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