//File that controls movement of pac-man and allows player to play game,
//with 3 lives. Also in this file are commands for constant ghost movement.

class ghost_obj{
  constructor(image, current_col, current_row, grid, speed, serial_number){
    this.image = image;
    this.current_column = current_col;
    this.current_row = current_row;
    this.timer = setInterval(function(){console.log("hello");}, 30000);
    clearInterval(this.timer);
    this.grid = grid;
    this.speed = speed;
    this.s_no = serial_number;
    this.cell;
    this.boolean;
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
    this.repr = add_elements(this.image, "img", "ghosts");
  }
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
  starting_position(){
    this.css("left", "553.8461538px");
    this.css("top", "553.8461538px");
    this.current_column=12;
    this.current_row=12;
    this.cell = this.grid
    [this.current_row][this.current_column];
    if(this.repr.attr("src") == "scared_ghost.png"){
      this.no_longer_scared();
    }
  }
  scared(){
    this.attr("src", "scared_ghost.png");
    this.addClass("scared_ghost");
  }
  no_longer_scared(){
    this.attr("src", this.image);
    this.removeClass("scared_ghost");
  }
  collision(){
    if(this.cell == pacman_object.cell){
      if(this.hasClass("scared_ghost")){
        pacman_object.score+=50;
        $(".score_heading").text(parseInt(pacman_object.score) + " points");
        this.addClass("hidden_pellet");
        this.starting_position();
        this.no_longer_scared();
        this.removeClass("hidden_pellet");
        clearInterval(this.timer);
        continuous_movement(this);
      }
      else{
        if(this.boolean){
      clearInterval(this.timer);
      life_lost=true;
      all_ghosts_stop = true;
    }
  }
    }

  else if(all_ghosts_stop==true){
    clearInterval(this.timer);
  }

  }

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
  }



  game_over(){
    clearInterval(this.timer);
  }

};

function continuous_movement(object){
  object.starting_position();
  let to_node = Math.floor(Math.random()*168);
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
    }
  }, object.speed);
}



const number_of_columns = mezze.rows;
const number_of_rows = number_of_columns;
let pellet_id = 0;
let pellet_objects = new Array;
let cell_width = mezze.size / mezze.rows;
let level = 1;
let lives = 3;
let life_lost = false;
let game_over = false;
let level_gained = false;
let divisor = 1;
let speed = 250;
let pellets_eaten = 0;
let all_ghosts_stop = false;
// let timer1 = setInterval(console.log("hello"), 5000);
// clearInterval(timer1);
// let timer2 = setInterval(console.log("hello"), 5000);
// clearInterval(timer2);
// let timer3 = setInterval(console.log("hello"), 5000);
// clearInterval(timer3);
// let timer4 = setInterval(console.log("hello"), 5000);
// clearInterval(timer4);
// let timer5 = setInterval(console.log("hello"), 5000);
// clearInterval(timer5);
// let timer6 = setInterval(console.log("hello"), 5000);
// clearInterval(timer6);
// let timer7 = setInterval(console.log("hello"), 5000);
// clearInterval(timer7);
// let timer8 = setInterval(console.log("hello"), 5000);
// clearInterval(timer8);


const pacman_object = add_elements("pacman_image.png", "img", "pacman");

function starting_position_pac(){
pacman_object.css("left", "0px");
pacman_object.css("top", "0px");
pacman_object.current_column=0;
pacman_object.current_row=0;
pacman_object.cell = mezze.grid[pacman_object.current_row][pacman_object.current_column];
}

pacman_object.score = 0;

starting_position_pac();


let special_pellet_row = Math.floor(Math.random()*8+2);
let special_pellet_col = Math.floor(Math.random()*8+2);

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


function add_elements(src, label, class_name) {
  let next_element = document.createElement(label);
  next_element.src = src;
  $("#game").append(next_element);
  return add_new_class(label, class_name)
}

function add_new_class(label, class_name) {
  $(label).last().addClass(class_name);
  if (class_name == "pellet") {
    $(label).last().attr('id', pellet_id);
    pellet_id++;
  }
  return $(label).last();
}

function move(object, number_of_spaces, direction, sign) {
  let number_of_pixels = 46.15384615384615 * number_of_spaces;
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
  const pellet = (pacman_object.cell.rowNum)*13 + pacman_object.cell.colNum-1;
  try{
    if(parseInt($("#"+String(pellet)).position().left)==
    parseInt(this_cell.positionX) && parseInt($("#"+String(pellet)).position().top)<=
    parseInt(this_cell.positionY)+5 && $("#"+String(pellet)).hasClass("hidden_pellet")==false){
      if($("#"+String(pellet)).hasClass("special_pellet")==true){
        let num_of_ghosts=4;
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
          ghost_objects[i].attr("src", "scared_ghost.png");
          ghost_objects[i].addClass("scared_ghost");
        }
        setTimeout(function(){
          ghost_object.attr("src", "ghost_image.png");
          ghost_object.removeClass("scared_ghost");
          for(let i=1;i<num_of_ghosts;i++){
            ghost_objects[i].attr("src", "ghost_image"+String(i+1)+".png");
            ghost_objects[i].removeClass("scared_ghost");
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
let timers = setInterval(function(){
  for(let i=0; i<ghost_objects.length;i++){
    ghost_objects[i].collision();
  }
  if(life_lost){
  $(document).off("keydown");
  clearInterval(timers);
}
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
    }
    life_lost=false;
    all_ghosts_stop=false;
    for(let i=0; i<ghost_objects.length;i++){
      clearInterval(ghost_objects[i].timer);
    }
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
    }
    $(document).off("keydown");
    if(speed>150){
    for(let i=0; i<ghost_objects.length;i++){
      ghost_objects[i].speed-=10;
      speed-=10;
    }
  }
    starting_position_pac();
    starting_position_ghost();
    for(let i=0; i<ghost_objects.length;i++){
      clearInterval(ghost_objects[i].timer);
    }
    setTimeout(function(){
      for(let i=0;i<pellet_objects.length;i++){
        pellet_objects[i].removeClass("hidden_pellet");
      }
      start_game();}, 400);

  }
}, 20);
