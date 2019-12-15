            /* Animation */
            class Animation
            {
                constructor(animationStartDelay, frameRate , startRow)
                {
                    /* These variables are ALWAYS needed */
                    this.animationInterval = null;
                    this.frameRate = frameRate;
                    this.animationIsDisplayed = false;
                    this.row = startRow;
                    /* Start the animation */
                    setTimeout(this.start.bind(this), animationStartDelay);
                }

                /* Public functions */
                start()
                {
                    this.animationIsDisplayed = true;
                    this.column =0;
                    this.currentSprite =0;
                    this.animationInterval = setInterval(this.update.bind(this), this.frameRate);
                }

                stop()
                {
                    this.animationIsDisplayed = true;
                    clearInterval(this.animationInterval);
                    this.animationInterval = null; // set to null when not running           
                }

                stopAndHide()
                {
                    this.stop();
                    this.animationIsDisplayed = false;

                }

                renderObject()
                {
                    if (this.animationIsDisplayed)
                    {
                        this.render();
                    }
                }

                /* update() and render() will be different for each animation */
                update()
                {
                }

                render()
                {
                }
            }

            /* ImageAnimation Object */
            class PlayerAnimation extends Animation
            {
               //constructor(ctx, centreX, centreY, width, height, skeletonframeRate, canvasWidth, canvasHeight, person)
               constructor(ctx, Gameobject,size)
                {                  
                    super(false, 50,2);
                    this.Gameobject = Gameobject;
                    this.centreX = Gameobject.x;
                    this.centreY = Gameobject.y;
                    this.size = Gameobject.sprite.size;
                    this.ctx = ctx;
                    this.NUMBER_OF_SPRITES = Gameobject.sprite.numberSprite; // the number of sprites in the sprite image
                    this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = Gameobject.sprite.spriteCol; // the number of columns in the sprite image
                    this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = Gameobject.sprite.spriteRow; // the number of rows in the sprite image	
                    this.currentSprite = 2; // the current sprite to be displayed from the sprite image  
                    this.row = this.START_ROW; // current row in sprite image
                    this.column = this.START_COLUMN; // current column in sprite image
                    this.flagColision = false;
                    this.UP = 2;
                    this.LEFT = 5;
                    this.DOWN = 3;
                    this.RIGHT = 7;
                    //stay for first run
                    this.direction = 1;
                    this.startSprite = Gameobject.sprite.spriteStart;
                    this.endSprite =Gameobject.sprite.endSprite;
                    this.currentSprite = this.startSprite;
                    this.row = 3;
                    this.column = 3;
                    this.doFlip = false;
                    this.isdead = false;
                    this.left = false;
                }
                setDirection(newDirection)
                    {
                        this.push = true;
                        if(this.direction != newDirection && this.isdead == false)
                        {
                            this.direction = newDirection;
                            this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                            this.endSprite = this.startSprite + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                            this.currentSprite = this.startSprite;
                            if(this.direction == this.LEFT)
                            {
                                this.row = 5;
                            }
                            else
                            {
                                this.row = 7;
                            }
                            this.column = 0;
                        }
                      //renderCanvas();
                    };
                stayPosition(directionInStr)
                    {
                        if(directionInStr=="left")
                        {
                            this.leftMove = false;
                            this.rightMove = true;
                        }
                        else if(directionInStr=="right")
                        {
                            this.rightMove = false;
                            this.leftMove = true;
                        }
                         //stay for first run
                         gravity = true;
                         this.direction = 0;
                         this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                         this.endSprite = 0;
                         this.currentSprite = this.startSprite;
                         
                         if(true == this.left)
                         {
                             this.column = 1;
                             this.row = 1;
                         }
                         else
                         {
                             this.column = 1;
                             this.row = 3;
                         }
                    };
                update()
                {
                    if(this.isdead == false)
                    {
                        if(false == this.flagColision)
                        {
                                let stepSize = 0.005 * window.innerWidth;
                                if ((this.direction === 5) && (this.leftMove == true))  // left
                                {
                                    this.centreX -= stepSize;
                                    lastPushButton = 5;
                                    this.left = true;
                                    this.rightMove = true;
                                } 
                                else if (this.direction === this.UP && gravity == false) // up
                                {
                                    lastPushButton = 2;
            
                                }
                                else if ((this.direction === this.RIGHT) && (this.rightMove == true)) // right
                                {
                                    this.centreX += stepSize;
                                    lastPushButton = 7;
                                    this.left = false;
                                    this.leftMove = true;
                                } 
                                else if (this.direction === this.DOWN && (this.left == false)) // down
                                {
                                    this.column = 0;
                                    lastPushButton = 2;
                                }
                                else if (this.direction === this.DOWN && (this.left == true)) // down
                                {
                                    this.row = 2;
                                    this.column = 8;
                                    lastPushButton = 2;
                                }
                        }
    
                        if((this.rightMove && this.leftMove) == true)
                        {
                            this.column++;
                            this.currentSprite++;
                            
                            if (this.currentSprite >= this.endSprite)
                            {
                                if(this.direction == this.LEFT)
                                {
                                    this.row = 5;
                                }
                                else
                                {
                                    this.row = this.direction;
                                }
                                this.column = 0;
                                this.currentSprite = this.startSprite;
                                
                            } else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                            {
                                this.column = 0;
                                this.row++;
                            }
                        }
                        else
                        {
                            this.rightMove = true;
                             this.leftMove = true;
                        }
                        
                        if(this.push == false)
                        {
                            //stay for first run
                            gravity = true;
                            this.direction = 0;
                            this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                            this.endSprite = 0;
                            this.currentSprite = this.startSprite;

                            if(true == this.left)
                            {
                                this.column = 0;
                                this.row = 1;
                            }
                            else
                            {
                                this.column = 0;
                                this.row = 3;
                            }
    
                        }
    
                        //document.getElementById("positionX").innerHTML= "X "+this.centreX;
                        //document.getElementById("positionY").innerHTML= "Y "+this.centreY;
                        this.push = false;
                    }
                }
                render()
                {
                    this.SPRITE_WIDTH = (this.Gameobject.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                    this.SPRITE_HEIGHT = (this.Gameobject.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                   if((this.direction == this.LEFT) && (this.doFilp == true))
                   {
                    this.doFilp = false;
                   }
                   else if((this.direction == this.RIGHT) && (this.doFilp == true))
                   {
                    this.doFilp = false;
                   }
                   ctx.drawImage(this.Gameobject.Image,
                    this.column * this.SPRITE_WIDTH, 
                    this.row* this.SPRITE_HEIGHT,
                     this.SPRITE_WIDTH,
                      this.SPRITE_HEIGHT, 
                      this.centreX - parseInt(this.size / 2),
                      this.centreY - parseInt(this.size / 2),
                        this.size,
                         this.size);

                }
            }
            class EnemyAnimation extends Animation
            {
                constructor(ctx, Gameobject)
                {                  

                    //this.animationStartDelay= false;
                    super(false, 50,2);
                    this.Flagswitch_ = Gameobject.Flagswitch;
                    this.Gameobject = Gameobject;
                    this.centreX = Gameobject.x;
                    this.centreY = Gameobject.y;
                    this.size = Gameobject.sprite.size;
                    this.ctx = ctx;
                    this.direction = 1;
                    this.NUMBER_OF_SPRITES = Gameobject.sprite.numberSprite; // the number of sprites in the sprite image
                    this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = Gameobject.sprite.spriteCol; // the number of columns in the sprite image
                    this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = Gameobject.sprite.spriteRow; // the number of rows in the sprite image	
                    this.currentSprite = 2; // the current sprite to be displayed from the sprite image  
                    this.row = this.START_ROW; // current row in sprite image
                    this.column = this.START_COLUMN; // current column in sprite image
                    this.flagColision = false;
                    //stay for first run
                    this.direction = 1;
                    this.startSprite = Gameobject.sprite.spriteStart;
                    this.endSprite =Gameobject.sprite.endSprite;
                    this.currentSprite = this.startSprite;
                    this.row = 2;
                    this.column = 3;
                    this.doFlip = false;
                    this.SPRITE_WIDTH = 45;
                    this.SPRITE_HEIGHT = 30;
                    this.setDirection(2);
                }
                setDirection(newDirection)
                {
                    this.push = true;
                    if(this.Flagswitch_  == true)
                    {
                        if(this.direction != newDirection)
                        {
                            //console.log("1");
                            this.direction = newDirection;
                            this.startSprite = 4;
                            this.endSprite = 8;
                            this.currentSprite = this.startSprite;
                            this.column = 3;
                            this.row = this.direction;
                        }
                    }
                    else
                    {
                        if(this.direction != newDirection)
                        {
                            //console.log("2");
                            this.direction = newDirection;
                            this.startSprite = 0;
                            this.endSprite = 3;
                            this.currentSprite = this.startSprite;
                            this.column = 0;
                            this.row = this.direction;
                        }
                    }

                  //renderCanvas();
                };
                update()
                {
                    //console.log(" this.direction " + this.direction);
                    //console.log(" this.currentSprite " +this.currentSprite);
                    //console.log(" this.endSprite " +this.endSprite);
                    //console.log(" this.startSprite " +this.startSprite);

                    let stepSize = 5;
                    if (this.direction === 1)  // left
                    {
                            this.centreX -= stepSize;
                    } 
                    else if (this.direction === 2) // right
                    {
                            this.centreX += stepSize;
                    } 

                    this.column++;
                    this.currentSprite++;
    
                    if (this.currentSprite >= this.endSprite)
                    {
                        if(this.Flagswitch_ == true)
                        {   
                        this.column = 3;
                        this.currentSprite = this.startSprite;
                        }
                        else
                        {
                            this.column = 0;
                            this.currentSprite = this.startSprite;
                        }
                        //this.endSprite = 0;

                    } else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                    {
                        this.column = 0;
                        //this.row++;
                    }
                    
                }
                render()
                {
                    
                    this.SPRITE_WIDTH = (this.Gameobject.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                    this.SPRITE_HEIGHT = (this.Gameobject.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                    ctx.drawImage(this.Gameobject.Image,
                        this.column * this.SPRITE_WIDTH, 
                        this.row* this.SPRITE_HEIGHT,
                         this.SPRITE_WIDTH,
                          this.SPRITE_HEIGHT, 
                          this.centreX - parseInt(this.size / 2),
                          this.centreY - parseInt(this.size / 2),
                            this.size,
                             this.size);
               }
            }
            /******************************************************************************/
                        /* ImageAnimation Object */
                        class CoinsAnimation extends Animation
                        {
                            constructor(ctx, Gameobject)
                            {                  
                                super(false, 50,0);
                                this.Gameobject = Gameobject;
                                this.centreX = Gameobject.x;
                                this.centreY = Gameobject.y;
                                this.size =this.Gameobject.sprite.size;
                                this.ctx = ctx;
                                this.direction = 0;
                                this.NUMBER_OF_SPRITES = this.Gameobject.sprite.numberSprite; // the number of sprites in the sprite image
                                this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteCol; // the number of columns in the sprite image
                                this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteRow; // the number of rows in the sprite image	
                                this.START_ROW = 0;
                                this.START_COLUMN = 0;
                                this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
                                this.row = this.START_ROW; // current row in sprite image
                                this.column = this.START_COLUMN; // current column in sprite image
                                this.flagColision = false;
                                //stay for first run
                                this.direction = 0;
                                this.startSprite = this.Gameobject.sprite.startSprite;
                                this.endSprite = this.Gameobject.sprite.endSprite;
                                this.currentSprite = this.startSprite;
                                this.row = 0;
                                this.column = 0;
            
                                this.SPRITE_WIDTH = 45;
                                this.SPRITE_HEIGHT = 30;
                                
                            }
                            update()
                            {
            
                                this.column++;
                                this.currentSprite++;
                
                                if (this.currentSprite >= this.endSprite)
                                {
                                    this.row = 0;
                                    this.column = 0;
                                    this.currentSprite = this.startSprite;
                                    //this.endSprite = 0;
                                    
                                } else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                                {
                                    this.column = 0;
                                    //this.row++;
                                }
                                
                            }
                            render()
                            {
                                
                                this.SPRITE_WIDTH = (this.Gameobject.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                                this.SPRITE_HEIGHT = (this.Gameobject.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                                ctx.drawImage(this.Gameobject.Image,
                                    this.column * this.SPRITE_WIDTH, 
                                     0, 
                                     this.SPRITE_WIDTH,
                                      this.SPRITE_HEIGHT, 
                                      this.centreX - parseInt(this.size / 2),
                                      this.centreY - parseInt(this.size / 2),
                                        this.size,
                                         this.size);
                           }
                        }
            /******************************************************************************/
                        /* ImageAnimation Object */
                        class FireBallAnimation extends Animation
                        {
                            constructor(ctx, Gameobject)
                            {                  
                                super(false, 25,3);
                                this.Gameobject = Gameobject;
                                this.centreX = Gameobject.x;
                                this.centreY = Gameobject.y;
                                this.size =this.Gameobject.sprite.size;
                                this.ctx = ctx;
                                this.direction = 0;
                                this.push = false;
                                this.NUMBER_OF_SPRITES = this.Gameobject.sprite.numberSprite; // the number of sprites in the sprite image
                                this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteCol; // the number of columns in the sprite image
                                this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteRow; // the number of rows in the sprite image	
                                this.START_ROW = 0;
                                this.START_COLUMN = 0;
                                this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
                                this.row = this.START_ROW; // current row in sprite image
                                this.column = this.START_COLUMN; // current column in sprite image
                                this.flagColision = false;
                                //stay for first run
                                this.direction = 1;
                                this.startSprite = this.Gameobject.sprite.startSprite;
                                this.endSprite = this.Gameobject.sprite.endSprite;
                                this.currentSprite = this.startSprite;
                                this.row = 3;
                                this.column = 0;
            
                                this.SPRITE_WIDTH = 45;
                                this.SPRITE_HEIGHT = 30;
                                
                            }
                            setDirection(newDirection)
                            {
                                if(this.direction != newDirection)
                                {
                                    this.direction = newDirection;
                                    this.startSprite = 0;
                                    this.endSprite = 8;
                                    this.currentSprite = this.startSprite;
                                    this.column = 0;
                                    this.row = this.direction;
                                }
                              //renderCanvas();
                            };
                            update()
                            {
            
                                let stepSize = 5;
                                if (this.direction === 0)  // left
                                {
                                        this.centreX -= stepSize;
                                } 
                                else if (this.direction === 4) // right
                                {
                                        this.centreX += stepSize;
                                } 
            
                                this.column++;
                                this.currentSprite++;
                
                                if (this.currentSprite >= this.endSprite)
                                {
                                    
                                    this.column = 0;
                                    this.currentSprite = this.startSprite;
                                    //this.endSprite = 0;
            
                                } else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                                {
                                    this.column = 0;
                                    //this.row++;
                                }
                                
                            }
                            render()
                            {
                                
                                this.SPRITE_WIDTH = (this.Gameobject.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                                this.SPRITE_HEIGHT = (this.Gameobject.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                                ctx.drawImage(this.Gameobject.Image,
                                    this.column * this.SPRITE_WIDTH, 
                                    this.row* this.SPRITE_HEIGHT,
                                     this.SPRITE_WIDTH,
                                      this.SPRITE_HEIGHT, 
                                      this.centreX - parseInt(this.size / 2),
                                      this.centreY - parseInt(this.size / 2),
                                        this.size,
                                         this.size);
                           }
                        }
                        class PortalAnimation extends Animation
                        {
                            constructor(ctx, Gameobject)
                            {                  
                                super(false, 50,0);
                                this.Gameobject = Gameobject;
                                this.centreX = Gameobject.x;
                                this.centreY = Gameobject.y;
                                this.size =this.Gameobject.sprite.size;
                                this.ctx = ctx;
                                this.direction = 0;
                                this.NUMBER_OF_SPRITES = this.Gameobject.sprite.numberSprite; // the number of sprites in the sprite image
                                this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteCol; // the number of columns in the sprite image
                                this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = this.Gameobject.sprite.spriteRow; // the number of rows in the sprite image	
                                this.START_ROW = 0;
                                this.START_COLUMN = 0;
                                this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
                                this.row = this.START_ROW; // current row in sprite image
                                this.column = this.START_COLUMN; // current column in sprite image
                                this.flagColision = false;
                                //stay for first run
                                this.direction = 0;
                                this.startSprite = this.Gameobject.sprite.startSprite;
                                this.endSprite = this.Gameobject.sprite.endSprite;
                                this.currentSprite = this.startSprite;
                                this.row = 0;
                                this.column = 0;
            
                                this.SPRITE_WIDTH = 4;
                                this.SPRITE_HEIGHT = 4;
                                
                            }
                            update()
                            {
            
                                this.column++;
                                this.currentSprite++;
                
                                if (this.currentSprite >= this.endSprite)
                                {
                                    this.row = 0;
                                    this.column = 0;
                                    this.currentSprite = this.startSprite;
                                    //this.endSprite = 0;
                                    
                                } else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                                {
                                    this.column = 0;
                                    //this.row++;
                                }
                                
                            }
                            render()
                            {
                                
                                this.SPRITE_WIDTH = (this.Gameobject.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                                this.SPRITE_HEIGHT = (this.Gameobject.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                                ctx.drawImage(this.Gameobject.Image,
                                    this.column * this.SPRITE_WIDTH, 
                                    this.row * this.SPRITE_WIDTH, 
                                     this.SPRITE_WIDTH,
                                      this.SPRITE_HEIGHT, 
                                      this.centreX - parseInt(this.size / 2),
                                      this.centreY - parseInt(this.size / 2),
                                        this.size,
                                         this.size);
                           }
                        }