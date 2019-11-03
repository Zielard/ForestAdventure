            /* Animation */
            class Animation
            {
                constructor(animationStartDelay, frameRate)
                {
                    /* These variables are ALWAYS needed */
                    this.animationInterval = null;
                    this.frameRate = frameRate;
                    this.animationIsDisplayed = false;

                    /* Start the animation */
                    setTimeout(this.start.bind(this), animationStartDelay);
                }

                /* Public functions */
                start()
                {
                    this.animationIsDisplayed = true;
                    this.row =0;
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
               constructor(ctx, Player)
                {                  

                    //this.animationStartDelay= false;
                    super(false, 50);
                    this.jumpTimer = 0;
                    this.push = false;
                    /* These variables depend on the animation */
                    //this.person = person;
                    this.flagFirstCall = true;
                    this.centreX = Player.x;
                    this.centreY = Player.y;
                    this.Player = Player;
                    this.size = 50;
                    this.ctx = ctx;
                    this.direction = 0;
                    this.NUMBER_OF_SPRITES = Player.numberSprite; // the number of sprites in the sprite image
                    this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = Player.spriteCol; // the number of columns in the sprite image
                    this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = Player.spriteRow; // the number of rows in the sprite image	
                    this.START_ROW = 0;
                    this.START_COLUMN = 0;
                    this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
                    this.row = this.START_ROW; // current row in sprite image
                    this.column = this.START_COLUMN; // current column in sprite image
                    this.UP = 5;
                    this.LEFT = 1;
                    this.DOWN = 2;
                    this.RIGHT = 4;
                    this.flagColision = false;
                    //stay for first run
                    this.direction = 0;
                    this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                    this.endSprite = 10;
                    this.currentSprite = this.startSprite;
                    this.row = 8;
                    this.column = 0;

                    this.SPRITE_WIDTH = 45;
                    this.SPRITE_HEIGHT = 30;

                    this.doFilp = false;
                    this.falseDelta = 10;
                    this.left = false;
                }
                setDirection(newDirection)
                    {
                        this.push = true;
                        if(this.direction != newDirection)
                        {
                            this.direction = newDirection;
                            this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                            this.endSprite = this.startSprite + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                            this.currentSprite = this.startSprite;
                            if(this.direction == this.LEFT)
                            {
                                this.row = 4;
                            }
                            else
                            {
                                this.row = this.direction;
                            }
                            this.column = 0;
                        }
                      //renderCanvas();
                    };
                update()
                {
                    if(false == this.flagColision)
                    {
                            let stepSize = 5;
                            if (this.direction === 1)  // left
                            {
                                this.centreX -= stepSize;
                                lastPushButton = 1;
                                this.left = true;
                            } 
                             else if (this.direction === this.UP && gravity == false) // up
                            {
                                lastPushButton = 5;
        
                            } else if (this.direction === this.RIGHT) // right
                            {
                                //console.log("person update " + this.direction);
                                this.centreX += stepSize;
                                //ctx.translate(width, 0);
                                lastPushButton = 4;
                                //ctx.scale(-1, 1);
                                this.left = false;

                            } else if (this.direction === this.DOWN) // down
                            {
                                lastPushButton = 2;
                                this.centreY += stepSize;
                            }
                    }

                    this.column++;
                    this.currentSprite++;
    
                    if (this.currentSprite >= this.endSprite)
                    {
                        if(this.direction == this.LEFT)
                        {
                            this.row = 4;
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
                    
                    if(this.push == false)
                    {
                        //stay for first run
                        gravity = true;
                        this.direction = 0;
                        this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                        this.endSprite = 0;
                        this.currentSprite = this.startSprite;
                        this.row = 8;
                        if(true == this.left)
                        {
                            this.column = 7;
                        }
                        else
                        {
                            this.column = 0;
                        }

                    }

                    document.getElementById("positionX").innerHTML= "X "+this.centreX;
                    document.getElementById("positionY").innerHTML= "Y "+this.centreY;
                    this.push = false;
                }
                render()
                {
                    
                    this.SPRITE_WIDTH = (this.Player.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                    this.SPRITE_HEIGHT = (this.Player.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

                   if((this.direction == this.LEFT) && (this.doFilp == true))
                   {
                    this.doFilp = false;
                   }
                   else if((this.direction == this.RIGHT) && (this.doFilp == true))
                   {
                    this.doFilp = false;
                   }
                   
                   if(this.left == false)
                   {
                    ctx.drawImage(this.Player.Image,
                        this.column * this.SPRITE_WIDTH,
                         this.row * this.SPRITE_WIDTH,
                          this.SPRITE_WIDTH, 
                          this.SPRITE_HEIGHT-5,
                           this.centreX - parseInt(this.size / 2),
                            this.centreY - parseInt(this.size / 2),
                             this.size, this.size);
                   }
                   else
                   {
                    ctx.drawImage(this.Player.ImageLeft,
                        this.column * this.SPRITE_WIDTH,
                         this.row * this.SPRITE_WIDTH,
                          this.SPRITE_WIDTH, 
                          this.SPRITE_HEIGHT-5,
                           this.centreX - parseInt(this.size / 2),
                            this.centreY - parseInt(this.size / 2),
                             this.size, this.size);
                   }

                }
            }
            /******************************************************************************/
                        /* ImageAnimation Object */
                        class CoinsAnimation extends Animation
                        {
                            constructor(ctx, Coin)
                            {                  
            
                                //this.animationStartDelay= false;
                                super(false, 50);
                                this.Coin = Coin;
                                this.centreX = Coin.x;
                                this.centreY = Coin.y;
                                this.size = 20;
                                this.ctx = ctx;
                                this.direction = 0;
                                this.NUMBER_OF_SPRITES = 10; // the number of sprites in the sprite image
                                this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 10; // the number of columns in the sprite image
                                this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1; // the number of rows in the sprite image	
                                this.START_ROW = 0;
                                this.START_COLUMN = 0;
                                this.currentSprite = 0; // the current sprite to be displayed from the sprite image  
                                this.row = this.START_ROW; // current row in sprite image
                                this.column = this.START_COLUMN; // current column in sprite image
                                this.flagColision = false;
                                //stay for first run
                                this.direction = 0;
                                this.startSprite = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
                                this.endSprite = 10;
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
                                
                                this.SPRITE_WIDTH = (this.Coin.Image.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
                                this.SPRITE_HEIGHT = (this.Coin.Image.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
                                ctx.drawImage(this.Coin.Image,
                                    this.column * this.SPRITE_WIDTH, 
                                     0, 
                                     this.SPRITE_WIDTH,
                                      this.SPRITE_HEIGHT, 
                                      this.centreX,
                                      this.centreY,
                                        this.size,
                                         this.size);
                           }
                        }