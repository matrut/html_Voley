Canvas = function(canvas)
{
	this.m_canvas = canvas;
}

Canvas.prototype.setWidth = function(width)
{
	this.m_canvas.width = width;
}

Canvas.prototype.setHeight = function(height)
{
	this.m_canvas.height = height;
}


Canvas.prototype.clear = function()
{
    this.m_canvas.getContext("2d").clearRect(0,0,this.m_canvas.width,this.m_canvas.height);
}

Canvas.prototype.getHtmlCanvas = function()
{
	return this.m_canvas;
}