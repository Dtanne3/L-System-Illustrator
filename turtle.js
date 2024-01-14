

class turtle{
    currentAngle;
    x;
    y;
    length = 10;
    locationStack = [];
    ctx;

    constructor(context)
    {
        this.ctx = context;
    }
    setAngle(angle)
    {
        this.currentAngle = Number(angle);
    }
    setLocation(x, y)
    {
        this.x = Number(x);
        this.y = Number(y);
    }
    setLineLength(length)
    {
        this.length = Number(length);
    }
    forward()
    {
        
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineTo(this.x, this.y);
        this.x += Number(Math.cos(this.toRad(this.currentAngle)) * this.length);
        this.y += Number(Math.sin(this.toRad(this.currentAngle)) * this.length);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    turn(angle)
    {
        this.currentAngle = Number(this.currentAngle) + Number(angle);
    }
    save()
    {
        this.locationStack.push([this.x, this.y, this.currentAngle]);
    }
    recall()
    {
        this.x = Number(this.locationStack[this.locationStack.length - 1][0]);
        this.y = Number(this.locationStack[this.locationStack.length - 1][1]);
        this.currentAngle = Number(this.locationStack[this.locationStack.length - 1][2]);
        this.locationStack.pop();
    }
    toRad(deg)
    {
        return deg * Math.PI/180;
    }
}

export {turtle};

