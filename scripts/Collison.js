class Point
    {
        //punkt
        constructor(x,y)
        {
            this.x =x;
            this.y =y;
        }
    }

    class Coin
    {
        //punkt
        constructor(x,y,pathImage)
        {
            this.x =x;
            this.y =y;
            this.Image = new Image();
            this.Image.src = pathImage;
            this.spriteCol =10;
            this.spriteRow =0;
            this.numberSprite=10;
            this.name = "coin";
        }
    }

class Collsion_CubeDown
    {       
        //kwadrat
        constructor(point1,point2)
        {
            this.point1 = point1;
            this.point2 = point2;
            this.downY = CANVAS_HEIGHT;
            this.name = "DownCube";
        }
    }
    class Collsion_CubeRelative
    {       
        //kwadrat
        constructor(point1,point2,point3,point4)
        {
            this.point1 = point1;
            this.point2 = point2;
            this.point3 = point3;
            this.point4 = point4;
            this.name = "RelativeCube";
        }
    }
    class Collsion_line
    {       
        //kwadrat
        constructor(point1,point2)
        {
            this.point1 = point1;
            this.point2 = point2;
            this.name = "Line";
        }
    }