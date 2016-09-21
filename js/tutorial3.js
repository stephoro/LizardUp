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

document.getElementById("rpp").addEventListener("click", function() {
			hiderShow(function(){
				setItem("TUTVIEWED",true,function(){
            window.location.href="./game.html";
				});
			});
        });