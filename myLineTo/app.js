var canvas = document.getElementById("test"),
    ctx = canvas.getContext("2d");
function testImageData(imgData, x1, y1) {
    var data = imgData.data;
    for(var i = 0; i <= data.length; i += 4) {
        data[i] = 255;
        data[i+3] = 255;
    }
    var ctx = document.getElementById("test").getContext("2d");
    ctx.putImageData(imgData, x1, y1);
}


function myLineTo(x1, y1, x2, y2, ctx) {
    var canvas = ctx.canvas,
        wd = x2 - x1,
        ht = y2 - y1,
        dataOrig = [x1, y1],
        c = 0;
    if(x2 < x1) {
        dataOrig[0] = x2;
    }
    if(y2 < y1) {
        dataOrig[1] = y2;
    }
    var imageData = ctx.getImageData(dataOrig[0], dataOrig[1], Math.abs(wd)+1, Math.abs(ht)+1),
        data = imageData.data,
        slope = 1,
        red = document.getElementById("red").value,
        green = document.getElementById("green").value,
        blue = document.getElementById("blue").value;
    
    //testImageData(imageData, dataOrig[0], dataOrig[1]);
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
            console.log("("+x+","+y+") - " + dataIndex);
            data[dataIndex] = red;
            data[dataIndex + 1] = green;
            data[dataIndex + 2] = blue;
            data[dataIndex + 3] = 255;
        }
    } else {
        for(var y = 0; y <= Math.abs(ht); y++) {
            var x = parseInt((y - c) / slope);
            var dataIndex = y * (Math.abs(wd)+1) * 4 + x * 4;
            console.log("("+x+","+y+") - " + dataIndex);
            data[dataIndex] = red;
            data[dataIndex + 1] = green;
            data[dataIndex + 2] = blue;
            data[dataIndex + 3] = 255;
        }
    }
    
    ctx.putImageData(imageData, dataOrig[0], dataOrig[1]);
}

function addCanvasEvents() {
    var canvas = document.getElementById("test"),
        isDrawingOn = false,
        ctx = canvas.getContext("2d"),
        points = [],
        backup = null,
        color, red, green, blue,
        prevX, prevY,
        lineWidth = 10;
    ctx.imageSmoothingEnabled = false;
    canvas.addEventListener("mousedown", function(e) {
        red = document.getElementById("red").value,
        green = document.getElementById("green").value,
        blue = document.getElementById("blue").value,
        color = "rgba(" + red + "," + green + "," + blue + ",1)";
        backup = ctx.getImageData(0,0,canvas.width, canvas.height);
        isDrawingOn = true;
        ctx.imageSmoothingEnabled = 0;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        //ctx.lineCap = "round";
        //ctx.beginPath();
        //ctx.moveTo(parseInt(e.clientX), parseInt(e.clientY));
        prevX = e.clientX;
        prevY = e.clientY;
    });
    canvas.addEventListener("mousemove", function(e) {
        if(isDrawingOn) {
            ctx.imageSmoothingEnabled = 0;
            myLineTo(prevX, prevY, e.clientX, e.clientY, ctx);
            
            //ctx.stroke();
            prevX = (e.clientX);
            prevY = (e.clientY);
        }
    });
    canvas.addEventListener("mouseup", function(e) {
        ctx.imageSmoothingEnabled = 0;
        isDrawingOn = false;
        ctx.closePath();
        points = [];
    });
}

function showShades() {
    var canvas = document.getElementById("test"),
        ctx = canvas.getContext("2d"),
        imgData = ctx.getImageData(0,0,canvas.width,canvas.height),
        data = imgData.data,
        colorStack = [];
    for(var i = 0; i < data.length; i += 4) {
        var color = data[i]+","+data[i+1]+","+data[i+2]+","+data[i+3];
        if(colorStack.indexOf(color) == -1) {
            colorStack.push(color);
            console.log("rgba: "+color);
        }
        data[i+3] = data[i+3] > 0 ? 255 : 0;
    }
    ctx.putImageData(imgData, 0, 0);
    document.getElementById("shades").innerHTML = JSON.stringify(colorStack);
}

addCanvasEvents();
