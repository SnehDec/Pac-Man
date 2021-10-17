//File that controls movement of pac-man and allows player to play game,
//with 3 lives. Also in this file are commands for constant ghost movement.
//From level 3 onwards, the number of ghosts increases by 1 every alternate level
//to a maximum of 8 ghosts. The "additional" ghosts in each level are present in the
//last cell of the maze but are hidden.

class ghost_obj{
  constructor(image, current_col, current_row, grid, speed, serial_number){
    this.image = image;
    this.current_column = current_col;
    //the column of the ghost in the grid of the maze
    this.current_row = current_row;
    // the row of the ghost in the grid of the maze
    this.timer = setInterval(function(){console.log("hello");}, 30000);
    clearInterval(this.timer);
    this.grid = grid;
    //refers to the grid belonging to the maze in which Pac-Man and ghosts move
    this.speed = speed;
    //the timer that moves the ghost will be set to this frequency
    this.s_no = serial_number;
    //helps distinguish between ghosts so that Pac-Man won't be eaten by
    //a hidden ghost belonging to a future level.
    this.cell;
    //refers to the current cell of the ghost, derived from
    //its current_row, current_col and grid.
    this.boolean;
    //this is the boolean responsible for whether or not a ghost is active or hidden,
    //therefore it depends on the level of the game and the specific ghost
    if(this.s_no<5){
      this.boolean = true;
      //the first four ghosts are present in every level, including level 1
    }
    if(this.s_no == 5){
      this.boolean = level>=3;
      //fifth ghost appears at and beyond level 3
    }
    if(this.s_no == 6){
      this.boolean = level >=5;
      //sixth ghost appears at and beyond level 5
    }
    if(this.s_no == 7){
      this.boolean = level >=7;
      //seventh ghost appears at and beyond level 7
    }
    if(this.s_no == 8){
      this.boolean = level >= 9;
      //eighth ghost appears at and beyond level 9.
    }
    this.repr = add_elements(this.image, "img", "ghosts");
    //the ghost object defined here cannot be manipulated using JavaScript(JS)/jQuery.
    // To allow manipulation using JS/jQuery,
    //a jQuery-compatible representation (repr) of this ghost object
    //(such as its corresponding image) is created and added to the webpage.
    //The repr is not the same as the object itself. Rather, it's the "face"
    //of the object that can be manipulated visually.
  }
  //The following set of functions are overloaded jQuery functions:
  //they ensure that the function can be called directly on this ghost object
  //but will actually be performed on its repr.
  addClass(the_class){
    this.repr.addClass(the_class);
  }
  removeClass(the_class){
    this.repr.removeClass(the_class);
  }
  attr(att, name){
    this.repr.attr(att, name);
  }
  css(att, command){
    this.repr.css(att, command);
  }
  hasClass(the_class){
    return this.repr.hasClass(the_class);
  }

  scared(){
    this.attr("src", "scared_ghost.png");
    this.addClass("scared_ghost");
  }
  //this function changes the object's image to a scared ghost upon Pac-Man's
  //consumption of a special pellet.
  no_longer_scared(){
    this.attr("src", this.image);
    this.removeClass("scared_ghost");
  }
  //This function allows a scared ghost to switch back to a normal ghost
  starting_position(){
    this.css("left", "553.8461538px");
    this.css("top", "553.8461538px");
    //moves the object's repr to the last cell of the maze,
    //where every ghost starts at the beginning of each level.
    this.current_column=12;
    this.current_row=12;
    this.cell = this.grid
    [this.current_row][this.current_column];
    //updates the object's position to match with that of its repr.
    if(this.repr.attr("src") == "scared_ghost.png"){
      this.no_longer_scared();
    }
    //this conditional statement makes sure that if a ghost is in a scared state
    //when it's forced to go back to the last cell of the maze (either Pac-Man
  //gets eaten by another ghost or Pac-Man ascends to the next level)
  }

