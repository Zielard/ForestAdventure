class GameObject
{
    constructor(x,y,pathImage)
    {
        this.x = x;
        this.y = y;
        this.Image = new Image();
        this.Image.src = pathImage;
    }

    changePosition()
    {
        
    }

    checkColison()
    {
        
    }
}
class Player extends GameObject
{
    constructor(x,y,pathImage,pathImageLeft)
    {
        super(x, y,pathImage);
        this.spriteCol = 8;
        this.spriteRow = 8;
        this.numberSprite = 65;
        this.ImageLeft = new Image();
        this.ImageLeft.src = pathImageLeft;
        this.name = "player";
    }
}

class Enemy extends GameObject
{
    constructor(x,y,pathImage)
    {
        super(x,y,pathImage);
        this.name = "enemy";
    }
}