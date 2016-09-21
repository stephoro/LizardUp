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
var vals = {
    slowGT: {
        v: .9,
        ov: .9,
        m: .5,
        d: -.05,
        c: 25,
        dc: 100,
        fac: 1/1.4,
        unit: "x",
        f: function(n, p) {
            if (Math.abs(1/vals[n].v) < Math.abs(1/vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Time Multiplier: ",
        valSetter: null
    },
    timeDur: {
        v: 200,
        ov: 200,
        m: 800,
        d: 30,
        c: 25,
        dc: 100,
        fac: 1 / 60,
        unit: "s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Duration: ",
        valSetter: null
    },
    magWidth: {
        v: 100,
        ov: 100,
        m: 300,
        d: 10,
        c: 25,
        dc: 100,
        fac: 1/8,
        unit: "m",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Width: ",
        valSetter: null
    },
    magDur: {
        v: 500,
        ov: 500,
        m: 2000,
        d: 50,
        c: 25,
        dc: 100,
        fac: 1 / 60,
        unit: "s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Duration: ",
        valSetter: null
    },
    multiX: {
        v: 2,
        ov: 2,
        m: 5,
        d: 1,
        c: 1000,
        dc: 1500,
        fac: 1,
        unit: "x",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = Math.pow(2, cost) * vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Coin Multiplier: ",
        valSetter: null
    },
    multiDur: {
        v: 600,
        ov: 600,
        m: 1800,
        d: 60,
        c: 50,
        dc: 100,
        fac: 1 / 60,
        unit: "s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Duration: ",
        valSetter: null
    },
    balLift: {
        v: -2,
        ov: -2,
        m: -5,
        d: -0.5,
        c: 250,
        dc: 250,
        fac: -1/8*60,
        unit: "m/s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Lift: ",
        valSetter: null
    },
    balDur: {
        v: 200,
        ov: 200,
        m: 300,
        d: 10,
        c: 80,
        dc: 100,
        fac: 1 / 60,
        unit: "s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Duration: ",
        valSetter: null
    },
    fastSP: {
        v: 4.5,
        ov: 4.5,
        m: 7,
        d: 0.5,
        c: 140,
        dc: 140,
        fac: 1/3,
        unit: "x",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Speed Multiplier: ",
        valSetter: null
    },
    speedDur: {
        v: 200,
        ov: 200,
        m: 800,
        d: 60,
        c: 70,
        dc: 70,
        fac: 1 / 60,
        unit: "s",
        f: function(n, p) {
            if (Math.abs(vals[n].v) < Math.abs(vals[n].m)) {
                if (p) {
                    var canbuycost = vals[n].f(n);
                    if (vals.OBSCOINS.v - canbuycost >= 0) {
                        vals[n].v += vals[n].d;
                        vals.OBSCOINS.s(canbuycost);
                        if (vals[n].valSetter)
                            vals[n].valSetter()
                    }
                }
                var cost = (vals[n].v - vals[n].ov) / vals[n].d;
                cost = vals[n].ca ? vals[n].ca[cost] : cost * vals[n].dc + vals[n].c;
                setItem(n, vals[n].v);
                return Math.floor(cost);
            } else {
                return false;
            }
        },
        title: "Duration: ",
        valSetter: null
    },
    multImg: {
        v: "./imgs/multi.png"
    },
    OBSCOINS: {
        v: 0,
        s: function(v) {
            vals.OBSCOINS.v -= v;
            setItem("OBSCOINS", vals.OBSCOINS.v);
        }
    }
};

function makeDisplay(Dtitle, image, n1, n2) {
    var shop = document.getElementById("shop");
    var item, title, img, titleText,
        disps = [],
        barcontainers = [];
    var space = "&nbsp;";
    item = createDiv(shop, "item");
    title = createDiv(item, "title");
    img = createDiv(title, "img", space);
    imgD = createDiv(img, image);

    titleText = createDiv(title, "coinVal", Dtitle);

    disps.push(new Disp(item, vals[n1].title, (Math.floor(100 * (vals[n1].v * vals[n1].fac)) / 100) + vals[n1].unit));
    barcontainers.push(new Bar(item, ((vals[n1].v - vals[n1].ov) / (vals[n1].m - vals[n1].ov)), vals[n1].f(n1)));
    var doChange = vals[n1].f(n1);
    if (doChange) {
        barcontainers[0].coinVal.innerHTML = doChange + space;
    } else {
        barcontainers[0].buybtn.innerHTML = "Max";
    }
    barcontainers[0].buybtn.addEventListener("click", function() {
        var doChange = vals[n1].f(n1, true);
        if (doChange && vals[n1].f(n1)) {
            barcontainers[0].coinVal.innerHTML = doChange + space;
        } else {
            barcontainers[0].buybtn.innerHTML = "Max";
        }
        var perc = ((vals[n1].v - vals[n1].ov) / (vals[n1].m - vals[n1].ov));
        barcontainers[0].barinner.style.width = (256 * perc) + "px";
        disps[0].value.innerHTML = (Math.floor(100 * (vals[n1].v * vals[n1].fac)) / 100) + vals[n1].unit;
        coinCount.coinVal.innerHTML = vals.OBSCOINS.v + space;
    });

    if (n2) {
        disps.push(new Disp(item, vals[n2].title, (Math.floor(100 * (vals[n2].v * vals[n2].fac)) / 100) + vals[n2].unit));
        barcontainers.push(new Bar(item, ((vals[n2].v - vals[n2].ov) / (vals[n2].m - vals[n2].ov)), vals[n2].f(n2)));
        var doChange = vals[n2].f(n2);
        if (doChange) {
            barcontainers[1].coinVal.innerHTML = doChange + space;
        } else {
            barcontainers[1].buybtn.innerHTML = "Max";
        }


        barcontainers[1].buybtn.addEventListener("click", function() {
            var doChange = vals[n2].f(n2, true);
            if (doChange && vals[n2].f(n2)) {
                barcontainers[1].coinVal.innerHTML = doChange + space;
            } else {
                barcontainers[1].buybtn.innerHTML = "Max";
            }
            var perc = ((vals[n2].v - vals[n2].ov) / (vals[n2].m - vals[n2].ov));
            barcontainers[1].barinner.style.width = (256 * perc) + "px";
            disps[1].value.innerHTML = (Math.floor(100 * (vals[n2].v * vals[n2].fac)) / 100) + vals[n2].unit;
            coinCount.coinVal.innerHTML = vals.OBSCOINS.v + space;
        });
    }

    createDiv(item, "barcontainer", space);
return imgD;
}

function makeCoinCount(value) {
    var space = "&nbsp;";
    var shop = document.getElementById("shop");
    this.self = createDiv();
    this.coinVal = createDiv(this.self, "coinVal", value + space);
    createDiv(createDiv(this.self, "coin"), "coinInner");
	Mprompt(this.self,"coinDisplay");
}

function Disp(item, title, value) {
    this.self = createDiv(item, "barcontainer");
    this.title = createDiv(this.self, "coinVal", title);
    this.value = createDiv(this.self, "coinVal", value);
}

function Bar(item, percent, value) {
    var space = "&nbsp;";
    this.self = createDiv(item, "barcontainer");
    this.barholder = createDiv(this.self, "barholder");
    this.bar = createDiv(this.barholder, "bar");
    this.barinner = createDiv(this.bar, "barinner", space, undefined, undefined, 256 * percent);
    this.barover = createDiv(this.bar, "barOver", space);
    this.buybtn = createDiv(this.barholder, "buybtn");
    this.coinVal = createDiv(this.buybtn, "coinVal", value + space);
    this.coin = createDiv(this.buybtn, "coin");
    this.coinInner = createDiv(this.coin, "coinInner");
}

function createDiv(apndTo, classes, text, x, y, w, h) {
	if(apndTo !== undefined){
    apndTo = apndTo || document.body;
	}
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
	if(apndTo)
    apndTo.appendChild(div);

    return div;
}

Mprompt = function(child,cls){
	cls = cls || "";
	if(cls.length > 0){
		cls = " " + cls
	}
	this.prompt = createDiv(false,"prompt"+cls);
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
}
var MUlim;
getItem(["OBSCOINS", "slowGT", "timeDur", "magWidth", "magDur", "multiX", "multiDur", "balLift", "balDur", "fastSP", "speedDur"], function(o) {
    for (var i in o) {
		if(o[i])
            vals[i].v = o[i];
    }
	var asdf1 = createDiv(false, false, "Back");
	var r = (new Mprompt(asdf1,"back")).prompt
	document.getElementById("shop").appendChild(r);
	r.addEventListener("click",function(){
		hiderShow(function(){
			window.location.href="./game.html";
		});
			
	});
	createDiv(document.getElementById("shop"), "barcontainer", "&nbsp;");
    makeDisplay("Magnet", "imgMag", "magWidth", "magDur");
    makeDisplay("Balloon", "imgBal", "balLift", "balDur");
    makeDisplay("Speed Multiplier", "imgSpeed", "fastSP", "speedDur");
    MUlim = makeDisplay("Coin Multiplier", ("imgMulti"+(vals.multiX.v!=2?vals.multiX.v:"")), "multiX", "multiDur");
    makeDisplay("Slow Time", "imgTime", "slowGT", "timeDur");
	createDiv(false, "barcontainer", "&nbsp;");
	createDiv(false, "barcontainer", "&nbsp;");


    coinCount = new makeCoinCount(vals.OBSCOINS.v + "");
	
	
	vals.multiX.valSetter = function (){
		console.log(MUlim);
		MUlim.classList.add("imgMulti"+vals.multiX.v);
		
	}
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