  collision(){
    if(this.cell == pacman_object.cell){
      //to test if Pac-Man runs into the ghost and gets eaten

      if(this.hasClass("hidden_pellet")){
        //if Pac-Man makes contact with a ghost that's just been eaten after
        //consumption of a special pellet, nothing will happen
        }

      else if(this.hasClass("scared_ghost")){
        //if Pac-Man makes contact with a scared ghost after consumption of
        //a special pellet, Pac-Man gains points and the ghost disappears
        //by having the hidden_pellet class added to it
        pacman_object.score+=50;
        $(".score_heading").text(parseInt(pacman_object.score) + " points");
        this.addClass("hidden_pellet");
        clearInterval(this.timer);
        //VERY IMPORTANT: the object's timer is cleared as another function that sets up
        // the timer for it again will be called and the two timer
        //functions must not interfere with each other, otherwise
        //ghost movement will end up unpredictable and erratic
        collision_return = 1;
        //this global variable's value is used later to confirm whether Pac-Man
        //ate a ghost or got eaten by a ghost (this depends on whether ghost has class scared_ghost)
      }


      else{
        if(this.boolean){
      clearInterval(this.timer);
      life_lost=true;
      all_ghosts_stop = true;
      //this.boolean adds an extra layer of protection to make sure that
      // this code only executes if Pac-man bumps into
      //an active ghost for a particular level. life_lost is a global variable that relates to
      //the number of lives Pac-Man has left. all_ghosts_stop is a global variable
      //that causes all other ghosts' timers to be cleared and hence makes all of them stop.
    }
  }
    }

  else if(all_ghosts_stop==true){
    clearInterval(this.timer);
  }
//if Pac-Man does not bump into this particular ghost, all_ghosts_stop being set
//to true by Pac-Man bumping into another ghost makes this ghost stop as well.

  }

//The set_boolean function is necessary to update this.boolean for each level
//although the boolean is set without this function for level 1 alone.
  set_boolean(){
    if(this.s_no<5){
      this.boolean = true;
    }
    if(this.s_no == 5){
      this.boolean = level>=3;
    }
    if(this.s_no == 6){
      this.boolean = level >=5;
    }
    if(this.s_no == 7){
      this.boolean = level >=7;
    }
    if(this.s_no == 8){
      this.boolean = level >= 9;
    }
  }

  restart(){
    all_ghosts_stop=false;
    continuous_movement(this);
    //After a ghost has bumped into Pac-Man and a life has been lost,
    //the game resets (as long as the number of lives is greater than 0)
    //Starting_position simply moves the ghosts back to the last cell of the Maze
    //while restart allows the ghosts to move through the maze again
  }


};

//this function was placed outside the ghost class as there were timer reference issues
//when this was an in-class function.
function continuous_movement(object){
  //uses BFS algorithm in BFS.js to make ghost "chase" Pac-Man
  object.starting_position();
  let to_node = Math.floor(Math.random()*168);
  //to_node can never be 168 as the path from a cell to itself is not defined and
  //the ghosts all start at cell 168
  let node = convert_cell_to_node(object.cell);
  let path = shortest_path(node, to_node);
  let i = 0;
  object.timer = setInterval(function(){
    move(object, path[i][0], path[i][1], path[i][2]);
    i++;
    if(i>=parseInt(path.length/divisor)){

      node = convert_cell_to_node(object.cell);

      to_node = convert_cell_to_node(pacman_object.cell);

      path = shortest_path(node, to_node);
      i=0;
      //keeps generating a new path when it reaches the end of a path
    }
  }, object.speed);
}



//Global Variables used and modified by functions in this program
const number_of_columns = mezze.rows;
const number_of_rows = number_of_columns;
let pellet_id = 0;
//pellet_id used to target pellets and make them disappear on contact with Pac-Man
let pellet_objects = new Array;
let level = 1;
let lives = 3;
let life_lost = false;
let level_gained = false;
let divisor = 1;
let speed = 250;
let pellets_eaten = 0;
let all_ghosts_stop = false;
let collision_return = 0;


//The following two functions are fundamental to setting up the webpage
function add_new_class(label, class_name) {
  $(label).last().addClass(class_name);
  if (class_name == "pellet") {
    $(label).last().attr('id', pellet_id);
    pellet_id++;
    //automatically assigns a unique pellet_id from 0 to 168 to each pellet
  }
  return $(label).last();
}


