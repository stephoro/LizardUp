function slamGround(){
	if(player.g !== noG){
				player.g=3;
			}
}
window.addEventListener("keydown",function(e){
	var key = e.which;
	switch (key){
		case 32:
			slamGround();
			break;
		
	}

	
});
window.addEventListener("keyup",function(e){
	var key = e.which;
  switch (key){
		case 32:
			break;
		
	}
});

var mouseIsDown=false, mx=0, my = 0;
var mouseDown=function(e){
        if(!GameEngine.paused){

  //gets location from touch or click
  mx = (e.clientX||e.pageX)-GameEngine.x;
  my = (e.clientY||e.pageY)-GameEngine.y;
  e.preventDefault();
  e.stopPropagation();
  
			slamGround();
  //gets touched object if any
           // console.log(mx+":"+my);
  /*var obj = fg.drawList.findClick(mx,my);
            if(obj && obj.istarget){
                
                //player.x=obj.x;
                //player.y=obj.y;
                //remove(obj);
            }
        }*/
		}
};
var mouseMove=function(e){
    if(!GameEngine.paused){
  //move if mousedown
  if(mouseIsDown){
  mx = (e.clientX||e.pageX)-GameEngine.x;
  my = (e.clientY||e.pageY)-GameEngine.y;
    e.preventDefault();
    e.stopPropagation();
  }
    }
};
var mouseUp=function(e){
        if(!GameEngine.paused){

  //move if obj not touched or mousedown
  if(mouseIsDown){
  
  }
  e.preventDefault();
  e.stopPropagation();
        }
};
var pauseClick = function(e){
	GameEngine.paused = true;
	e.preventDefault();
    e.stopPropagation();
};
var musicClick = function(e){
	if(isMusicPlaying){
			backgroundMusic.pause();
		isMusicPlaying = false;
			musDiv.classList.remove("musin");
			musDiv.classList.add("musof");
		setItem("musicplay",isMusicPlaying);
		}else{
						backgroundMusic.play();
			isMusicPlaying = true;
			musDiv.classList.remove("musof");
			musDiv.classList.add("musin");
					setItem("musicplay",isMusicPlaying);

		}
	e.preventDefault();
    e.stopPropagation();
};

window.addEventListener("resize",GameEngine.resize);
window.addEventListener("mousedown",mouseDown);
window.addEventListener("mousemove",mouseMove);
window.addEventListener("mouseup",mouseUp);
window.addEventListener("touchstart",mouseDown);
window.addEventListener("touchmove",mouseMove);
window.addEventListener("touchend",mouseUp);

document.getElementById("pause").addEventListener("mousedown",pauseClick);
document.getElementById("pause").addEventListener("touchstart",pauseClick);

document.getElementById("music").addEventListener("mousedown",musicClick);
document.getElementById("music").addEventListener("touchstart",musicClick);