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
        div.style.top = y;
        div.style.left = x;
    }
    if (w !== undefined){
        div.style.width = w +"px";
		div.style.marginLeft = (-w/2)+"px";
	}
    if (h !== undefined){
        div.style.height = h+"px";
		div.style.marginTop = (-h/2)+"px";
	}
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

Mprompt = function(apndTo, cls,child, x, y, w, h){
	cls = cls || "";
	if(cls.length > 0){
		cls = " " + cls
	}
	this.prompt = createDiv(apndTo,"prompt"+cls, undefined,x,y,w,h);
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

var numB = 100/(1+4);
var ifff = 1;
var title = createDiv(undefined,"title","&nbsp;","50%",(numB*(ifff++))+"%",264,111);
var play = createDiv(undefined,undefined,"Play");
var playPrm = new Mprompt(undefined,"menu",play,"50%",(numB*(ifff++))+"%",288,42);
playPrm.prompt.addEventListener("click",function(){
		hiderShow(function(){
			getItem("TUTVIEWED",function(o){
				if(o.TUTVIEWED){
			window.location.href="./game.html";
				}else{
			window.location.href="./tutorial.html";
				}
			});
		});
			
	});
var about = createDiv(undefined,undefined,"Tutorial");
var aboutPrm = new Mprompt(undefined,"menu",about,"50%",(numB*(ifff++))+"%",288,42);
aboutPrm.prompt.addEventListener("click",function(){
		hiderShow(function(){
			window.location.href="./tutorial.html";
		});
			
	});
var credits = createDiv(undefined,undefined,"Credits");
var creditsPrm = new Mprompt(undefined,"menu",credits,"50%",(numB*(ifff++))+"%",288,42);
creditsPrm.prompt.addEventListener("click",function(){
		hiderShow(function(){
			window.location.href="./credits.html";
		});
			
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