function addCanvasEvents() {
    var canvas = document.getElementById("test"),
        isDrawingOn = false,
        ctx = canvas.getContext("2d"),
        points = [],
        backup = null,
        color, red, green, blue,
        prevX, prevY,
        lineWidth = 10;
    /*ctx.strokeStyle = "rgba(0,255,0,255)";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(15,15);
    ctx.lineTo(40,10);
    ctx.stroke();
    ctx.closePath();*/
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
        ctx.lineWidth = 1;
        //ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(parseInt(e.clientX), parseInt(e.clientY));
        prevX = e.clientX;
        prevY = e.clientY;
    });
    canvas.addEventListener("mousemove", function(e) {
        if(isDrawingOn) {
            ctx.imageSmoothingEnabled = 0;
            var deltaY = parseInt(e.clientY - prevY),
                deltaX = parseInt(e.clientX - prevX);
            if(Math.abs(deltaY) > Math.abs(deltaX)) {
                ctx.lineTo(parseInt(prevX), parseInt(e.clientY));
                ctx.stroke();
                ctx.lineTo(parseInt(e.clientX), parseInt(e.clientY));
            } else {
                ctx.lineTo(parseInt(e.clientX), parseInt(prevY));
                ctx.stroke();
                ctx.lineTo(parseInt(e.clientX), parseInt(e.clientY));
            }
            
            ctx.stroke();
            prevX = (e.clientX);
            prevY = (e.clientY);
        }
    });
    canvas.addEventListener("mouseup", function(e) {
        ctx.imageSmoothingEnabled = 0;
        isDrawingOn = false;
        ctx.closePath();
        //drawAgain(backup, points);
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
