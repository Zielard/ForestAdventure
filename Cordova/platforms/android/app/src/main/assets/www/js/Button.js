/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

const BUTTON_CENTRE = -1;
const TEXT_WIDTH = -2;
const TEXT_HEIGHT = -3;

class Button 
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, width, height, text, backgroundImage = null, fontSize = 40, font = "Times Roman", textColour = "White", backgroundColour = "#ccc", borderColour = "#999", borderWidth = 2)
    {

        /* These variables depend on the object */
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.backgroundImage = backgroundImage;

        this.isHovering = false;

        /* set default text values */
        this.font = font;
        this.fontSize = fontSize;
        this.textColour = textColour;
        this.backgroundColour = backgroundColour;
        this.strokeStyle = borderColour;
        this.borderWidth = borderWidth;
        
        /* set the size and postition of the button */
        if (this.width === TEXT_WIDTH)
        {
            ctx.font = this.fontSize + "px " + this.font;
            this.width = ctx.measureText(this.text).width * 1.1; // make the box slightly wider than the text
            //console.log(this.width);
        }

        if (this.height === TEXT_HEIGHT)
        {
            this.height = this.fontSize * 1.1;
        }

        if (this.x === BUTTON_CENTRE)
        {
            //this.x = (canvas.width - this.width) / 2.0;
        }
    }

    renderObject()
    {
                /* the button's image */
                if (this.backgroundImage !== null)
                {
                    ctx.drawImage(this.backgroundImage, (canvas.width - this.width) / 2.0, this.y, this.width, this.height);
                }
        
        /* the button's text */
        ctx.fillStyle = this.textColour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed elsewhere
        ctx.fillText(this.text, ((canvas.width - this.width) / 2.0) + 20, this.y + this.height * 0.75);
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {

        if ((pointX > (canvas.width - this.width) / 2.0) && (pointY > this.y))
        {
            if (pointX >(canvas.width - this.width) / 2.0)
            {
                if ((pointX - (canvas.width - this.width) / 2.0) > this.width)
                {
                    //this.isHovering = false;
                    return false; // to the right of this gameObject
                }
            }

            if ((pointY -(canvas.width - this.width) / 2.0) > this.height)
            {
                if (pointY > this.height)
                {
                    //this.isHovering = false;
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            //this.isHovering = false;
            return false;
        }
        //this.isHovering = true;
        return true; // inside this gameObject
    }
}

function vJoyFun()
{
    ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.arc(FramevjoyX, FramevjoyY, (window.innerHeight* 0.15), 0, 2 * Math.PI);
                ctx.stroke(); 
                ctx.globalAlpha = 0.5;
                ctx.drawImage(arowButton,FramevjoyX - ((window.innerHeight* 0.3)/2), FramevjoyY- ((window.innerHeight* 0.2)/2), (window.innerHeight* 0.3), (window.innerHeight* 0.2));
                ctx.globalAlpha = 1.0;
                ctx.beginPath();
                ctx.arc(vjoyX, vjoyY, (window.innerHeight* 0.05), 0, 2 * Math.PI);
                ctx.stroke();

                vjoyX = FramevjoyX;
                vjoyY = FramevjoyY;
            ctx.globalAlpha = 0.5;
    ctx.drawImage(reloadButton, window.innerWidth*0.9, window.innerHeight*0.1,window.innerHeight*0.1, window.innerHeight*0.1);
    ctx.drawImage(crossButton, window.innerWidth*0.8, window.innerHeight*0.9,window.innerHeight*0.1, window.innerHeight*0.1);
    ctx.drawImage(circleButton, window.innerWidth*0.9, window.innerHeight*0.9,window.innerHeight*0.1, window.innerHeight*0.1);
    ctx.globalAlpha = 1.0;
    line();
}

function psButton()
{
    let xjump =window.innerWidth*0.8 + window.innerHeight*0.05;
    let yjump = window.innerHeight*0.9 + window.innerHeight*0.05;

    let xfire =window.innerWidth*0.9 + window.innerHeight*0.05;
    let yfire =window.innerHeight*0.9 + window.innerHeight*0.05;

    let xreset =window.innerWidth*0.9 + window.innerHeight*0.05;
    let yreset =window.innerHeight*0.1 + window.innerHeight*0.05;

                ctx.strokeStyle = "yellow";
                ctx.beginPath();
                ctx.arc(xfire, yfire,  window.innerHeight*0.05, 0, 2 * Math.PI);
                ctx.stroke(); 

                ctx.beginPath();
                ctx.arc(xjump, yjump,  window.innerHeight*0.05, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(window.innerWidth*0.9 + window.innerHeight*0.05, window.innerHeight*0.1 + window.innerHeight*0.05,  window.innerHeight*0.05, 0, 2 * Math.PI);
                ctx.stroke();

                //jump button
                if(((activeMouseClickx >= xjump - (window.innerHeight* 0.05) && 
                activeMouseClickx <= xjump +  (window.innerHeight* 0.05)) && 
                (activeMouseClicky >= yfire - (window.innerWidth* 0.05) && 
                activeMouseClicky <= yfire + (window.innerWidth* 0.05)) && 
                (multitouch == false)) ||
                ((activeEventClickx >= xjump - (window.innerHeight* 0.05) && 
                activeEventClickx <= xjump +  (window.innerHeight* 0.05)) && 
                (activeEventClicky >= yfire - (window.innerWidth* 0.05) && 
                activeEventClicky <= yfire + (window.innerWidth* 0.05)) && 
                (multitouch == true)))
                {
                    //console.log("jump");
                    if(pushJump == false)
                    {
                        if(offgravity == false)
                        {
                        offgravity = true;
                        ObjectsGame[0].setDirection(2);
                        }
                        pushJump = true;
                    }
                }
                //fire button
                if(((activeMouseClickx >= xfire - (window.innerHeight* 0.05) &&
                 activeMouseClickx <= xfire +  (window.innerHeight* 0.05)) && 
                 (activeMouseClicky >= yjump - (window.innerWidth* 0.05) && 
                 activeMouseClicky <= yjump + (window.innerWidth* 0.05))&& 
                 (multitouch == false)) || 
                 ((activeEventClickx >= xfire - (window.innerHeight* 0.05) &&
                 activeEventClickx <= xfire +  (window.innerHeight* 0.05)) && 
                 (activeEventClicky >= yjump - (window.innerWidth* 0.05) && 
                 activeEventClicky <= yjump + (window.innerWidth* 0.05))&& 
                 (multitouch == true)))
                {
                    //console.log("fire");
                    if(pushFire == false)
                    {
                        ObjectsGame.push(new FireBallAnimation(ctx,  new FireBall(ObjectsGame[0].centreX, ObjectsGame[0].centreY,FireBallSprite)));
                        if(ObjectsGame[0].left == true)
                        {
                            ObjectsGame[ObjectsGame.length-1].setDirection(0);
                        }
                        else
                        {
                            ObjectsGame[ObjectsGame.length-1].setDirection(4);
                        }
                        pushFire = true;
                    }
                    
                }
                else
                {
                    pushFire = false;
                }
                if((activeMouseClickx >= xreset - (window.innerHeight* 0.05) && activeMouseClickx <= xreset +  (window.innerHeight* 0.05)) && (activeMouseClicky >= yreset - (window.innerWidth* 0.05) && activeMouseClicky <= yreset + (window.innerWidth* 0.05)))
                {
                    reset();
                }
}
