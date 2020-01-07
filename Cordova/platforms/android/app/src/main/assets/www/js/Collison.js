class Point
    {
        //punkt
        constructor(x,y)
        {
            this.x =x;
            this.y =y;
        }
    }
class Collsion_CubeDown
    {       
        //kwadrat
        constructor(point1,point2,flag)
        {
            this.deadColision = flag;
            this.point1 = point1;
            this.point2 = point2;
            this.downY = window.innerHeight;
            this.name = "DownCube";
        }
    }
class Collsion_CubeRelative
    {       
        //kwadrat
        constructor(point1,point2,point3,point4)
        {
            this.deadColision = false;
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
        constructor(point1,point2,flag)
        {
            this.deadColision = flag;
            this.point1 = point1;
            this.point2 = point2;
            this.name = "Line";
        }
    }

function checkCoinColision()
{
                //Get coin
                for (let i = 1; i < ObjectsGame.length; i++)
                {
                        if((ObjectsGame[0].centreX < ObjectsGame[i].centreX + 20) &&
                        (ObjectsGame[0].centreX > ObjectsGame[i].centreX - 20) && 
                        (ObjectsGame[0].centreY < ObjectsGame[i].centreY + 20) &&
                        (ObjectsGame[0].centreY > ObjectsGame[i].centreY - 20) &&
                         (ObjectsGame[i].animationIsDisplayed == true) 
                         && (ObjectsGame[i].Gameobject.name == "coin"))
                        {
                            score++;
                            ObjectsGame[i].stopAndHide();
                        }
                }
                //Graviti for Coin
            for(let j = 0; j < ObjectsGame.length; j++)
            {
                for (let i = 0; i < colisionFigure.length; i++)
                {
                    if((ObjectsGame[j].centreX >= colisionFigure[i].point1.x)
                     && (ObjectsGame[j].centreX <= colisionFigure[i].point2.x)&& 
                       ( ( ObjectsGame[j].Gameobject.name == "coin") || ( ObjectsGame[j].Gameobject.name == "portal")))
                    {
                        //Gravitation
                        if((ObjectsGame[j].centreY+15 < colisionFigure[i].point1.y))
                        {
                            //console.log("colison! Gravity Coin");
                            if(( ObjectsGame[j].Gameobject.name == "coin"))
                            {
                                ObjectsGame[j].Gameobject.Coingravity = true;
                            }
                            else if(( ObjectsGame[j].Gameobject.name == "portal"))
                            {
                                if(score != 8)
                                {
                                    break;
                                }
                                ObjectsGame[j].Gameobject.Portalgravity = true;
                            }

                            ObjectsGame[j].centreY+=2;
                        }
                        else
                        {
                            ObjectsGame[j].Gameobject.deltaTime = 0;
                            break;
                        }
                    }
                }
            }
                //Get coin
                for (let i = 1; i < ObjectsGame.length; i++)
                {
                        if((ObjectsGame[0].centreX < ObjectsGame[i].centreX + 20) &&
                        (ObjectsGame[0].centreX > ObjectsGame[i].centreX - 20) && 
                        (ObjectsGame[0].centreY < ObjectsGame[i].centreY + 20) &&
                        (ObjectsGame[0].centreY > ObjectsGame[i].centreY - 20) &&
                         (ObjectsGame[i].animationIsDisplayed == true) 
                         && (ObjectsGame[i].Gameobject.name == "portal"))
                        {
                            console.log(this.activeLevel);
                            console.log(this.boardsLevel.length);
                            console.log((this.activeLevel > this.boardsLevel.length));
                            flagFinishGame = (this.activeLevel+1 == this.boardsLevel.length);
                            if(!flagFinishGame)
                            {
                            activeLevel++;
                            ObjectsGame[i].stopAndHide();
                            dropcolison();
                            reset();
                            createColison(boardsLevel[activeLevel]);
                                if(connectClient == true)
                                {
                                    connection.send(JSON.stringify(new Information((8*activeLevel),"Stats")));
                                }
                            }
                            else
                            {
                                console.log("Finish");
                            }
                        }
                }

                //DEAD CUBE COLLISION
                for (let i = 1; i < colisionFigure.length; i++)
                {
                    if((ObjectsGame[0].centreX >= colisionFigure[i].point1.x) && (ObjectsGame[0].centreX <= colisionFigure[i].point2.x)
                    && (ObjectsGame[0].centreY+20 > colisionFigure[i].point1.y)
                    && ( colisionFigure[i].name == "DownCube") && ( colisionFigure[i].deadColision == true))
                        {
                            ObjectsGame[0].isdead = true;
                            ObjectsGame[0].stopAndHide();
                        }
                }
}

function checkColisionForEnemy()
{

            //GENERAL COLLISION "DownCube" ENEMY
            let flagBreak = false;
            for(let j = 0; j < ObjectsGame.length; j++)
            {
                for (let i = 0; i < colisionFigure.length; i++)
                {
                    if((ObjectsGame[j].centreX >= colisionFigure[i].point1.x) && (ObjectsGame[j].centreX <= colisionFigure[i].point2.x)
                    && (ObjectsGame[j].centreY >= colisionFigure[i].point1.y) && (ObjectsGame[j].centreY <= colisionFigure[i].downY) 
                    && ( colisionFigure[i].name == "DownCube") && 
                        ( ObjectsGame[j].Gameobject.name == "enemy"))
                    {
                                if((ObjectsGame[j].direction == 1) && (ObjectsGame[j].Gameobject.name == "enemy"))
                                {
                                    //console.log("colison! enemy change to right");
                                    ObjectsGame[j].centreX += 5;
                                    ObjectsGame[j].setDirection(2);
                                    flagBreak = true;
                                    break;
                                }
                                else if((ObjectsGame[j].direction == 2) && (ObjectsGame[j].Gameobject.name == "enemy"))
                                {
                                    //console.log("colison! enemy change to left");
                                    ObjectsGame[j].centreX -= 5;
                                    ObjectsGame[j].setDirection(1);
                                    flagBreak = true;
                                    break;
                                }
                    }
                    else if(!(ObjectsGame[j].centreX >= 0 && ObjectsGame[j].centreX <= window.innerWidth))
                                {
                                    if (ObjectsGame[j].direction === 1)
                                    {
                                        ObjectsGame[j].centreX = window.innerWidth;
                                        break;
                                    }
                                    else if (ObjectsGame[j].direction === 2)
                                    {
                                    ObjectsGame[j].centreX = 0;
                                        break;
                                    }
                                }
                    else if((ObjectsGame[j].centreX >= colisionFigure[i].point1.x)
                     && (ObjectsGame[j].centreX <= colisionFigure[i].point2.x)&& 
                        ( ObjectsGame[j].Gameobject.name == "enemy"))
                    {
                        //Gravitation
                        if((ObjectsGame[j].centreY+10 < colisionFigure[i].point1.y))
                        {
                            ObjectsGame[j].Gameobject.Enemygravity = true;
                            ObjectsGame[j].centreY+=2;
                        }
                        else
                        {
                            ObjectsGame[j].Gameobject.deltaTime = 0;
                        }
                    }
                }
                if(flagBreak == true)
                {
                    break;
                }
            }

                            //ENEMY COLLISION
                            for (let i = 1; i < ObjectsGame.length; i++)
                {
                        if((ObjectsGame[0].centreX < ObjectsGame[i].centreX + 20) &&
                        (ObjectsGame[0].centreX > ObjectsGame[i].centreX - 20) && 
                        (ObjectsGame[0].centreY < ObjectsGame[i].centreY + 20) &&
                        (ObjectsGame[0].centreY > ObjectsGame[i].centreY - 20) &&
                         (ObjectsGame[i].animationIsDisplayed == true) 
                         && (ObjectsGame[i].Gameobject.name == "enemy"))
                        {
                            ObjectsGame[0].isdead = true;
                            ObjectsGame[0].stopAndHide();
                        }
                }

                for(let j = 0; j < ObjectsGame.length; j++)
                {
                    for (let i = 0; i <  ObjectsGame.length; i++)
                    {
                            if((ObjectsGame[j].centreX < ObjectsGame[i].centreX + 20) &&
                            (ObjectsGame[j].centreX > ObjectsGame[i].centreX - 20) && 
                            (ObjectsGame[j].centreY < ObjectsGame[i].centreY + 20) &&
                            (ObjectsGame[j].centreY > ObjectsGame[i].centreY - 20) &&
                            (ObjectsGame[j].animationIsDisplayed == true) 
                            && (ObjectsGame[i].Gameobject.name == "enemy") && (ObjectsGame[i].animationIsDisplayed == true)
                            && (ObjectsGame[j].Gameobject.name == "FireBall"))
                            {
                                //animationIsDisplayed
                                ObjectsGame[i].stopAndHide();
                                ObjectsGame[j].stopAndHide();
                            }
                    }
                }
                
}

function checkGravitiColison()
{
    //let flagBreak = false;
                //GENERAL COLLISION
                let stepSize = 5;
                for (let i = 0; i < colisionFigure.length; i++)
                {
                    if((ObjectsGame[0].centreX >= colisionFigure[i].point1.x)&& ( colisionFigure[i].name == "DownCube") && (ObjectsGame[0].centreX <= colisionFigure[i].point2.x)
                    && (ObjectsGame[0].centreY >= colisionFigure[i].point1.y) && (ObjectsGame[0].centreY <= colisionFigure[i].downY) 
                     && (
                        ( ObjectsGame[0].Gameobject.name == "player")))
                    {
                        console.log("colison! downcube");
                        //console.log(ObjectsGame[0].direction);

                            if (ObjectsGame[0].direction === ObjectsGame[0].UP)
                            {
                                console.log("Up direction");
                                ObjectsGame[0].centreY += stepSize*3;
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].LEFT)
                            {
                                //console.log("2");
                                //ObjectsGame[0].centreX += stepSize*3;
                                console.log("Left direction");
                                ObjectsGame[0].stayPosition("left");
                                //flagBreak = true;
                                break;
                            }
                            else if (ObjectsGame[0].direction === ObjectsGame[0].DOWN)
                            {
                                //console.log("3");
                                console.log("Down direction");
                                ObjectsGame[j].centreY -= stepSize;
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].RIGHT)
                            {
                                console.log("Right direction");
                                //console.log("4");
                               //ObjectsGame[0].centreX -= stepSize*3;
                                ObjectsGame[0].stayPosition("right");
                                //flagBreak = true;
                                break;
                            }
                            else if (ObjectsGame[0].direction === 0)
                            {
                                if(lastPushButton === ObjectsGame[0].LEFT)
                                {
                                   ObjectsGame[0].centreX += stepSize;
                                    break;
                                }
                                else if(lastPushButton === ObjectsGame[0].RIGHT)
                                {
                                    ObjectsGame[0].centreX -= stepSize;
                                    break;
                                }
                            }
                    }
                    else  if((ObjectsGame[0].centreX >= colisionFigure[i].point1.x)&& ( colisionFigure[i].name == "RelativeCube") && (ObjectsGame[0].centreX <= colisionFigure[i].point2.x)
                    && (ObjectsGame[0].centreY >= colisionFigure[i].point1.y) && (ObjectsGame[0].centreY <= colisionFigure[i].point4.y) 
                    && (
                        ( ObjectsGame[j].Gameobject.name == "player")))
                    {
                        let stepSize = 5;
                        console.log("colison! Relative");
                            if (ObjectsGame[0].direction === ObjectsGame[0].UP)
                            {
                                ObjectsGame[0].centreY += stepSize*3;
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].LEFT)
                            {
                                break;
                            }
                            else if (ObjectsGame[0].direction === ObjectsGame[0].DOWN)
                            {
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].RIGHT)
                            {
                                break;
                            }
                            else if (ObjectsGame[0].direction === 0)
                            {
                                ObjectsGame[0].centreY = colisionFigure[i].point1.y -15;
                                break;
                            }
                    }
                    else  if((ObjectsGame[0].centreX >= colisionFigure[i].point1.x) &&
                     ( colisionFigure[i].name == "line") && 
                     (ObjectsGame[0].centreX <= colisionFigure[i].point2.x) &&
                    (ObjectsGame[0].centreY <= colisionFigure[i].point1.y) &&
                    (( ObjectsGame[j].Gameobject.name == "player")))
                    {
                        let stepSize = 5;
                        console.log("colison! line");
                            if (ObjectsGame[0].direction === ObjectsGame[0].UP)
                            {
                                ObjectsGame[0].centreY += stepSize*3;
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].LEFT)
                            {
                                break;
                            }
                            else if (ObjectsGame[0].direction === ObjectsGame[0].DOWN)
                            {
                                break;
                            } 
                            else if (ObjectsGame[0].direction === ObjectsGame[0].RIGHT)
                            {
                                break;
                            }
                            else if (ObjectsGame[0].direction === 0)
                            {
                                ObjectsGame[0].centreY = colisionFigure[i].point1.y -15;
                                break;
                            }
                    }
                    else if(!(ObjectsGame[0].centreX >= 0 && ObjectsGame[0].centreX <= window.innerWidth))
                    {
                            if (ObjectsGame[0].direction === ObjectsGame[0].LEFT)
                            {
                                //console.log("2");
                                //ObjectsGame[0].centreX += stepSize*3;
                                console.log("Left direction");
                                ObjectsGame[0].stayPosition("left");
                                ObjectsGame[0].centreX = window.innerWidth;
                                //ObjectsGame[0].centreX += stepSize*3;
                                //flagBreak = true;
                                break;
                            }
                            else if (ObjectsGame[0].direction === ObjectsGame[0].RIGHT)
                            {
                                console.log("Right direction");
                                //console.log("4");
                               //ObjectsGame[0].centreX -= stepSize*3;
                               ObjectsGame[0].centreX = 0;
                               //ObjectsGame[0].centreX -= stepSize*3;
                                ObjectsGame[0].stayPosition("right");
                                //flagBreak = true;
                                break;
                            }
                    }
                    else if((ObjectsGame[0].centreX >= colisionFigure[i].point1.x)
                     && (ObjectsGame[0].centreX <= colisionFigure[i].point2.x)
                     && (ObjectsGame[0].centreY < colisionFigure[i].point2.y))
                    {
                        
                        //Gravitation
                        if(((ObjectsGame[0].centreY+(ObjectsGame[0].size/2) < colisionFigure[i].point1.y) && offgravity == false) && 
                        ((ObjectsGame[0].centreY + falseDelta) <= colisionFigure[i].point1.y))
                        {
                            console.log("colison! Gravity");
                            gravity = true;
                            falseDelta += 0.3;
                            ObjectsGame[0].centreY+=falseDelta;
                        }
                        else
                        {
                            pushJump = false;
                            falseDelta =0;
                            gravity = false;
                        }
                        break;
                    }
                }
           
                        if(true == offgravity)
                        {
                        pushJump = true;
                        this.falseDeltaUP -= 0.3;
                        ObjectsGame[0].centreY -= falseDeltaUP;
                            if( this.falseDeltaUP < 0)
                            {
                                this.falseDeltaUP = (0.025 * window.innerHeight);
                                offgravity = false;
                            }
                        }
}

