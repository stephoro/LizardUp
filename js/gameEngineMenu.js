//Nothing too interesting here, just a preloader for images you can
//Collapse chunks in edity with Alt + L
//Launch At: https://www.googledrive.com/host/0B3xd8PRkAtfqfmFWUUlMOUpuWGZmeGpRcVMwbFdvMGZTekpLM0hCSFhlSWtlQ1JvUjhGUDA

/*

GameEngine.launch({types:["vis"],keys:["teacher"],urls:["http://stephenoro.com/teachercast.png"]});


var fg = new CanvasLayer(GameEngine,{});
fg.drawList.expand();
var vis = GameEngine.archetypes.types.vis;
var builder = vis.builders[vis.keys.indexOf("teacher")]; 
var entity = new Entity(GameEngine.width/2,GameEngine.height/2,builder.width,builder.height,0.1,builder.img,1,0,100,100);
fg.drawList.add(entity);

 
var entity2 = new Entity(GameEngine.width/2-200,GameEngine.height/2,builder.width,builder.height,0.1,builder.img,1,0,100,100);
fg.drawList.add(entity2);

entity.vL = 0;
entity.target = entity2;
entity.tween.push(entity.sight);
entity.tween.push(entity.targetTween);

entity2.vL = 0;
entity2.target = entity;
entity2.tween.push(entity2.sight);
entity2.tween.push(entity2.targetTween);

tween2(entity,"x", 1000, -500 ,2 ,false);

tween2(entity,"x", 1000, 1000 ,2 ,false);

tween2(entity,"x", 1000, -1000 ,2 ,false);

*/
var autocontinue = true;

function out(url) 
{

}
out("checkos");
var GT = 1;
var gameDiv = document.getElementById("game");


function splice(where, what) {
    var ind = where.indexOf(what);
    if (ind != -1)
        where.splice(ind, 1);
}

//the distance formula, send in (x1-x2,y1-y2) kthanks

function distance(x, y) {
    return Math.sqrt(x * x + y * y);
}

var ImagePreloader = function(engine) {
    var self = this;
    this.urls = {};
    this.imgs = {};
    this.toRemove = [];
    this.add = function(key, url) {
        this.urls[key] = url;
        this.toLoadCount++;
    };
    this.hider = null;
    this.screen = null;
    this.margin = 100;
    this.loadWidth = engine.width - this.margin * 4;
    this.loadbar = null;
    this.loadHolder = null;
    this.loadText = null;
    this.waitText = null;
    this.setUpLikeCanvas = function(div) {
        div.style.width = engine.width;
        div.style.height = engine.height;
        div.style.position = "absolute";
        div.style.top = 0;
        div.style.left = 0;
    };
    this.setUpLikeScreen = function(div) {
        div.style.overflow = "hidden";
    };
    this.setUpLikeHider = function(div) {
        div.style.backgroundColor = "#ffffff";
        div.style.textAlign = "center";
    };
    this.setUpLikeLoadHolder = function(div) {
        var borW = 1;
        var MRL = this.margin;
        var PD = 3;
        var H = 20;
        var W = engine.width - MRL * 2 - PD * 2 - borW * 2;
        var MRT = (engine.height - H) / 2;
        H -= PD * 2 + borW * 2;
        div.style.border = borW + "px solid";
        div.style.borderColor = "#9f9f9f";
        div.style.backgroundColor = "#ffffff";
        div.style.marginLeft = MRL;
        div.style.marginTop = MRT;
        div.style.width = W;
        div.style.height = H;
        div.style.position = "absolute";
        div.style.top = 0;
        div.style.left = 0;
        div.style.padding = PD;
    };
    this.setUpLikeLoadBar = function(div) {
        div.style.backgroundColor = "#882222";
        div.style.width = "0%";
        div.style.height = "100%";
    };
    this.setUpLikeLoadText = function(div) {
        div.style.color = "#000000";
        div.textContent = "0%";
    };
    this.setUpLikeWaitText = function(div) {
        div.style.color = "#000000";
        div.textContent = "Lizard Up!";
    };
    this.imgLoad = function() {
        self.loadedCount++;
        var per = Math.round((self.loadedCount / self.toLoadCount) * 100) + "%";
        self.loadbar.style.width = per;
        self.loadText.textContent = per;
        self.toRemove.push(this);
        if (self.progress)
            self.progress();
        if (self.complete && self.loadedCount == self.toLoadCount) {
            self.complete();
            for (var removable in self.toRemove) {
                self.screen.removeChild(self.toRemove[removable]);
            }
            gameDiv.removeChild(self.screen);
            gameDiv.removeChild(self.hider);
        }

    };
    this.load = function() {
        if (!this.hider) {
            this.hider = document.createElement("DIV");
            this.screen = document.createElement("DIV");
            this.loadbar = document.createElement("DIV");
            this.loadHolder = document.createElement("DIV");
            this.loadText = document.createElement("DIV");
            this.waitText = document.createElement("DIV");
            this.hider.appendChild(this.loadHolder);
            this.loadHolder.appendChild(this.loadbar);
            this.loadHolder.appendChild(document.createElement("BR"));
            this.loadHolder.appendChild(this.loadText);
            this.loadHolder.appendChild(this.waitText);
        }
        gameDiv.appendChild(this.screen);
        gameDiv.appendChild(this.hider);
        this.setUpLikeCanvas(this.hider);
        this.setUpLikeCanvas(this.screen);
        this.setUpLikeHider(this.hider);
        this.setUpLikeScreen(this.screen);
        this.setUpLikeLoadHolder(this.loadHolder);
        this.setUpLikeLoadBar(this.loadbar);
        this.setUpLikeLoadText(this.loadText);
        this.setUpLikeWaitText(this.waitText);


        for (var i in this.urls) {
            this.imgs[i] = document.createElement("IMG");
            this.imgs[i].onload = this.imgLoad;
            this.imgs[i].src = this.urls[i];
            self.screen.appendChild(this.imgs[i]);
        }
    };
    this.complete = null;
    this.progress = null;
    this.toLoadCount = 0;
    this.loadedCount = 0;
};

