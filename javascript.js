
$(document).ready(function() {
  console.log("JQuery has loaded");
  var output = "";
  var world = [
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,3,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,2,2,1,0,2,2,2,2,2,3,2,2,2,2,2,2,0,1],
              [1,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,0,2,0,1],
              [1,0,2,0,0,0,0,0,0,0,0,0,0,0,3,1,0,1,0,1],
              [1,0,2,0,1,2,0,2,2,2,2,2,2,2,2,1,0,1,0,1],
              [1,0,2,0,1,2,0,2,2,1,1,1,1,1,1,1,0,1,0,1],
              [1,0,0,0,1,2,0,3,0,0,0,0,0,0,0,0,0,1,3,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];
  var score1 = 0;
  var score2 = 0;
  var coinCount = 0;
  var cherryCount = 0;
  //var ghost1Top = world[world.length-2];
  //var ghost1Left = world[ghost1Top][world[ghost1Top].length-2];

  var pacman1 = {
    id : $("#pacman1"),
    top : 1,
    left : 1,
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
    //Added move prefix to avoid confusion with .up() method
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
    //Added move prefix to avoid confusion with .down() method
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
      console.log("Winner!");
    }
    else{
      output = "";
      coinCount = 0;
      cherryCount = 0;
    }
  }
  buildWorld(world);
  updateChar(pacman1);

  $(document).keydown(function(key){
    if(key.which === 37){
      move.moveLeft(pacman1);
    }
    else if(key.which === 38){
      move.moveUp(pacman1);
    }
    else if(key.which === 39){
      move.moveRight(pacman1);
    }
    else if(key.which === 40){
      move.moveDown(pacman1);
    }
  });

  function checkBlock(char){
    console.log("checkblock");
    var block = world[char.top][char.left];
    if(block === 0){
      console.log("coin");
      score1 += 1;
    }
    else if(block === 3){
      console.log("cherry");
      score1 += 50;
    }
    world[char.top][char.left] = 2;
    buildWorld(world);
    $("#score1").html(score1);
  }

  function updateChar(char){
    char.id.css("margin-top", (char.top * 25) + "px");
    char.id.css("margin-left", (char.left * 25) + "px");
  }

  function moveGhost(){

  }

});