function checkCollisionForFireBall()
{
    for (let j = 0; j < ObjectsGame.length; j++)
                {
                for (let i = 0; i < colisionFigure.length; i++)
                {
                    if((ObjectsGame[j].centreX >= colisionFigure[i].point1.x) && (ObjectsGame[j].centreX <= colisionFigure[i].point2.x)
                    && (ObjectsGame[j].centreY >= colisionFigure[i].point1.y) && (ObjectsGame[j].centreY <= colisionFigure[i].downY) 
                    && ( colisionFigure[i].name == "DownCube") && (
                        ( ObjectsGame[j].Gameobject.name == "FireBall")))
                    {
                        ObjectsGame[j].stopAndHide();
                        //ObjectsGame.splice(j, 1);
                        //j--;
                    } 
                }
            }
}

function createColison(level)
{
    
    let board = level.Level;
    let col = level.Level_col;
    let row = level.Level_row;
    let lastF = 0;
    for (let i = 0; i < row; i++)
    {
        let j = 0;
        for (; lastF < (col)*i; lastF++)
        {
            let x = j*0.05*canvas.width;
                let y =i*0.1 *canvas.height;
            //relative collision
            if(board[lastF] >=12 && board[lastF] <=16 )
            {
                colisionFigure.push(new Collsion_line(new Point(x,y),new Point(x+(0.05 *canvas.width), y), false)); 
            }
            //Down collision
            else if(board[lastF] !=0 && board[lastF]!=-1)
            {
                if((lastF-col) >0)
                {
                    if(board[lastF-20] ==0 || board[lastF-20] == -1 || board[lastF-20] >= 18)
                    {
                        if(board[lastF] <= 18 || board[lastF] == 23)
                        {
                            colisionFigure.push(new Collsion_CubeDown(new Point(x,y),new Point(x+(0.05 *canvas.width), y),false)); 
                        }
                    }
                }
            }
            
            j++;
        }
    }
}

function dropcolison()
{
    colisionFigure=[];
}