var GameEngine = {
	ow:0,
	oh:0,
    launch: function(opts) {
        var options = {
            bgColor: "black",
            types: [],
            keys: [],
            urls: [],
			smooth:false,
			bannerHeight: 0
        };
        handler.merge(options, opts);
		GameEngine.bannerHeight = options.bannerHeight;
        if (options.bgColor) {
            document.body.style.backgroundColor = options.bgColor;
        }
        this.width = window.innerWidth;
        this.height = window.innerHeight-GameEngine.bannerHeight;
		this.ow=this.width;
		this.oh=this.height;
        for (var k in options.keys) {
            this.archetypes.push(options.types[k], options.keys[k], options.urls[k]);
        }

        var toLoadList = this.archetypes.getToLoad();
		this.options = options;
        if (options.keys.length > 0) {
            var preloader = new ImagePreloader(this);

            for (var build in toLoadList) {
                var building = toLoadList[build];
                preloader.add(building.type, building.toLoad.src);
            }
            preloader.complete = function() {

                for (var build in toLoadList) {
                    var building = toLoadList[build];
                    building.toLoad.img = preloader.imgs[building.type];
                    building.toLoad.width = preloader.imgs[building.type].clientWidth;
                    building.toLoad.height = preloader.imgs[building.type].clientHeight;
                }
				
                GameEngine.update();
                if (options.complete)
                    options.complete();
            };

            preloader.load();
        } else {
            GameEngine.update();
            if (options.complete)
                options.complete();
        }
    },
    resize:function(){
        var ow = GameEngine.width;
        var oh = GameEngine.height;
        GameEngine.width=window.innerWidth;
    	GameEngine.height=window.innerHeight-GameEngine.bannerHeight;
        GameEngine.x += GameEngine.width - ow;
        GameEngine.y += GameEngine.height - oh;
        for(var c in GameEngine.canvases){
			var mt = 1;
			if(GameEngine.IS_HIGH_DEF) mt = 2;
            GameEngine.canvases[c].canvas.width = "" + GameEngine.width*mt;
            GameEngine.canvases[c].canvas.height = "" + GameEngine.height*mt;
			GameEngine.canvases[c].canvas.style.width= GameEngine.width
			GameEngine.canvases[c].canvas.style.height= GameEngine.height
			if(GameEngine.IS_HIGH_DEF) GameEngine.canvases[c].ctx.scale(2,2);
			GameEngine.canvases[c].ctx.imageSmoothingEnabled = GameEngine.options.smooth;
			GameEngine.canvases[c].ctx.mozImageSmoothingEnabled = GameEngine.options.smooth;
			GameEngine.canvases[c].ctx.webkitImageSmoothingEnabled = GameEngine.options.smooth;
        }
        for (var c in GameEngine.canvases) {
                var canvas = GameEngine.canvases[c];
                canvas.ctx.clearRect(0, 0, GameEngine.width, GameEngine.height);
                canvas.drawList.draw(canvas.ctx);
        }
		if(GameEngine.resizeA){
			GameEngine.resizeA();
		}
    },
    canvases: [],
    lastInterval: 0,
    tween: [],
    x:0,
    y:0,
    update: function() {
            if(GameEngine.paused)
                return false;

        var ticks = 1;
        var curInterval = Date.now();
        if (GameEngine.lastInterval) {
            ticks = (curInterval - GameEngine.lastInterval) * 60 / 1000;
        }
		ticks *= GT;
		
        GameEngine.lastInterval = curInterval;
			if(ticks > 3.4){
				ticks = 3.4;
			}
            var tween = 0,
                max = GameEngine.tween.length;
            while (tween < max) {
                if (GameEngine.tween[tween](GameEngine, ticks)) {
                    GameEngine.tween.splice(tween, 1);
                    max--;
                } else {
                    tween++;
                }
            }

            for (var c in GameEngine.canvases) {
                var canvas = GameEngine.canvases[c];
                canvas.ctx.clearRect(0, 0, GameEngine.width, GameEngine.height);
                canvas.drawList.update(ticks);
                canvas.drawList.draw(canvas.ctx);

            }

		if(GameEngine.whamo == undefined || (GameEngine.whamo--) > 0){
            requestAnimationFrame(GameEngine.update);
		}
    },

    //This is the list of possible images to load
    //used during mouse events and map loading
    archetypes: {
        types: {},
        push: function(type, key, source) {
            var oType = this.types[type];
            if (!oType) {
                this.types[type] = {};
                oType = this.types[type];
                oType.builders = [];
                oType.keys = [];
                oType.min = -1;
                oType.max = -1;
            }
            oType.builders.push({
                    src: source
                });
            oType.keys.push(key);
        },
        getBuilder: function(type, index) {
            var oType = this.types[type];
            if (typeof index == "string") {
                index = oType.keys.indexOf(index);
            }
            return oType.builders[index];
        },
        getToLoad: function() {
            var loadList = [];
            for (var type in this.types) {
                var oType = this.types[type];
                for (var builder in oType.builders) {
                    var oBuild = oType.builders[builder];
                    var oKey = oType.keys[builder];
                    if (!oBuild.img) {
                        loadList.push({
                                type: oKey,
                                builder: builder,
                                toLoad: oBuild
                            });
                    }
                }
            }
            return loadList;
        },
        setLoaded: function(type, builder, oBuild) {
            this.types[type].builders[builder] = oBuild;
        },
        find: function(type, index) {
            var oType = this.types[type];
            if (oType) {
                if (index >= oType.min && index <= oType.max) {
                    return oType.locate.indexOf(index);
                }
            }
            return -1;
        }
    },
    _paused: false,
    set paused(x) {
        if(x != this._paused){
        this._paused = x;
        if (x == false) {
            GameEngine.update();
        } else if(x===true){
            GameEngine.lastInterval = 0;
            GameEngine.getReady();
		}else{
			GameEngine.lastInterval = 0;
		}
        }
    },
    get paused() {
        return this._paused;
    },
    getReady: function() {

		
    },
	youLose: function() {
			
    },
	setuplose:null,
	reset:null



};
var _AnEn = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x+this.x);
        var y = Math.floor(GameEngine.y+this.y);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.vr);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
				var w = this.aw;
                var h = this.ah;
		//ctx.fillStyle = "#F00";
		           // ctx.fillRect(0, 0, this.width, this.height);

                ctx.drawImage(this.img, w * this.ax, h * this.ay, w, h, this.ofx, this.ofy, w, h);

            ctx.restore();
    }
};
AnEn = function(x, y, width, height, image, layer, aw, ah, ofx, ofy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = image;
	this.aw = aw;
	this.ah = ah;
    this.l = layer || 0;
	this.ofx = ofx;
	this.ofy = ofy;
  	this.ax = 0;
	this.ay = 0;
    this.an = false;
    this.tween = [];
    for (var func in _AnEn)
        this[func] = _AnEn[func];

};