function add_elements(src, label, class_name) {
  let next_element = document.createElement(label);
  next_element.src = src;
  $("#game").append(next_element);
  return add_new_class(label, class_name)
  //adds an element (repr in the case of ghost object) to the webpage and uses
  //the helper function add_new_class to identify and add the desired class to
  //the element
}


const pacman_object = add_elements("pacman_image.png", "img", "pacman");

function starting_position_pac(){
pacman_object.css("left", "0px");
pacman_object.css("top", "0px");
//the above two commands control image positioning for pac-man
pacman_object.current_column=0;
pacman_object.current_row=0;
pacman_object.cell = mezze.grid[pacman_object.current_row][pacman_object.current_column];
//the above 3 commands control pacman_object's cell position which is used by the
//ghosts to track pac-man
}

pacman_object.score = 0;

starting_position_pac();


let special_pellet_row = Math.floor(Math.random()*8+2);
let special_pellet_col = Math.floor(Math.random()*8+2);
//random column and row selected for one or two special pellets in the game

for (let j = 0; j < number_of_rows; j++) {
  for (let i = 0; i < number_of_columns; i++) {
    let pellet_object;
    if((i==special_pellet_col && j==special_pellet_row)
    || (i==special_pellet_row && j==special_pellet_col)){
      pellet_object = add_elements("special_pellet.png", "img", "pellet");
      pellet_object.addClass("special_pellet");
    }
    else{
    pellet_object = add_elements("pellet_image.png", "img", "pellet");
  }
    pellet_objects.push(pellet_object);
  }
}

//At the beginning of the game, Pac-Man takes up one cell in the maze and the
//ghosts take up another, hence the pellets in those two cells are removed:
$("#" + String(number_of_rows * number_of_columns - 1)).remove();
$("#" + String(number_of_rows * number_of_columns - 2)).remove();

const ghost_objects =[];

const ghost_object = new ghost_obj("ghost_image3.png", 12, 12, mezze.grid, speed, 1);
ghost_objects.push(ghost_object);

const ghost_object2 = new ghost_obj("ghost_image2.png", 12, 12,  mezze.grid, speed, 2);
ghost_objects.push(ghost_object2);

const ghost_object3 = new ghost_obj("ghost_image.png", 12, 12, mezze.grid, speed, 3);
ghost_objects.push(ghost_object3);

const ghost_object4 = new ghost_obj("ghost_image4.png", 12, 12, mezze.grid, speed,  4);
ghost_objects.push(ghost_object4);

const ghost_object5 = new ghost_obj("ghost_image5.png", 12, 12, mezze.grid, speed, 5);
ghost_object5.addClass("hidden_pellet");
ghost_objects.push(ghost_object5);

const ghost_object6 = new ghost_obj("ghost_image6.png", 12, 12, mezze.grid, speed, 6);
ghost_object6.addClass("hidden_pellet");
ghost_objects.push(ghost_object6);

const ghost_object7 = new ghost_obj("ghost_image7.png", 12, 12, mezze.grid, speed, 7);
ghost_object7.addClass("hidden_pellet");
ghost_objects.push(ghost_object7);

const ghost_object8 = new ghost_obj("ghost_image8.png", 12, 12, mezze.grid, speed, 8);
ghost_object8.addClass("hidden_pellet");
ghost_objects.push(ghost_object8);

function starting_position_ghost()
{
  for(let i=0;i<ghost_objects.length;i++){
  ghost_objects[i].starting_position();
}
}

starting_position_ghost();
//sets all ghosts to their starting position in the last cell of the maze
//upon loading of page.


