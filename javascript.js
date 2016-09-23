
$(document).ready(function() {
  console.log("JQuery has loaded");

  ///Variables
  var output = "";
  var world = [
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,2,3,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,2,2,1,0,2,2,2,2,2,3,2,2,2,2,2,2,0,1],
              [1,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,0,2,0,1],
              [1,0,2,0,0,0,0,0,0,0,0,0,0,0,3,1,0,1,0,1],
              [1,0,2,0,1,2,0,2,2,2,2,2,2,2,2,1,0,1,0,1],
              [1,0,2,0,1,2,0,2,2,1,1,1,1,1,1,1,0,1,0,1],
              [1,0,0,0,1,2,0,3,0,0,0,0,0,0,0,0,0,1,3,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];

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

  var pacman1 = {
    id : $("#pacman1"),
    class : "pacman",
    top : 1,
    left : 1,
    alive : true,
    score : 0,
    scoreId : $("#score1"),
  };

  var pacman2 = {
    id : $("#pacman2"),
    class : "pacman",
    top : 15,
    left : 28,
    alive : true,
    score : 0,
    scoreId : $("#score2"),
  };

  var ghost1 = {
    id : $("#ghost1"),
    class : "ghost",
    top : 10,
    left : 18,
    speed : 300,
  };

  var ghost2 = {
    id : $("#ghost2"),
    class : "ghost",
    top : 7,
    left : 16,
    speed : 300,
  };

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

  var ghostMove = {
    moveLeft : function(char){
      if(world[char.top][char.left - 1] === 1){
        moveGhost(char);
      }
      else{
        char.left -= 1;
        updateChar(char);
        moveOn(char, "moveLeft");
      }
    },
    moveRight : function(char){
      if(world[char.top][char.left + 1] === 1){
        moveGhost(char);
      }
      else{
        char.left += 1;
        updateChar(char);
        moveOn(char, "moveRight");
      }
    },
    moveUp : function(char){
      if(world[char.top - 1][char.left] === 1){
        moveGhost(char);
      }
      else{
        char.top -= 1;
        updateChar(char);
        moveOn(char, "moveUp");
      }
    },
    moveDown : function(char){
      if(world[char.top + 1][char.left] === 1){
        moveGhost(char);
      }
      else{
        char.top += 1;
        updateChar(char);
        moveOn(char, "moveDown");
      }
    },
  };

  ///// Start Game
  buildWorld(world);
  updateChar(pacman1);
  updateChar(pacman2);
  updateChar(ghost1);
  updateChar(ghost2);
  setGostSpeed();
  moveGhost(ghost1);
  moveGhost(ghost2);

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

  ///// Key- commands
  $(document).keydown(function(key){
    if(key.which === 37 && pacman1.alive){
      move.moveLeft(pacman1);
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
    if(pacman1.top === ghost1.top && pacman1.left === ghost1.left || pacman1.top === ghost2.top && pacman1.left === ghost2.left){
      pacman1.alive = false;
      removePlayer(pacman1);
    }
    if(pacman2.top === ghost1.top && pacman2.left === ghost1.left || pacman2.top === ghost2.top && pacman2.left === ghost2.left){
      pacman2.alive = false;
      removePlayer(pacman2);
    }
  }

  ///// Starts ghost moving in random direction
  function moveGhost(char){
    setTimeout(function(){
      var direction = Math.floor((Math.random() * 4) + 1);
      if(direction === 1){
        ghostMove.moveLeft(char);
      }
      else if(direction === 2){
        ghostMove.moveUp(char);
      }
      else if(direction === 3){
        ghostMove.moveRight(char);
      }
      else if(direction === 4){
        ghostMove.moveDown(char);
      }
    }, char.speed);
  }

  ///// 1/10 probability of changing ghost direction- otherwise keeps ghost moving in same direction
  function moveOn(char, move){
    var change = Math.floor((Math.random() * 10) + 1);
    if(change === 1){
      moveGhost(char);
    }
    else{
      setTimeout(function(){
        ghostMove[move](char);
      }, char.speed);
    }
  }

  ///// Delays adding "transition" property to ghosts to allow them to move to start position
  function setGostSpeed(){
    setTimeout(function(){
      $(".ghost").css("transition", "margin-left "+ 300 + "ms linear, margin-top " + 300 + "ms linear");
    },100);
  }
  //// Removes player but does not stop game unless both are dead
  function removePlayer(player){
    player.id.remove();
    player.scoreId.css("color", "red");
    if(!pacman1.alive && !pacman2.alive){
      gameOver();
    }
  }

  ///// Pretty self-explanitory- triggered when both players die or all coins are gone
  function gameOver(){
    $("#game-over").addClass('visible');
  }


});
