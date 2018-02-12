
Game = function() 
{

	this.m_objToDraw = new Array();
	this.m_objToAnimate = new Array();
	this.m_objToCollide = new Array();
	this.m_objWithGravity = new Array();

	this.m_gravity = 0.3;
	


	var winWidth  = window.innerWidth * 0.8;
	var winHeight = window.innerHeight * 0.8;

	this.m_width =  winWidth;
	this.m_height = winHeight;

	this.m_wallSize = 5;

	this.m_ball = null;
	this.m_player1 = null;
	this.m_player2 = null;

	this.createCanvas();
	this.createObjects();
	this.createBall();
	this.createWalls();
	this.createPlayers();
}

Game.prototype.createCanvas = function()
{
	var canvas = document.getElementById("canvas");

	this.m_canvas = new Canvas(canvas);
	this.m_canvas.setHeight(this.m_height);
	this.m_canvas.setWidth(this.m_width);
}


Game.prototype.createObjects = function()
{
	var bg = new Background(this.m_width/2-300,100);
	this.m_objToDraw.push(bg);
}

Game.prototype.createWalls = function()
{
	var floor1 = new Wall(0,this.m_height-this.m_wallSize,this.m_width/2,this.m_height-this.m_wallSize,this.m_width/2,this.m_height,0,this.m_height);
	this.m_objToDraw.push(floor1);
	this.m_objToCollide.push(floor1);
	floor1.setGoal();

	var floor2 = new Wall(this.m_width/2,this.m_height-this.m_wallSize,this.m_width,this.m_height-this.m_wallSize,this.m_width,this.m_height,this.m_width/2,this.m_height);
	this.m_objToDraw.push(floor2);
	this.m_objToCollide.push(floor2);
	floor2.setGoal();

	
	var wall1 = new Wall(0,0,this.m_wallSize,0,this.m_wallSize,this.m_height,0,this.m_height);
	this.m_objToDraw.push(wall1);
	this.m_objToCollide.push(wall1);

	var wall2 = new Wall(this.m_width-this.m_wallSize,0,this.m_width,0,this.m_width,this.m_height,this.m_width-this.m_wallSize,this.m_height);
	this.m_objToDraw.push(wall2);
	this.m_objToCollide.push(wall2);

	var wall3 = new Wall(0,0,this.m_width,0,this.m_width,this.m_wallSize,0,this.m_wallSize);
	this.m_objToDraw.push(wall3);
	this.m_objToCollide.push(wall3);


	var middleWallHeight = 40;

	var wall4 = new Wall(this.m_width/2-this.m_wallSize,
						this.m_height-middleWallHeight*this.m_wallSize,
						this.m_width/2+this.m_wallSize,
						this.m_height-middleWallHeight*this.m_wallSize,
						this.m_width/2+this.m_wallSize,
						this.m_height,
						this.m_width/2-this.m_wallSize,
						this.m_height);

	this.m_objToDraw.push(wall4);
	this.m_objToCollide.push(wall4);
}

Game.prototype.createBall = function()
{
	var ball = new Ball(this.m_width/5,300,0,-10,15);
	this.m_ball = ball;

	this.m_objToDraw.push(ball);
	this.m_objToAnimate.push(ball);
	this.m_objToCollide.push(ball);
	this.m_objWithGravity.push(ball);
}

Game.prototype.createPlayers = function() 
{
	var radius = 80;

	this.m_player1 = new Player(this.m_width/4,this.m_height-1*this.m_wallSize-radius-1,radius,1,this.m_wallSize,this.m_width/2-this.m_wallSize);
	this.m_objToDraw.push(this.m_player1);
	this.m_objToAnimate.push(this.m_player1);
	this.m_objToCollide.push(this.m_player1);
	this.m_objWithGravity.push(this.m_player1);

	this.m_player2 = new Player(3*this.m_width/4,this.m_height-1*this.m_wallSize-radius-1,radius,2,this.m_width/2+this.m_wallSize,this.m_width-this.m_wallSize);
	this.m_objToDraw.push(this.m_player2);
	this.m_objToAnimate.push(this.m_player2);
	this.m_objToCollide.push(this.m_player2);
	this.m_objWithGravity.push(this.m_player2);

}

Game.prototype.getPlayer1 = function()
{
	return this.m_player1;
}

Game.prototype.getPlayer2 = function()
{
	return this.m_player2;
}

Game.prototype.getFrequency = function()
{
	return this.m_freq;
}


Game.prototype.moveObjects=function()
{
	for(var i = 0; i < this.m_objToAnimate.length; i++)
	{
		this.m_objToAnimate[i].animate();
	}
}


Game.prototype.forceBounds = function()
{
	
	for(var i = 0; i < this.m_objToCollide.length; i++)
	{
			this.m_objToCollide[i].forceBounds(this.m_wallSize,this.m_wallSize,
								this.m_width-this.m_wallSize,this.m_wallSize,
								this.m_wallSize,this.m_height-this.m_wallSize,
								this.m_width-this.m_wallSize,this.m_height-this.m_wallSize);
	}
}


Game.prototype.forceGravity = function()
{

	for(var i = 0; i < this.m_objWithGravity.length; i++)
	{
		this.m_objWithGravity[i].forceGravity(this.m_gravity);
	}
}

Game.prototype.updateDisplay = function()
{
	this.m_canvas.clear();

	var item = null;

	for(var i = 0; i < this.m_objToDraw.length; i++)
	{
		this.m_objToDraw[i].draw(this.m_canvas.getHtmlCanvas());
	}
}

Game.prototype.checkColisions = function()
{
	var item1 = null;
	var item2 = null;

	for(var i = 0; i < this.m_objToCollide.length; i++)
	{
		var item1 = this.m_objToCollide[i];

		for(var j = 0; j < this.m_objToCollide.length; j++)
		{
			if(i != j)
			{
				var item2 = this.m_objToCollide[j];
				item1.checkColisions(item2);
			}
		}
	}
}

Game.prototype.iterate = function()
{
	this.checkColisions();
	this.moveObjects();
	this.forceGravity();
	//this.forceBounds();

	//this.m_player1.play(this.m_ball);
	this.m_player2.play(this.m_ball);
	

	this.updateDisplay();
}
