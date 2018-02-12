Background = function(x,y) 
{
	this.m_x = x;
	this.m_y = y;
}

Background.prototype.draw = function(canvas)
{
	var context = canvas.getContext("2d");

	context.fillStyle = "#99ccff";
	
	var canvasHeight = canvas.height;
	var canvasWidth  = canvas.width;

	context.fillRect(0,0,canvasWidth,canvasHeight)
}

Background.prototype.animate = function()
{
	return;
}
