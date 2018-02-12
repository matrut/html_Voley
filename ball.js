
Ball = function(x,y,speedX,speedY,radius)
{
	this.m_x = x;
	this.m_y = y;

	this.m_speedX = speedX;
	this.m_speedY = speedY;

	this.m_isMoving = speedX != 0 || speedY != 0;
	this.m_radius = radius;

	this.m_collisions = 0;
	this.m_explosion = 0;

	this.m_velocity = Math.sqrt(speedX*speedX+speedY*speedY);

	this.m_hasCallback = false;
}



Ball.prototype.isMoving = function()
{
	return this.m_isMoving;
}

Ball.prototype.forceBounds = function(x1,y1,x2,y2,x3,y3,x4,y4)
{
}

Ball.prototype.getX = function()
{
	return this.m_x;
}

Ball.prototype.getY = function()
{
	return this.m_y;
}

Ball.prototype.getSpeedX = function()
{
	return this.m_speedX;
}

Ball.prototype.getSpeedY = function()
{
	return this.m_speedY;
}

Ball.prototype.getNumberOfCollisions = function()
{
	return this.m_collisions;
}

Ball.prototype.animate = function()
{
	this.m_x += this.m_speedX;
	this.m_y += this.m_speedY;
}

Ball.prototype.draw = function(canvas)
{
	var context = canvas.getContext("2d");


	if(this.m_explosion > 0)
	{
		if(this.m_explosion > 25)
		{
			context.fillStyle = "rgb(255,255,64)";
			context.beginPath();
			context.arc(this.m_x,this.m_y, this.m_radius + 5, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		}

		context.fillStyle = "rgb(255,128,64)";
		context.beginPath();
		context.arc(this.m_x,this.m_y, this.m_radius + 5, 0, Math.PI*2, true);
		context.closePath();
		context.fill();

		this.m_explosion--;
	}

	context.fillStyle = "rgb(28,29,150)";
	context.beginPath();
	context.arc(this.m_x,this.m_y, this.m_radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
}

Ball.prototype.forceBounds = function(x1,y1,x2,y2,x3,y3,x4,y4)
{
}

Ball.prototype.checkColisions = function(object)
{
	if(!this.m_isMoving)
	{
		return;
	}


	collision=object.detectCollisionWithCircle(this.m_x,this.m_y,this.m_radius);

	if(collision.collisionDetected())
	{
		var audio = new Audio("explosion.wav");
		audio.play();


		if(this.m_collisions == 0)
		{
			this.m_velocity=Math.sqrt(this.m_speedX*this.m_speedX+this.m_speedY*this.m_speedY);
		}

		var newSpeed = collision.computeNewVector(this.m_speedX,this.m_speedY,this.m_x,this.m_y,collision.getX(),collision.getY());
		this.m_speedX = newSpeed[0];
		this.m_speedY = newSpeed[1];


		this.m_collisions++;
		this.m_explosion = 30;

		if(this.m_hasCallback)
		{
			this.callbackForScore(this.m_x,this.m_y,object);
		}


		collision=object.detectCollisionWithCircle(this.m_x+this.m_speedX,this.m_y+this.m_speedY,this.m_radius);
		var i=1;

		while(i <= 3 && collision.collisionDetected())
		{
			this.animate();
			collision = object.detectCollisionWithCircle(this.m_x+this.m_speedX,this.m_y+this.m_speedY,this.m_radius);
			
			i++;
		}

		this.resetVelocity();
	}
}


Ball.prototype.resetVelocity = function()
{
	var velocity = Math.sqrt(this.m_speedX*this.m_speedX+this.m_speedY*this.m_speedY);

	if(velocity <= 2 * this.m_velocity)
	{
		return;
	}

	this.m_speedX /= velocity;
	this.m_speedY /= velocity;

	this.m_speedX *= this.m_velocity;
	this.m_speedY *= this.m_velocity;
}

Ball.prototype.setCallbackForScore = function(callback)
{
	this.callbackForScore = callback;
	this.m_hasCallback = true;
}

Ball.prototype.detectCollisionWithCircle = function(x,y,radius)
{
	var collision = new Collision();
	collision.detectCollisionBetweenCircles(this.m_x,this.m_y,this.m_radius,x,y,radius);
	
	return collision;
}

Ball.prototype.forceGravity = function(gravity)
{
	this.m_speedY += gravity;
}

Ball.prototype.detectCollisionWithLine = function(x1,y1,x2,y2)
{
	var collision=new Collision();
	collision.detectCollisionBetweenLineAndCircle(x1,y1,x2,y2,this.m_x,this.m_y,this.m_radius);
	
	return collision;
}

