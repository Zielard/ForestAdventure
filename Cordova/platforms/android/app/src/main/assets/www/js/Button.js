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