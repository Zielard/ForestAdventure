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

class Sprite 
{
    constructor(pathImage,size,spriteCol,spriteRow,numberSprite,spriteStart,spriteEnd)
    {
        this.size = size;
        this.spriteStart = spriteStart;
        this.spriteEnd = spriteEnd;
        this.spriteRow = spriteRow;
        this.spriteCol = spriteCol;
        this.numberSprite = numberSprite;
        this.pathImage = pathImage;
    }
}

class FireBall
{
    //punkt
    constructor(x,y,Sprite)
    {
        this.x =x;
        this.y =y;
        this.Image = new Image();
        this.Image.src = Sprite.pathImage;
        this.sprite = Sprite;
        this.name = "FireBall";
    }
}

class Coin
{
    //punkt
    constructor(x,y,Sprite)
    {
        this.x =x;
        this.y =y;
        this.Image = new Image();
        this.Image.src = Sprite.pathImage;
        this.sprite = Sprite;
        this.name = "coin";
        this.deltaTime = 0;
        this.Coingravity = true;
        this.Coinoffgravity = false;
    }
}

class Portal
{
    //punkt
    constructor(x,y,Sprite)
    {
        this.x =x;
        this.y =y;
        this.Image = new Image();
        this.Image.src = Sprite.pathImage;
        this.sprite = Sprite;
        this.name = "portal";
        this.deltaTime = 0;
        this.Portalgravity = true;
        this.Portaloffgravity = false;
    }
}

class Player extends GameObject
{
    constructor(x,y,Sprite)
    {
        super(x,y,Sprite.pathImage);
        this.sprite = Sprite;
        this.name = "player";
        //this.sprite = Sprite;
    }
}

class Enemy extends GameObject
{
    constructor(x,y,Sprite)
    {
        super(x,y,Sprite.pathImage);
        this.sprite = Sprite;
        this.name = "enemy";
    }
}

class DisplaySet 
{
    constructor(BG,TilesPath,ObjectPath)
    {
    this.BGPath = new Image();
    this.BGPath.src = BG;
    this.TilesPath = TilesPath;
    this.ObjectPath = ObjectPath;
    }
}