var _RectEntity = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x+this.x);
        var y = Math.floor(GameEngine.y+this.y);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.vr);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
            ctx.fillStyle = this.clr;
            ctx.fillRect(0, 0, this.width, this.height);


            ctx.restore();
    }
};
RectEntity = function(x, y, width, height, dr, color, vL, layer, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dr = dr;
    this.clr = color;

    this.l = layer || 0;

  
    this.speed = speed;
    this.r = 0;
    this.vr = 0;
    this.tvr = 0;
    this.vL = vL;
    this.an = false;
    this.tween = [];
    for (var func in _RectEntity)
        this[func] = _RectEntity[func];

};

var _ENT = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x+this.x);
        var y = Math.floor(GameEngine.y+this.y);
            ctx.save();
            ctx.translate(x, y);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
			ctx.drawImage(this.img,this.ofx,this.ofy);


            ctx.restore();
    }
};
ENT = function(x, y, width, height, ofx, ofy, image, layer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = image;
	this.ofx = ofx;
	this.ofy = ofy;

    this.l = layer || 0;

  
    
    this.tween = [];
    for (var func in _ENT)
        this[func] = _ENT[func];

};

var _CLOUD = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x/this.speedx+this.x);
        var y = Math.floor(GameEngine.y/this.speedy+this.y);
            ctx.save();
            ctx.translate(x, y);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
			ctx.drawImage(this.img,0,0);


            ctx.restore();
    }
};
CLOUD = function(x, y, width, height, speedx, speedy, image, layer) {
    this.x = x/speedx;
    this.y = y/speedy;
    this.width = width;
    this.height = height;
    this.img = image;
	this.speedx = speedx;
	this.speedy = speedy;
	
    this.l = layer || 0;

  
    
    this.tween = [];
    for (var func in _CLOUD)
        this[func] = _CLOUD[func];

};
var _RLEntity = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x+this.snapTo.x);
        var y = Math.floor(GameEngine.y+this.snapTo.y);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.vr);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
            ctx.fillStyle = this.clr;
            ctx.fillRect(0, Math.floor(-this.height / 2), this.width, this.height);


            ctx.restore();
    }
};
RLEntity = function(snapTo, width, height, dr, color, vL, layer) {
    this.snapTo=snapTo;
    this.width = width;
    this.height = height;
    this.dr = dr;
    this.clr = color;

    this.l = layer || 0;

    this.r = 0;
    this.vr = 0;
    this.tvr = 0;
    this.vL = vL;
    this.an = false;
    this.tween = [];
    for (var func in _RLEntity)
        this[func] = _RLEntity[func];

};

