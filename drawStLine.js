CanvasRenderingContext2D.prototype.drawStLine = function(x1, y1, x2, y2) {
    var prevFillStyle = this.fillStyle,
        prevLineWidth = this.lineWidth;
    this.fillStyle = this.strokeStyle;
    
    var deltaY = parseInt(y2 - y1),
        deltaX = parseInt(x2 - x1);
    if(Math.abs(deltaY) > Math.abs(deltaX)) {
        this.fillRect(x1, y1, prevLineWidth, y2-y1);
        this.fillRect(x1, y2, x2-x1, prevLineWidth);
    } else {
        this.fillRect(x1, y1, x2-x1, prevLineWidth);
        this.fillRect(x2, y1, prevLineWidth, y2-y1);
    }

    this.fillStyle = prevFillStyle;
}
