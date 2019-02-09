CanvasRenderingContext2D.prototype.drawLine = function(x1, y1, x2, y2) {
    var wd = x2 - x1,
        ht = y2 - y1,
        dataOrig = [x1, y1],
        c = 0;
    if(x2 < x1) {
        dataOrig[0] = x2;
    }
    if(y2 < y1) {
        dataOrig[1] = y2;
    }
    
    function getRGBA(color) {
        var r = 0,
            g = 0,
            b = 0,
            a = 0;
        if(color.indexOf("#") > -1) {
            r = color.slice(1,3);
            g = color.slice(3,5);
            b = color.slice(5,7);
            a = 255;
            return [r,g,b,a];
        } else if(color.indexOf("rgba") > -1) {
            return color.slice(5,-1).split[","];
        } else if(color.indexOf("rgb") > -1) {
            var rgb = color.slice(5,-1).split[","];
            return [rgb[0], rgb[1], rgb[2], 255];
        }
    }
    
    var imageData = this.getImageData(dataOrig[0], dataOrig[1], Math.abs(wd)+1, Math.abs(ht)+1),
        data = imageData.data,
        slope = 1,
        rgba = getRGBA(this.strokeStyle);

    if(wd == 0 && ht == 0) {
        slope = y1/x1;
    } else if(wd == 0) {
        slope = Infinity;
    } else if(ht == 0) {
        slope = 0;
    } else {
        slope = ht/wd;
    }
    
    if(slope < 0) {
        c = Math.abs(ht);
    }
    
    if(Math.abs(wd) > Math.abs(ht)) {
        for(var x = 0; x <= Math.abs(wd); x++) {
            var y = parseInt(slope * x) + c;
            var dataIndex = y * (Math.abs(wd)+1) * 4 + x * 4;
            data[dataIndex] = rgba[0];
            data[dataIndex + 1] = rgba[1];
            data[dataIndex + 2] = rgba[2];
            data[dataIndex + 3] = rgba[3];
        }
    } else {
        for(var y = 0; y <= Math.abs(ht); y++) {
            var x = parseInt((y - c) / slope);
            var dataIndex = y * (Math.abs(wd)+1) * 4 + x * 4;
            data[dataIndex] = rgba[0];
            data[dataIndex + 1] = rgba[1];
            data[dataIndex + 2] = rgba[2];
            data[dataIndex + 3] = rgba[3];
        }
    }
    
    ctx.putImageData(imageData, dataOrig[0], dataOrig[1]);
}