var _Floor = {

    update: function(ticks) {
		this.x -=ticks*GameEngine.dx;
        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
    draw: function(ctx) {
        var x = 0;
        var y = Math.floor(GameEngine.y-this.height+this.y);
		if(y > 26){
            ctx.save();
            ctx.translate(x, y);
            
            			ctx.drawImage(this.clr,this.x,0);



            ctx.restore();
		}
    }
};
Floor = function(color,height,layer) {

    this.clr = color;
    this.height=height;
	this.y = GameEngine.height;
    this.l = layer || 0;
this.x = 0;
    this.tween = [];
    for (var func in _Floor)
        this[func] = _Floor[func];

};
var _BG = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }


    },
	gY:function(){
		return Math.floor(GameEngine.y/this.s-this.height+this.y);
	},
    draw: function(ctx) {
        var x = 0;
        var y = this.gY();
		if(y < GameEngine.height){
            ctx.save();
            ctx.translate(x, y);
            
            ctx.fillStyle = this.clr;
		var wid = GameEngine.width;
		for(var i = 0; i < wid; i+=this.width){
			ctx.drawImage(this.img,i,0);
		}
            ctx.fillRect(0, this.height, GameEngine.width, GameEngine.height-y);


            ctx.restore();
		}
    }
};
BG = function(image,color,y,width,height,layer,speed) {
	
	
    this.img = image;
    this.clr = color;
    this.width=width;
	this.s=speed;
    this.height=height;
	this.y = y;
    this.l = layer || 0;

    this.tween = [];
    for (var func in _BG)
        this[func] = _BG[func];

};
var _Effect = {

    aFrame: function(ticks) {

        this.ta += ticks;
        if (this.ta >= this.bta) {
            this.ta = 0;
            this.ax++;
            if (this.ax > this.rax) {
                this.ay++;
                if (this.ay > this.ray) {
                    this.ay = this.bay;
                    this.ax = this.bax;
                    this.remove();
                } else {
                    this.ax = 0;
                }
            }

        }

    },
    remove: function() {
        map.delOM(this.x, this.y, this.id);

    }
};

