
$(document).ready(function() {
  console.log("JQuery has loaded");

  /*
  Table of Contents
  1) Variables
  2) Character and Movement Objects
  3) Functions
  */

  ////////// 1)Variables--------------------------------------------------------
  var output = "";

  var world = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,1],
    [1,0,2,1,0,1,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1,0,2,2,0,2,0,1],
    [1,0,2,1,0,1,0,2,2,2,2,2,2,2,0,1,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,2,1,0,1,0,0,0,0,0,0,0,0,3,1,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,2,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,0,2,2,2,2,2,2,3,1,1,1,1,1,0,0,0,1,1,0,0,1,0,2,1,0,2,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1,0,2,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,0,2,1,0,1,2,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1,3,1,2,0,1,0,0,0,0,0,0,1],
    [1,0,2,2,2,2,2,2,2,2,2,2,2,3,1,0,2,1,0,1,2,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];

  var coinCount = 0;
  var cherryCount = 0;
  var level = 2;
  var players = 1;

////////// 2) Character and Movement Objects------------------------------------

  //Set character variables in main scope- preset to object format so they can be populated with the object costructor.
  var pacman1 = {};
  var pacman2 = {};
  var ghost1 = {};
  var ghost2 = {};
  var ghost3 = {};

  var playerArray = [];
  var ghostArray = [];

  var debug = false;

  var move = {
    moveLeft : function(char){
      char.id.removeClass();
      char.id.addClass("pacman left");
      if(world[char.top][char.left - 1] === 1){
      }
      else{
        char.left -= 1;
        updateChar(char);
        checkBlock(char);
      }
    },
    moveRight : function(char){
      char.id.removeClass();
      char.id.addClass("pacman");
      if(world[char.top][char.left + 1] === 1){
      }
      else{
        char.left += 1;
        updateChar(char);
        checkBlock(char);
      }
    },
    moveUp : function(char){
      char.id.removeClass();
      char.id.addClass("pacman up");
      if(world[char.top - 1][char.left] === 1){
      }
      else{
        char.top -= 1;
        updateChar(char);
        checkBlock(char);
      }
    },
    moveDown : function(char){
      char.id.removeClass();
      char.id.addClass("pacman down");
      if(world[char.top + 1][char.left] === 1){
      }
      else{
        char.top += 1;
        updateChar(char);
        checkBlock(char);
      }
    },
  };


  ////////// 3) Functions-------------------------------------------------------

  ///// Start Game builds world and activates players and ghosts based on selections from start-screen
  function startGame(level){
    coinCount = 0;
    cherryCount = 0;
    output = "";
    buildWorld(world);
    if(level > 2){
      ghost3 = new ghost(3, "ghost", 7, 16, (600/level));
      activate(ghost3);
      ghostArray.push(ghost3);
    }
    else{
      $("#ghost3").remove();
    }
    if(level > 1){
      ghost2 = new ghost(2, "ghost", 7, 16, (800/level));
      activate(ghost2);
      ghostArray.push(ghost2);
    }
    else{
      $("#ghost2").remove();
    }
    if(level > 0){
      ghost1 = new ghost(1, "ghost", 10, 18, (800/level));
      activate(ghost1);
      ghostArray.push(ghost1);
    }
    else{
      $("#ghost1").remove();
    }
    if(players == 2){
      pacman2 = new pacman(2, "pacman", 15, 18);
      activate(pacman2);
      playerArray.push(pacman2);
    }
    else{
      $("#pacman2").remove();
    }
    pacman1 = new pacman(1, "pacman", 1, 1);
    playerArray.push(pacman1);
    activate(pacman1);

    for (var i = 0; i < ghostArray.length; i++) {
      moveGhost(ghostArray[i]);
    }

    setGhostSpeed();
  }// End of startGame function-------------

  ///Object constructors for pacman and ghost characters--------
    function pacman(num,className,top,left){
      this.name = className + num;
      this.id = $("#" + className + num);
      this.class = className;
      this.scoreId = $("#score" + num);
      this.alive = true;
      this.score = 0;
      this.top = top;
      this.left = left;
    }

    function ghost(num,className,top,left,speed){
      this.name = className + num;
      this.id = $("#" + className + num);
      this.class = className;
      this.top = top;
      this.left = left;
      this.speed = speed;
      this.chasing = false;
      this.checkPath = function(top, left){
        console.log("checkpath method for " + top + " | " + left);
        if(world[this.top + top][this.left + left] === 1){
          console.log("checkpath is false");
          return false;
        }
        else{
          console.log("checkpath is true");
          return true;
        }
      };
      this.moveBias = 0;
      this.move = function(top, left, bias){
        console.log("ghost.move " + top + " | " + left);
        if(world[this.top + top][this.left + left] !== 1){
          this.top += top;
          this.left += left;
          this.moveBias = bias;
        }
        else{
          this.moveBias = 0;
        }
      };
    }

  function activate(char){
    console.log("activating " + char.class);
    updateChar(char);
    if(char.class === "ghost"){
        //shuffleDirection(char);
    }
  }

  ///// Create/ Update world
  function buildWorld(array){
    for (var i = 0; i < array.length; i++) {
      output += "<div class='row'>";
      for (var k = 0; k < array[i].length; k++){
        if(array[i][k] === 0){
            output += "<div class='block coin'></div>";
            coinCount += 1;
        }
        else if(array[i][k] === 1){
            output += "<div class='block brick'></div>";
        }
        else if(array[i][k] === 2){
            output += "<div class='block empty'></div>";
        }
        else if(array[i][k] === 3){
            output += "<div class='block cherry'></div>";
            cherryCount += 1;
        }
      }
      output += "</div>";
    }
    $("#world").html(output);
    if(coinCount === 0){
      output = "";
      gameOver();
    }
    else{
      output = "";
      coinCount = 0;
      cherryCount = 0;
    }
  }
  $("#new-game").click(function(){
    $("#start-screen").removeClass();
    $("#start-screen").addClass("top-screen visible");
  });

  $("#start-game").click(function(){
    level = $("input[name='difficulty']:checked").val();
    players = $("input[name='players']:checked").val();
    console.log(players);
    console.log(level);
    $("#start-screen").removeClass();
    $("#start-screen").addClass("top-screen hidden");
    startGame(level);
  });

  ///// Key- commands for moving pacman 1 and 2 and for triggering debug mode
  $(document).keydown(function(key){
    /*
    if(key.which === 37 && pacman1.alive){
      move.moveLeft(pacman1);
    }
    */
    if(key.which == 37){

     $(".pacman").css('transform', 'rotate(180deg)');
    }
    else if(key.which === 38 && pacman1.alive){
      move.moveUp(pacman1);
    }
    else if(key.which === 39 && pacman1.alive){
      move.moveRight(pacman1);
    }
    else if(key.which === 40 && pacman1.alive){
      move.moveDown(pacman1);
    }
    else if(key.which === 65 && pacman2.alive){
      move.moveLeft(pacman2);
    }
    else if(key.which === 87 && pacman2.alive){
      move.moveUp(pacman2);
    }
    else if(key.which === 68 && pacman2.alive){
      move.moveRight(pacman2);
    }
    else if(key.which === 83 && pacman2.alive){
      move.moveDown(pacman2);
    }
    //Hit the T key to start the debugger on the ghost chasing function
    else if(key.which === 84){
      console.log("debug");
      debug = !debug;
    }
    //Check all ghosts to see if they have eaten a player
    for (var i = 0; i < ghostArray.length; i++) {
      checkGhost(ghostArray[i]);
    }
  });

  ///// Remove coins or cherries and update score
  function checkBlock(char){
    var block = world[char.top][char.left];
    if(block === 0){
      char.score += 1;
    }
    else if(block === 3){
      char.score += 50;
    }
    world[char.top][char.left] = 2;
    buildWorld(world);
    char.scoreId.html(char.score);
  }

  ///// Update character position and check if ghosts kill pacman
  function updateChar(char){
    char.id.css("margin-top", (char.top * 25) + "px");
    char.id.css("margin-left", (char.left * 25) + "px");
  }

  ///// Moves ghost randomly or chases player- location of ghost AI
  function moveGhost(ghost){
    //FindPath function is called later in moveGhost function if direct path to player cannot be found
    var findPath = function(y, x){
      console.log("findPath for " + y + " | " + x);
      var posPath = 1;
      var negPath = -1;
      var course = -1;
      if(x === 0){
        var i = 0;
        console.log("checking for path on y axis");
        while (i < 10) {
          if(ghost.checkPath(y, posPath)){
            console.log("found path at " + posPath);
            top = 0;
            left = 1;
            break;
          }
          else if(ghost.checkPath(y, negPath)){
            console.log("found path at " + negPath);
            top = 0;
            left = -1;
            break;
          }
          posPath ++;
          negPath --;
        }
      }
      else{
        var i = 0;
        console.log("checking for path on x axis");
        while (i < 10) {
          if(ghost.checkPath(posPath, x)){
            console.log("found path at " + posPath);
            top = 1;
            left = 0;
            break;
          }
          else if(ghost.checkPath(negPath, x)){
            console.log("found path at " + negPath);
            top = -1;
            left = 0;
            break;
          }
          posPath ++;
          negPath --;
        }
      }
    };//-----End of findPath
    var top;
    var left;
    var bias;
    var rand2 = Math.floor((Math.random() * 10) + 1);
    var chaseArray = [];
    //Setting chaseArray = checkGhosts(ghost); runs the checkGhosts function to find if ghost gets player or if player is close enough to chase
    chaseArray = checkGhosts(ghost);
    //
    //checkGhosts function will return an array with "true" as first value if player is in range
    if(chaseArray[0]){
      //optional debugger- turned on and off with "T" key
      if(debug){
        debugger;
      }
      console.log(chaseArray);
      var yDist = chaseArray[1];
      var xDist = chaseArray[2];
      if (Math.abs(yDist) > Math.abs(xDist)){
        if(yDist > 0){
          if(ghost.checkPath(1,0)){
            top = 1;
            left = 0;
          }
          else{
            findPath(1,0);
          }
        }
        else{
          if(ghost.checkPath(-1,0)){
            top = -1;
            left = 0;
          }
          else{
            findPath(-1,0);
          }
        }
      }
      else{
        if(xDist > 0){
          if(ghost.checkPath(0,1)){
            top = 0;
            left = 1;
          }
          else{
            findPath(0,1);
          }
        }
        else{
          if(ghost.checkPath(0,-1)){
            top = 0;
            left = -1;
          }
          else{
            findPath(0,-1);
          }
        }
      }
      ghost.move(top, left);
      updateChar(ghost);
      setTimeout(function(){
        moveGhost(ghost);
      }, ghost.speed);
    }//----- End of chase Movement
    else{
      var rand1;
      console.log("rand2 = " + rand2);
      //If the direction the ghost tried to move in last time did not hit a wall...
      if(ghost.moveBias){
        //Move in that direction again unless rand2 = 10 (1/10 probability)
        if(rand2 === 10){
          console.log("changing");
          //If rand2 is equal to 10 set a new random direction for the ghost to move.
          rand1 = Math.floor((Math.random() * 4) + 1);
        }
        else{
          rand1 = ghost.moveBias;
        }
      }
      else{
        rand1 = Math.floor((Math.random() * 4) + 1);
      }
      console.log(rand1);
      //Sets movement for ghost
      if(rand1 === 1){
        top = 1;
        left = 0;
        bias = 1;
      }
      else if(rand1 === 2){
        top = -1;
        left = 0;
        bias = 2;
      }
      else if(rand1 === 3){
        top = 0;
        left = -1;
        bias = 3;
      }
      else if(rand1 === 4){
        top = 0;
        left = 1;
        bias = 4;
      }
      else{
        console.log("invalid random");
      }
      //Moves ghost and waits for a period of time equal to the ghost's speed before looping to top of moveGhost function.
      ghost.move(top, left, bias);
      updateChar(ghost);
      setTimeout(function(){
        moveGhost(ghost);
      }, ghost.speed);
    }//--End of regular movement
  }

  ///// Delays adding "transition" property to ghosts to allow them to move to start position
  function setGhostSpeed(){
    setTimeout(function(){
      for (var i = 0; i < ghostArray.length; i++) {
        ghostArray[i].id.css("transition", "margin-left "+ ghostArray[i].speed + "ms linear, margin-top " + ghostArray[i].speed + "ms linear");
      }
    },100);
  }

  //Checks all ghosts and players to see if ghost gets player or if player is close enough to trigger chase
  //If player is close- returns an array with "true" as the first value and the distance between ghost and player on x and y coordinates
  function checkGhosts(char){
    var chaseArray = [false, 0, 0];
    for (var i = 0; i < playerArray.length; i++) {
      var yDist = playerArray[i].top - char.top;
      var xDist = playerArray[i].left - char.left;
      if(yDist === 0 && xDist === 0){
        removePlayer(playerArray[i]);
      }
      else if (Math.abs(yDist) < 8 && Math.abs(xDist) < 8){
        console.log("proximity " + char.name + " | " + playerArray[i].name);
        chaseArray = [true, yDist, xDist];
        return chaseArray;
      }
    }
    return chaseArray;
  }

  //// Removes player but does not stop game unless both are dead
  function removePlayer(player){
    player.id.remove();
    player.scoreId.css("color", "red");
    player.alive = false;
    if(!pacman1.alive && !pacman2.alive){
      gameOver();
    }
  }

  ///// Pretty self-explanitory- triggered when both players die or all coins are gone
  function gameOver(){
    $("#game-over").addClass('visible');
  }
});