function move(object, number_of_spaces, direction, sign) {
  let number_of_pixels = 46.15384615384615 * number_of_spaces;
  //the line above specifies the exact width of a cell in pixels
  if (direction == "x") {
    if(sign==1){
      if(object.cell.walls.rightWall){
      }
      else{
        object.css("left", "+="+number_of_pixels);
        object.current_column+=number_of_spaces;
        object.cell =
        mezze.grid[object.current_row][object.current_column];
      }
    }
    else if(sign==-1){
      if(object.cell.walls.leftWall){
      }
      else{
        object.css("left", "-="+number_of_pixels);
        object.current_column-=number_of_spaces;
        object.cell =
        mezze.grid[object.current_row][object.current_column];
      }
    }
}
else if (direction=="y"){
  if(sign==1){
    if(object.cell.walls.bottomWall){
    }
    else{
      object.css("top", "+="+number_of_pixels);
      object.current_row+=number_of_spaces;
      object.cell =
      mezze.grid[object.current_row][object.current_column];
    }
  }
  else if(sign==-1){
    if(object.cell.walls.topWall){
    }
    else{
      object.css("top", "-="+number_of_pixels);
      object.current_row-=number_of_spaces;
      object.cell =
      mezze.grid[object.current_row][object.current_column];
    }
  }
}
}

function rotate_pacman(sign, direction){
  if(direction=="x"){
    if(sign==-1){
      pacman_object.css("transform", "rotate(180deg)");
    }
    else{
      pacman_object.css("transform", "rotate(0deg)");
    }
  }
  else{
    if(sign==-1){
      pacman_object.css("transform", "rotate(-90deg)");
    }
    else{
      pacman_object.css("transform", "rotate(90deg)");
    }
  }
}

function eat_pellet(){
  const this_cell = pacman_object.cell;
  //the line below finds the ID of a specific pellet from its cell. As Pac-Man is on
  //pellet's cell and has a well-defined cell attribute,
  //Pac-Man's cell is used in the calculation
  const pellet = (pacman_object.cell.rowNum)*13 + pacman_object.cell.colNum-1;
  //the following code is wrapped in a try-catch block because otherwise issues arise when
  //pacman enters a cell without a pellet: the first or last cells.
  try{
    //the following conditional uses the rounded-down values of all numbers, otherwise
    //this doesn't work due to minor differences in the float values. The conditional
    //checks for the horizontal positions of pac-man and the pellet being equal,
    //but the vertical positions have a slight discrepancy, hence the +5 there.
    //The final check is to make sure the pellet isn't already hidden, ie., has
    //not already been consumed by Pac-Man. This is to prevent giving extra points
    //to Pac-Man for revisiting cells.
    if(parseInt($("#"+String(pellet)).position().left)==
    parseInt(this_cell.positionX) && parseInt($("#"+String(pellet)).position().top)<=
    parseInt(this_cell.positionY)+5 && $("#"+String(pellet)).hasClass("hidden_pellet")==false){
      //if Pac-Man eats a special pellet, the following code will identify how many
      //active ghosts are present in the game and will add the scared_ghost class to all of them
      //for a set period of time by using setTimeout.
      if($("#"+String(pellet)).hasClass("special_pellet")==true){
        let num_of_ghosts=4;
        //num_of_ghosts make sure that the inactive ghosts in each level do not
        //get revealed.
        if(5>level && level>=3){
          num_of_ghosts= 5;
        }
        else if(7>level && level>=5){
          num_of_ghosts=6;
        }
        else if(9>level && level>=7){
          num_of_ghosts=7;
        }
        else if(level>=9){
          num_of_ghosts=8;
        }
        for(let i=0;i<num_of_ghosts;i++){
          ghost_objects[i].scared();
        }
        setTimeout(function(){
          for(let i=0;i<num_of_ghosts;i++){
            ghost_objects[i].no_longer_scared();
          }
        },8000);
      }
      else{
          pacman_object.score+=10;
      }
      $("#"+String(pellet)).addClass("hidden_pellet");
      $(".score_heading").text(parseInt(pacman_object.score) + " points");
      pellets_eaten +=1;
  }
}
catch(TypeError){

}
}


//The function below is called each time the game is restarted, ie., when Pac-Man gets eaten
//or goes to the next level