//effect object class
var Effect = function(x, y, w, h, ax, ay, rax, ray, ta, r, img, layer) {
    StationaryEntity.call(this, x, y, w, h, 0, img, true, layer, x, y)
    this.ax = ax;
    this.bax = ax;
    this.ay = ay;
    this.bay = ay;
    this.rax = rax;
    this.ray = ray;
    this.ta = 0;
    this.bta = ta;
    this.r = r;
    this.a = 1;
    this.an = true;
    for (var func in _Effect)
        this[func] = _Effect[func];
};

var _Entity = {

    update: function(ticks) {

        var tween = 0,
            max = this.tween.length;

        while (tween < max) {

            if (this.tween[tween](this, ticks)) {
                this.tween.splice(tween, 1);
                max--;
            } else {
                tween++;
            }
        }

        if (this.aFrame)
            this.aFrame(ticks);

        //rotate the visible object
        if (this.vL) {
            this.vr = this.r;
            this.r += this.dr * ticks;
        } else {
            this.vr = this.tvr * (this.dr) + this.vr * (1 - this.dr);
        }

        //Handle movement


    },
    draw: function(ctx) {
        var x = Math.floor(GameEngine.x+this.x);
        var y = Math.floor(GameEngine.y+this.y);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.vr);
            if (this.a < 1) {
                ctx.globalAlpha = this.a;
                if (this.a < 0)
                    this.a = 0;
            }
            if (this.an) {
                var w = this.width;
                var h = this.height;
                ctx.drawImage(this.img, w * this.ax, h * this.ay, w, h, Math.floor(-w / 2), Math.floor(-h / 2), w, h);
            } else {
                ctx.drawImage(this.img, Math.floor(-this.width / 2), Math.floor(-this.height / 2));
            }
            ctx.restore();
    }
};
Entity = function(x, y, width, height, dr, img, vL, layer, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dr = dr;
    this.img = img;

    this.l = layer || 0;

  

    this.speed = speed;
    this.r = 0;
    this.vr = 0;
    this.tvr = 0;
    this.vL = vL;
    this.an = false;
    this.tween = [];
    for (var func in _Entity)
        this[func] = _Entity[func];

};

