

//$(document).ready(function()
//{
//	$(div).hide();
//});

 


var myGamePiece;
var myObstacles = [];
var myScore;
var score = 0;
var myBackground;
var bImage ;
var enemy = [];
var gameOver = false ;

function startGame() {    
    

	myGamePiece = new component(50, 50, "http://vignette1.wikia.nocookie.net/angrybirds/images/7/73/FemaleRedBird.png/revision/latest?cb=20110219155354", 10,      150,"image");
	myScore = new component("20px", "Consolas", "black", 10, 20, "text");
	myGameArea.start();
   
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
        	this.canvas.width = 480;
        	this.canvas.height = 300;
        
        	this.context = this.canvas.getContext("2d");
        	document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	   	this.frameNo = 0;   
	   	this.interval = setInterval(updateGameArea, 20);

 	      window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
         })
         window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
         })

       },
       clear : function() {
       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
       },

	
        //here explosion code goes
	    stop : function() {
             clearInterval(this.interval);
    	}

}

function everyinterval(n) {
       if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
       return false;
} 


function component(width, height, color, x, y, type) {
      this.type = type;
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;
      this.x = x;
      this.y = y;
      this.gravity = 0.9;
      this.gravitySpeed = 2;
      this.color = color ;
      if (type == "image") {
      
      	this.image = new Image();
        this.image.src = this.color;
       }
   
      this.update = function() {
         ctx = myGameArea.context;

	 switch(type){
	 case "text":
                    ctx.font = this.width + " " + this.height;
              	     ctx.fillStyle = this.color;
                    ctx.fillText(this.text, this.x, this.y);
			break ;
         case "image" :
					  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			break ;
	 default:
                        ctx.fillStyle = this.color;
                        ctx.fillRect(this.x, this.y, this.width, this.height);            
			
	}
       
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    //gravity
    this.newPos1 = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
   //gravity

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
	//alert("crash");
        
        return crash;
    }
    //here explosion code goes

}

//var explosion()
//{
	//this.hide();	
//}


function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {

           score += 1;
           var x = myObstacles[i] ;
          // myGamePiece.speedX = 10;
            //   myGamePiece.speedY = -10;

            while(x.width > 10 && x.height > 0)
            {
			   		x.width -=12;
           			x.height -= 20 ;
            }
/*
           x.color = '#fb940e';
			  $(x).hide();

*/

  	  	//	function () { $('.hurdles').( "explode", {pieces: 16}, 2000 );	 }


			  	
           myObstacles[i].update();          
          
        //myGameArea.stop();
        //return;
        }
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -2; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 2; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -2; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 2; }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        myObstacles.push(new component(40, 40, "http://www.freeiconspng.com/uploads/fast-food-icon-1.png", 470, 190,"image"));
	

	setTimeout(function(){
	
	      myObstacles.push(new component(40, 40, "http://graphichive.net/uploaded/fordesigner/1313336642.jpg", 470, 40,"image"));
	},900);

  	  enemy.push(new component(20, 20, "https://media.giphy.com/media/OefiWyPTfPQNq/giphy.gif", 170, 0,"image"));
	
     enemy.push(new component(20, 20, "https://pic.chinesefontdesign.com/uploads/2016/05/06-5.gif", 470, 0,"image"));
	  
	  setTimeout(function(){
	
	       enemy.push(new component(20, 20, "http://emoji-free.com/material/049-angry_free_image.png", 270, 0,"image"));
	  },900);

    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].className = "hurdles";
		  myObstacles[i].x -= 1.8;
        myObstacles[i].update();
    }

//	enemy objects

 for (i = 0; i < enemy.length; i += 1) {
        if (myGamePiece.crashWith(enemy[i])) {         
          myGamePiece.image.src = "http://vignette2.wikia.nocookie.net/angrybirds/images/d/df/Chewie.png/revision/latest?cb=20121109093949" ; 
          myGamePiece.newPos1();
          myGamePiece.update();
			 setTimeout(function(){
				myGameArea.stop();
	       },1000);

          
       //   return;
        }
    }

  
    for (i = 0; i < enemy.length; i += 1) {
        enemy[i].className = "enemy";
		  enemy[i].y += 1.5;
		  enemy[i].x -= 1.3;
        enemy[i].update();
    }


	// enemy object ends  */




    myGamePiece.newPos();
    myGamePiece.update();


    myScore.text="SCORE: " + score;
    myScore.update();

}


function FixedUpdate()
{
    myGamePiece.newPos();
    myGamePiece.update();

}
function moveup() {
    myGamePiece.speedY = -2;
    updateGameArea();
}

function movedown() {
    myGamePiece.speedY = 2;
    updateGameArea();
}

function moveleft() {
    myGamePiece.speedX = -2;
    updateGameArea();
}

function moveright() {
    myGamePiece.speedX = 2;
    updateGameArea();
}

function clearmove() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function restart()
{ 
	location.reload();
}
var playing = true ;
function stop()
{
	if(playing){
    //  var ele = document.getElementById("pause");
     // ele.value = "Resume";
     //alert(ele.value);
		myGameArea.stop();
		playing = false ;
	}
	else{
		myGameArea.start();
		playing = true ;
	}
}

 /*   document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            myGamePiece.speedX = -1;
            break;
        case 38:
            myGamePiece.speedY = -1;
            break;
        case 39:
            myGamePiece.speedX = 1;
            break;
        case 40:
            myGamePiece.speedY = 1;
            break;
    }
    };*/










/*
$(document).ready(function()
{
	prompt("");
});*/


/* $(document).keydown(function(event){    
    var key = event.which;
confirm("");                
            switch(event) {
              case 37:
                  myGamePiece.speedX -= 1;
		  confirm("");
                  break;
              case 38:
                  myGamePiece.speedY -= 1;
                  confirm("");
		break;
              case 39:
                  myGamePiece.speedX += 1;
		confirm("");
                  break;
              case 40:
                  myGamePiece.speedY += 1;
                 
		 break;
	      default:
		myGamePiece.speedY += 0;
		myGamePiece.speedX += 0;
        }   
  });
*/




