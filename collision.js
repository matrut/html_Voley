/*

	Materialy

	- http://mathworld.wolfram.com/Circle-LineIntersection.html
	- https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm

*/


Collision = function()
{
	this.m_collisionDetected = false;
	this.m_x = 0;
	this.m_y = 0;

}

Collision.prototype.collisionDetected = function()
{
	return this.m_collisionDetected;
}

Collision.prototype.getX = function()
{
	return this.m_x;
}

Collision.prototype.getY = function()
{
	return this.m_y;
}

Collision.prototype.animate = function()
{
}

Collision.prototype.detectCollisionBetweenPointAndCircle = function(x1,y1,x2,y2,radius2)
{

	var threshold = radius2*radius2;
	var observed = this.getSquareDistance(x1,y1,x2,y2);


	if(observed > threshold)
	{
		this.m_collisionDetected = false;
		return;
	}

	this.m_x = x1;
	this.m_y = y1;
	this.m_collisionDetected = true;
}


Collision.prototype.detectCollisionBetweenCircles = function(x1,y1,radius1,x2,y2,radius2)
{
	var d1 = radius1 + radius2;
	var threshold = d1 * d1;

	d2 = x2 - x1;
	d3 = y2 - y1;

	var observed = d2 * d2 + d3 * d3;


	if(observed > threshold)
	{
		this.m_collisionDetected = false;
		return;
	}


	if(observed == threshold)
	{
		this.m_collisionDetected = true;
		
		var v_x = x2 - x1;
		var v_y = y2 - y1;

		
		var vLength = Math.sqrt(v_x*v_x+v_y*v_y);
		v_x /= vLength;
		v_y /= vLength;

		
		v_x *= radius1;
		v_y *= radius1;

		this.m_x = x1 + v_x;
		this.m_y = y1 + v_y;

		return;
	}

	if(observed < threshold)
	{
		this.m_collisionDetected=true;
		
		var v_x = x2 - x1;
		var v_y = y2 - y1;


		var vLength = Math.sqrt(v_x*v_x+v_y*v_y);
		v_x /= vLength;
		v_y /= vLength;

		var radius3 = radius1/(0.0+radius1+radius2)*observed;

		v_x *= radius3;
		v_y *= radius3;
	
		this.m_x = x1 + v_x;
		this.m_y = y1 + v_y;

		return;
	}
}


Collision.prototype.detectCollisionBetweenLineAndCircle = function(x1,y1,x2,y2,x3,y3,radius3)
{
	var x1_origin = x1 - x3;
	var y1_origin = y1 - y3;
	var x2_origin = x2 - x3;
	var y2_origin = y2 - y3;

	var dx = x2_origin - x1_origin;
	var dy = y2_origin - y1_origin;

	var dr = Math.sqrt(dx*dx+dy*dy);

	var D = x1_origin * y2_origin - x2_origin * y1_origin;

	var delta=radius3*radius3*dr*dr-D*D;

	if(delta < 0)
	{
		this.m_collisionDetected = false;
		return;
	}

	var xLeftPart=D*dy;
	var yLeftPart=-D*dx;
	var drdr=dr*dr;

	if(delta==0)
	{
		this.m_x = xLeftPart / drdr;
		this.m_y = yLeftPart / drdr;

		this.m_x += x3;
		this.m_y += y3;
	
		if(this.isInvalidPointOnLine(this.m_x,this.m_y,x1,y1,x2,y2))
		{
			this.m_collisionDetected = false;
			return;
		}

		this.m_collisionDetected = true;
		return;
	}

	var sqrtDelta = Math.sqrt(delta);
	var xRightPart = dx * sqrtDelta;
	
	if(dy < 0)
	{
		xRightPart =- xRightPart;
	}

	var yRigthPart = dy;

	if(yRigthPart < 0)
	{
		yRigthPart =- yRigthPart;
	}

	yRigthPart *= sqrtDelta;

	var collision1X = (xLeftPart-xRightPart)/drdr;
	var collision1Y = (yLeftPart-yLeftPart)/drdr;
	var collision2X = (xLeftPart+xRightPart)/drdr;
	var collision2Y = (yLeftPart+yLeftPart)/drdr;

	this.m_x = (collision1X+collision2X)/2;
	this.m_y = (collision2Y+collision1Y)/2;

	this.m_x += x3;
	this.m_y += y3;

	if(this.isInvalidPointOnLine(this.m_x,this.m_y,x1,y1,x2,y2))
	{
		this.m_collisionDetected = false;
		return;
	}

	this.m_collisionDetected = true;
}


Collision.prototype.computeNewVector = function(v_x,v_y,x1,y1,x2,y2)
{
	var n_x = x1-x2;
	var n_y = y1-y2;

	var nLength = Math.sqrt(n_x*n_x+n_y*n_y);
	n_x /= nLength;
	n_y /= nLength;
	

	var vn = v_x*n_x+v_y*n_y;

	var result = new Array();
	result.push(v_x-2*vn*n_x);
	result.push(v_y-2*vn*n_y);

	return result;
}
	
Collision.prototype.getSquareDistance = function(x1,y1,x2,y2)
{
	var dx = x1-x2;
	var dy = y1-y2;

	return dx*dx+dy*dy;
}

Collision.prototype.isInvalidPointOnLine = function(x,y,x1,y1,x2,y2)
{
		
	var maxDistance = this.getSquareDistance(x1,y1,x2,y2);
	var d1 = this.getSquareDistance(x1,y1,x,y);
	
	if(d1 > maxDistance)
	{
		return true;
	}

	var d2 = this.getSquareDistance(x2,y2,x,y);
	
	if(d2 > maxDistance)
	{
		return true;
	}

	return false;
}