var handler = {
    merge: function(obj, objM) {
        for (var key in objM) {
            obj[key] = objM[key];
        }
        return obj;
    }
};
function CanvasLayer(engine, opts) {
    var canvas = document.createElement("CANVAS");
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
	var mt = 1;
	if(engine.IS_HIGH_DEF) mt = 2;
    canvas.width = "" + engine.width*mt;
    canvas.height = "" + engine.height*mt;
	canvas.style.width= engine.width
	canvas.style.height= engine.height
    this.ctx = canvas.getContext("2d");
	if(engine.IS_HIGH_DEF) this.ctx.scale(2,2);
	this.ctx.imageSmoothingEnabled = GameEngine.options.smooth;
	this.ctx.mozImageSmoothingEnabled = GameEngine.options.smooth;
	this.ctx.webkitImageSmoothingEnabled = GameEngine.options.smooth;	
    gameDiv.appendChild(canvas);


    this.drawList = {
        //list of objects to draw
        l: [],
        remL: [],
        //add an object to be drawn,
        //every drawable object has a property "l" that
        //identifies it's draw index for better rendering.
        add: function(o) {
            this.l[o.l].push(o);
            o.vis = true;
        },
        //remove an object to be drawn
        remove: function(o) {
            this.remL.push(o);
            o.vis = false;
        },
        removeA: function(o) {
            splice(this.l[o.l], o);
        },
        //add a class of objects to be drawn
        expand: function() {
            this.l.push([]);
        },
        //wipes list
        reset: function() {
            this.l = [];
        },
        //draw the items to the context
        draw: function(ctx) {
            for (var l = 0; l < this.l.length; l++) {
                for (var i = 0; i < this.l[l].length; i++) {
                    this.l[l][i].draw(ctx);
                }
            }
        },
        update: function(ticks) {


            for (var l = 0; l < this.l.length; l++) {
                for (var i = 0; i < this.l[l].length; i++) {
                    this.l[l][i].update(ticks);
                }
            }
            if (this.remL.length > 0) {
                for (var r in this.remL) {
                    this.removeA(this.remL[r]);
                }
                this.remL = [];
            }

        },
        //get index of object in drawlist
        ind: function(o) {
            return this.l[o.l].indexOf(o);
        },
        findClick: function(x, y) {
            for (var l = this.l.length - 1; l > -1; l--) {
                for (var i = 0; i < this.l[l].length; i++) {
                    var o = this.l[l][i];
                    var padding = 10;
                    var ow = o.width+padding;
                    var oh = o.height+padding;
                    if (x > o.x - ow / 2 && x < o.x + ow / 2 && y > o.y - oh / 2 && y < o.y + oh / 2) {
                        return o;
                    }
                }
            }
            return false;
        }
    };


    this.canvas = canvas;

    engine.canvases.push(this);


}

function tween2(obj, prop, ticks, value, x, neg, comp) {
    tween(obj, prop, ticks / 2, value / 2, x, neg, function() {
        tween(obj, prop, ticks / 2, value / 2, x, !neg, comp);
    });
}

function tween(obj, prop, ticks, value, x, neg, comp) {
    var tick = 0;
    var oldVal = 0;
    ticks *= 60 / 1000;
    var func = function(o, t) {
        tick += t;
        var val;
        if (neg) {
            val = 1 - tick / ticks;
            if (val <= 0) {
                val = 0;
            }
        } else {
            val = tick / ticks;
            if (val >= 1) {
                val = 1;
            }
        }

        var m = 1;
        for (var p = 0; p < x; p++) {
            m *= val;
        }


        obj[prop] -= oldVal;
        oldVal = Math.floor(10000 * (neg ? value - value * m : value * m)) / 10000;
        obj[prop] += oldVal;
        if ((val == 1 && !neg) || (val == 0 && neg)) {
            if (comp)
                comp(obj);
            return true;
        } else {
            return false;
        }
    };
    obj.tween.push(func);
}
function wticks(obj, ticks, comp) {
    var func = function(o, t) {
		ticks-=t;
        
        if (ticks <= 0) {
            if (comp)
                comp(obj);
            return true;
        } else {
            return false;
        }
    };
    obj.tween.push(func);
}
function tveen(obj, prop, value, dx, comp) {
    var neg = Math.max(value - dx) < value;
    var func = function(o, t) {

        var x = t * dx;
        value -= x;
        obj[prop] += x;
        if ((!neg && value >= 0) || (neg && value <= 0)) {
            if (comp)
                comp(obj);
            return true;
        } else {
            return false;
        }
    };
    obj.tween.push(func);
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

GameEngine.prompt = function(child,cls,apndTo){
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



GameEngine.IS_HIGH_DEF = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));

