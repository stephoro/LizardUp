


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
            window.location.href="./index.html";
			});
        });