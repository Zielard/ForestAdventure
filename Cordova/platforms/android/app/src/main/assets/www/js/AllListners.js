canvas.addEventListener('touchstart', function(e) {
    // Cache the client X/Y coordinates
  
  
    if (e.targetTouches.length == 1 )
    {
    console.log("multitouh false");
    activeMouseClickx = e.touches[0].clientX;
    activeMouseClicky = e.touches[0].clientY;
    multitouch =false;
  
              if (ObjectsGame[14].pointIsInsideBoundingRectangle(activeMouseClickx, activeMouseClicky))
              {
                  console.log("Button 1");
              }
              else if (ObjectsGame[15].pointIsInsideBoundingRectangle(activeMouseClickx, activeMouseClicky))
              {
                  console.log("Button 2");
              }
    }
    else
    {
    activeMouseClickx = e.touches[0].clientX;
    activeMouseClicky = e.touches[0].clientY;
    activeEventClickx = e.touches[1].clientX;
    activeEventClicky = e.touches[1].clientY;
  //   alert("move x : " + activeMouseClickx+ "\n" +
  //   "move y : " + activeMouseClicky+ "\n" +
  //   "Event y : " + activeEventClickx+ "\n" +
  //   "Event y : " + activeEventClicky+ "\n" +"END");
    multitouch = true;
    console.log("move x : " + activeMouseClickx);
    console.log("move y : " + activeMouseClicky);
    console.log("event x : " + activeEventClickx);
    console.log("event y : " + activeEventClicky);
    console.log("multitouch : " + multitouch);
    }
  }, false);
  
  canvas.addEventListener('touchend', function(e) {
    var deltaX, deltaY;
  
    if (multitouch == false)
    {
      activeMouseClickx = e.changedTouches[0].clientX - activeMouseClicky;
    activeMouseClicky = e.changedTouches[0].clientY - activeMouseClicky;
    multitouch =false;
    }
    else
    {
  
    activeMouseClickx = e.changedTouches[0].clientX - activeMouseClickx;
    activeMouseClicky = e.changedTouches[0].clientY - activeMouseClicky;
  
    activeEventClickx = e.changedTouches[1].clientX - activeEventClickx;
    activeEventClicky = e.changedTouches[1].clientY - activeEventClicky;
  
    alert("move x : " + activeMouseClickx+ "\n" +
    "move y : " + activeMouseClicky+ "\n" +
    "Event y : " + activeEventClickx+ "\n" +
    "Event y : " + activeEventClicky+ "\n" +"END");
    multitouch = true;
    }
    //document.getElementById("positionMX").innerHTML= "Mouse X "+activeMouseClickx;
      //document.getElementById("positionMY").innerHTML= "Mouse Y "+activeMouseClicky;
  
  
    // Process the data ... 
  }, false);
  
  window.addEventListener("deviceorientation", deviceMotionUpdate, true);

  document.addEventListener('keydown', keydownHandler);