CanvasRenderingContext2D.prototype.drawStLine = function(x1, y1, x2, y2) {
    this.beginPath();
    
    this.moveTo(x1, y1);
    
    var deltaY = parseInt(y2 - y1),
        deltaX = parseInt(x2 - x1);
    if(Math.abs(deltaY) > Math.abs(deltaX)) {
        this.lineTo(parseInt(x1), parseInt(y2));
        this.stroke();
        this.lineTo(parseInt(x2), parseInt(y2));
    } else {
        this.lineTo(parseInt(x2), parseInt(y1));
        this.stroke();
        this.lineTo(parseInt(x2), parseInt(y2));
    }

    ctx.stroke();
    
}