function start_game (){

starting_position_pac();

$(".lives_heading").text("Lives : "+lives);
$(".level_heading").text("Level "+level);

  $(document).on("keydown", function(evt){
    switch (evt.keyCode){
      case 38: move(pacman_object, 1, 'y', -1);
              rotate_pacman(-1, 'y');
      break;
      case 40: move(pacman_object, 1, 'y', 1);
               rotate_pacman(1, 'y');
      break;
      case 39: move(pacman_object, 1, 'x', 1);
               rotate_pacman(1, 'x');
      break;
      case 37: move(pacman_object, 1, 'x', -1);
               rotate_pacman(-1, 'x');
      break;
    }
    eat_pellet();
  } )

for(let i=0; i<4;i++){
  setTimeout(function(){ghost_objects[i].restart();}, 400*i);
}

if(level>=3){
  ghost_object5.removeClass("hidden_pellet");
  setTimeout(function(){ghost_object5.restart();}, 1500);
}

if(level>=5){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){ghost_object6.restart();}, 1800);
}

if(level>=7){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){ghost_object7.restart();}, 2100);
}

if(level>=9){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){ghost_object8.restart();}, 2300);
}
$(".start").off("click");
//the line above makes sure that start_game() does not keep getting called in case
//the user presses the start game button more than once

//The following timers run in the background and keep checking for conditions that would lead
//to the game getting paused and the level + score + life count of pac-man changing
//These are the timers that also execute the required functions to make these changes

let timers = setInterval(function(){
  for(let i=0; i<ghost_objects.length;i++){
    ghost_objects[i].collision();
    //keeps calling collision function to check for collisions between ghost and pac-man
    if(collision_return==1){
      //this handles the case in which Pac-Man ate a scared ghost, in which case game does not reset
      collision_return=0;
      setTimeout(function(){
      ghost_objects[i].starting_position();
      ghost_objects[i].removeClass("hidden_pellet");
      continuous_movement(ghost_objects[i]);
    }, 450);
    }
  }
  if(life_lost){
  $(document).off("keydown");
  clearInterval(timers);
  //The life_lost and level_gained changes are handled by another timer as problems
  //with clearing the ghosts' timers arose this timer was used for both tasks.
  //So this timer serves as a checking timer by calling collision repeatedly while
  //the timer below (check) serves as the timer that takes action and resets the
  //game based on inputs from this timer
}
//There are 167 pellets and 169 cells in the maze.
if(pellets_eaten/167==level){
  level_gained=true;
  clearInterval(timers);
}
}, 10);
}

$(".start").on("click", start_game);

let check = setInterval(function(){
  if(life_lost){
    lives-=1;
    if(lives==0){
      for(let i=0; i<ghost_objects.length;i++){
        $(".lives_heading").text("Lives : "+lives);
        clearInterval(ghost_objects[i].timer);
      }
      clearInterval(check);
      return;
      //the return statement prevents the rest of code from executing when check is cleared
    }
    life_lost=false;
    all_ghosts_stop=false;
    for(let i=0; i<ghost_objects.length;i++){
      clearInterval(ghost_objects[i].timer);
    }
    //the code above MAKES SURE that all timers are cleared as that was sometimes
    //a problem in previous versions of this code
    setTimeout(start_game, 400);
    setTimeout(function(){
      starting_position_pac();
      starting_position_ghost();}, 150);
  }

  if(level_gained){
    level+=1;
    level_gained=false;
    all_ghosts_stop=false;
    for(let i=0;i<ghost_objects.length;i++){
      ghost_objects[i].set_boolean();
      //set_boolean is required to enable the new active ghosts on each level to
      // actually eat Pac-Man
    }
    $(document).off("keydown");
    if(speed>150){
    for(let i=0; i<ghost_objects.length;i++){
      ghost_objects[i].speed-=10;
      speed-=10;
      //speed of ghosts slowly increases each level, but not beyond a timer frequency
      //of 150. This is because it does not look good if the ghosts go faster than that
    }
  }
    starting_position_pac();
    starting_position_ghost();
    for(let i=0; i<ghost_objects.length;i++){
      clearInterval(ghost_objects[i].timer);
    }
    //clear interval to MAKE SURE all timers are switched off
    setTimeout(function(){
      for(let i=0;i<pellet_objects.length;i++){
        pellet_objects[i].removeClass("hidden_pellet");
        //repopulates the maze with pellets for the next level
      }
      start_game();}, 400);

  }
}, 20);
