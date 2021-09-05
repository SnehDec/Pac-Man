//File that controls movement of pac-man and allows player to play game,
//with 3 lives. Also in this file are commands for constant ghost movement.

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
let timer5 = setInterval(console.log("hello"), 5000);
clearInterval(timer5);
let timer6 = setInterval(console.log("hello"), 5000);
clearInterval(timer6);
let timer7 = setInterval(console.log("hello"), 5000);
clearInterval(timer7);
let timer8 = setInterval(console.log("hello"), 5000);
clearInterval(timer8);


const pacman_object = add_elements("pacman_image.png", "img", "pacman");

function starting_position_pac(){
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

const ghost_object = add_elements("ghost_image3.png", "img", "ghosts");
ghost_objects.push(ghost_object);

const ghost_object2 = add_elements("ghost_image2.png", "img", "ghosts");
ghost_objects.push(ghost_object2);

const ghost_object3 = add_elements("ghost_image.png", "img", "ghosts");
ghost_objects.push(ghost_object3);

const ghost_object4 = add_elements("ghost_image4.png", "img", "ghosts");
ghost_objects.push(ghost_object4);

const ghost_object5 = add_elements("ghost_image5.png", "img", "ghosts");
ghost_object5.addClass("hidden_pellet");
ghost_objects.push(ghost_object5);

const ghost_object6 = add_elements("ghost_image6.png", "img", "ghosts");
ghost_object6.addClass("hidden_pellet");
ghost_objects.push(ghost_object6);

const ghost_object7 = add_elements("ghost_image7.png", "img", "ghosts");
ghost_object7.addClass("hidden_pellet");
ghost_objects.push(ghost_object7);

const ghost_object8 = add_elements("ghost_image8.png", "img", "ghosts");
ghost_object8.addClass("hidden_pellet");
ghost_objects.push(ghost_object8);

function starting_position_ghost()
{
  for(let i=0;i<ghost_objects.length;i++){
  ghost_objects[i].current_row = 12;
  ghost_objects[i].current_column=12;
  ghost_objects[i].cell =
  mezze.grid[ghost_objects[i].current_row][ghost_objects[i].current_column];
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
    pacman_locations.push(pacman_object.cell);
  } )

  let ghost_nodes =[];
  for(let i=0; i<8;i++){
    ghost_nodes.push(convert_cell_to_node(ghost_objects[i].cell));
  }
  let to_nodes = [];
  for(let i=0; i<8; i++){
    to_nodes.push(Math.floor(Math.random()*168));
  }

  let paths = [];
  for(let i=0; i<8;i++){
    paths.push(shortest_path(ghost_nodes[i], to_nodes[i]));
  }

  let i=0;
  let j=0;
  let k=0;
  let l=0;
  let m = 0;
  let n = 0;
  let o = 0;
  let p = 0;

let timer1 = setInterval(function(){
  move(ghost_object, paths[0][i][0], paths[0][i][1], paths[0][i][2]);
  i++;
  if(i>=parseInt(paths[0].length/divisor)){
    ghost_nodes[0] = convert_cell_to_node(ghost_object.cell);

      to_nodes[0] = convert_cell_to_node(pacman_object.cell);


    paths[0] = shortest_path(ghost_nodes[0], to_nodes[0]);
    count++;
    i=0;
  }
}, speed);

let timer2=setInterval(function(){console.log("Hello");}, 10000);
clearInterval(timer2);

setTimeout(function(){
  timer2 =  setInterval(function(){
    move(ghost_object2, paths[1][j][0], paths[1][j][1], paths[1][j][2]);
    j++;
    if(j>=paths[1].length){
      ghost_nodes[1] = convert_cell_to_node(ghost_object2.cell);
      to_nodes[1] = convert_cell_to_node(pacman_object.cell);

      paths[1] = shortest_path(ghost_nodes[1], to_nodes[1]);
      count++;
      j=0;
    }
  }, speed);
}, 500);

let timer3 = setInterval(function(){console.log("Hello");},10000);
clearInterval(timer3);

setTimeout(function(){timer3 =  setInterval(function(){
  move(ghost_object3, paths[2][k][0], paths[2][k][1], paths[2][k][2]);
  k++;
  if(k>=parseInt(paths[2].length/divisor)){
    ghost_nodes[2] = convert_cell_to_node(ghost_object3.cell);


    to_nodes[2] = convert_cell_to_node(pacman_object.cell);


    paths[2] = shortest_path(ghost_nodes[2], to_nodes[2]);
    count++;
    k=0;
  }
}, speed);}, 800);

let timer4 = setInterval(function(){console.log("Hello");}, 10000);
clearInterval(timer4);

setTimeout(function(){timer4 =  setInterval(function(){
  move(ghost_object4, paths[3][l][0], paths[3][l][1], paths[3][l][2]);
  l++;
  if(l>=paths[3].length){
    ghost_nodes[3] = convert_cell_to_node(ghost_object4.cell);

    to_nodes[3] = convert_cell_to_node(pacman_object.cell);


    paths[3] = shortest_path(ghost_nodes[3], to_nodes[3]);
    count++;
    l=0;
  }
}, speed);}, 1100);

if(level>=3){
  ghost_object5.removeClass("hidden_pellet");
  setTimeout(function(){timer5 =  setInterval(function(){
    move(ghost_object5, paths[4][m][0], paths[4][m][1], paths[4][m][2]);
    m++;
    if(m>=paths[4].length){
      ghost_nodes[4] = convert_cell_to_node(ghost_object5.cell);

      to_nodes[4] = convert_cell_to_node(pacman_object.cell);


      paths[4] = shortest_path(ghost_nodes[4], to_nodes[4]);
      count++;
      m=0;
    }
  }, speed);}, 1400);
}

if(level>=5){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){timer6 =  setInterval(function(){
    move(ghost_object6, paths[5][n][0], paths[5][n][1], paths[5][n][2]);
    n++;
    if(n>=paths[5].length){
      ghost_nodes[5] = convert_cell_to_node(ghost_object6.cell);

      to_nodes[5] = convert_cell_to_node(pacman_object.cell);


      paths[5] = shortest_path(ghost_nodes[5], to_nodes[5]);
      count++;
      n=0;
    }
  }, speed);}, 1700);
}

if(level>=7){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){timer7 =  setInterval(function(){
    move(ghost_object7, paths[6][o][0], paths[6][o][1], paths[6][o][2]);
    o++;
    if(o>=paths[6].length){
      ghost_nodes[6] = convert_cell_to_node(ghost_object7.cell);

      to_nodes[6] = convert_cell_to_node(pacman_object.cell);


      paths[6] = shortest_path(ghost_nodes[6], to_nodes[6]);
      count++;
      o=0;
    }
  }, speed);}, 2000);
}

if(level>=9){
  ghost_object6.removeClass("hidden_pellet");
  setTimeout(function(){timer8 =  setInterval(function(){
    move(ghost_object8, paths[7][p][0], paths[7][p][1], paths[7][p][2]);
    p++;
    if(p>=paths[7].length){
      ghost_nodes[7] = convert_cell_to_node(ghost_object8.cell);

      to_nodes[7] = convert_cell_to_node(pacman_object.cell);


      paths[7] = shortest_path(ghost_nodes[7], to_nodes[7]);
      count++;
      p=0;
    }
  }, speed);}, 2200);
}


  let timers = setInterval(
    function(){
      if(ghost_object.cell == pacman_object.cell){
        if(ghost_object.hasClass("scared_ghost")){
          pacman_object.score+=50;
          ghost_object.addClass("hidden_pellet");
          ghost_object.css("left", "553.8461538px");
          ghost_object.css("top", "553.8461538px");
          ghost_object.current_column=12;
          ghost_object.current_row=12;
          ghost_object.cell = mezze.grid
          [ghost_object.current_row][ghost_object.current_column];
          ghost_object.removeClass("scared_ghost");
          ghost_object.removeClass("hidden_pellet");
          ghost_object.addClass("ghosts");
          ghost_object.attr("src", "ghost_image.png");
          i=0;
          ghost_nodes[0]=convert_cell_to_node(ghost_object.cell);
          to_nodes[0] = convert_cell_to_node(pacman_object.cell);
          paths[0] = shortest_path(ghost_nodes[0], to_nodes[0]);
        }
        else{
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        clearInterval(timer5);
        clearInterval(timer6);
        clearInterval(timer7);
        clearInterval(timer8);
        life_lost=true;
        clearInterval(timers);
    }
      }
        if(ghost_object2.cell ==pacman_object.cell){
          if(ghost_object2.hasClass("scared_ghost")){
            pacman_object.score+=50;
            ghost_object2.addClass("hidden_pellet");
            ghost_object2.css("left", "553.8461538px");
            ghost_object2.css("top", "553.8461538px");
            ghost_object2.current_column=12;
            ghost_object2.current_row=12;
            ghost_object2.cell = mezze.grid
            [ghost_object2.current_row][ghost_object2.current_column];
            ghost_object2.removeClass("scared_ghost");
            ghost_object2.removeClass("hidden_pellet");
            ghost_object2.addClass("ghosts");
            ghost_object2.attr("src", "ghost_image2.png");
            j=0;
            ghost_nodes[1]=convert_cell_to_node(ghost_object2.cell);
            to_nodes[1] = convert_cell_to_node(pacman_object.cell);
            paths[1] = shortest_path(ghost_nodes[1], to_nodes[1]);
          }
          else{
          clearInterval(timer1);
          clearInterval(timer2);
          clearInterval(timer3);
          clearInterval(timer4);
          life_lost=true;
          clearInterval(timer5);
          clearInterval(timer6);
          clearInterval(timer7);
          clearInterval(timer8);
          clearInterval(timers);
      }
        }
        if(ghost_object3.cell == pacman_object.cell){
          if(ghost_object3.hasClass("scared_ghost")){
            pacman_object.score+=50;
            ghost_object3.addClass("hidden_pellet");
            ghost_object3.css("left", "553.8461538px");
            ghost_object3.css("top", "553.8461538px");
            ghost_object3.current_column=12;
            ghost_object3.current_row=12;
            ghost_object3.cell = mezze.grid
            [ghost_object3.current_row][ghost_object3.current_column];
            ghost_object3.removeClass("scared_ghost");
            ghost_object3.removeClass("hidden_pellet");
            ghost_object3.addClass("ghosts");
            ghost_object3.attr("src", "ghost_image3.png");
            k=0;
            ghost_nodes[2]=convert_cell_to_node(ghost_object3.cell);
            to_nodes[2] = convert_cell_to_node(pacman_object.cell);
            paths[2] = shortest_path(ghost_nodes[2], to_nodes[2]);
          }
          else{
          clearInterval(timer1);
          clearInterval(timer2);
          clearInterval(timer3);
          clearInterval(timer4);
          clearInterval(timer5);
          clearInterval(timer6);
          clearInterval(timer7);
          clearInterval(timer8);
          life_lost=true;
          clearInterval(timers);
      }
        }

        if(ghost_object4.cell==pacman_object.cell){
          if(ghost_object4.hasClass("scared_ghost")){

            pacman_object.score+=50;
            ghost_object4.addClass("hidden_pellet");
            ghost_object4.css("left", "553.8461538px");
            ghost_object4.css("top", "553.8461538px");
            ghost_object4.current_column=12;
            ghost_object4.current_row=12;
            ghost_object4.cell = mezze.grid
            [ghost_object4.current_row][ghost_object4.current_column];
            ghost_object4.removeClass("scared_ghost");
            ghost_object4.removeClass("hidden_pellet");
            ghost_object4.addClass("ghosts");
            ghost_object4.attr("src", "ghost_image4.png");
            l=0;
            ghost_nodes[3]=convert_cell_to_node(ghost_object4.cell);
            to_nodes[3] = convert_cell_to_node(pacman_object.cell);
            paths[3] = shortest_path(ghost_nodes[3], to_nodes[3]);
          }

          else{
          clearInterval(timer1);
          clearInterval(timer2);
          clearInterval(timer3);
          clearInterval(timer4);
          clearInterval(timer5);
          clearInterval(timer6);
          clearInterval(timer7);
          clearInterval(timer8);
          life_lost=true;
          clearInterval(timers);
      }
        }

    if(ghost_object5.cell==pacman_object.cell){
      if(ghost_object5.hasClass("scared_ghost")){

        pacman_object.score+=50;
        ghost_object5.addClass("hidden_pellet");
        ghost_object5.css("left", "553.8461538px");
        ghost_object5.css("top", "553.8461538px");
        ghost_object5.current_column=12;
        ghost_object5.current_row=12;
        ghost_object5.cell = mezze.grid
        [ghost_object5.current_row][ghost_object5.current_column];
        ghost_object5.removeClass("scared_ghost");
        ghost_object5.removeClass("hidden_pellet");
        ghost_object5.addClass("ghosts");
        ghost_object5.attr("src", "ghost_image5.png");
        m=0;
        ghost_nodes[4]=convert_cell_to_node(ghost_object5.cell);
        to_nodes[4] = convert_cell_to_node(pacman_object.cell);
        paths[4] = shortest_path(ghost_nodes[4], to_nodes[4]);
      }

      else{
       if(5>level && level>=3){
         life_lost=true;
       clearInterval(timer1);
       clearInterval(timer2);
       clearInterval(timer3);
       clearInterval(timer4);
       clearInterval(timer5);
       clearInterval(timer6);
       clearInterval(timer7);
       clearInterval(timer8);
       clearInterval(timers);
     }
   }
     }
    if (ghost_object6.cell == pacman_object.cell){
      if(ghost_object6.hasClass("scared_ghost")){

        pacman_object.score+=50;
        ghost_object6.addClass("hidden_pellet");
        ghost_object6.css("left", "553.8461538px");
        ghost_object6.css("top", "553.8461538px");
        ghost_object6.current_column=12;
        ghost_object6.current_row=12;
        ghost_object6.cell = mezze.grid
        [ghost_object6.current_row][ghost_object6.current_column];
        ghost_object6.removeClass("scared_ghost");
        ghost_object6.removeClass("hidden_pellet");
        ghost_object6.addClass("ghosts");
        ghost_object6.attr("src", "ghost_image6.png");
        n=0;
        ghost_nodes[5]=convert_cell_to_node(ghost_object6.cell);
        to_nodes[5] = convert_cell_to_node(pacman_object.cell);
        paths[5] = shortest_path(ghost_nodes[5], to_nodes[5]);
      }

      else{
        if(7>level && level >=5){
          life_lost=true;
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        clearInterval(timer5);
        clearInterval(timer6);
        clearInterval(timer7);
        clearInterval(timer8);
        clearInterval(timers);
      }
    }
      }
    if(ghost_object7.cell == pacman_object.cell){
      if(ghost_object7.hasClass("scared_ghost")){

        pacman_object.score+=50;
        ghost_object7.addClass("hidden_pellet");
        ghost_object7.css("left", "553.8461538px");
        ghost_object7.css("top", "553.8461538px");
        ghost_object7.current_column=12;
        ghost_object7.current_row=12;
        ghost_object7.cell = mezze.grid
        [ghost_object7.current_row][ghost_object7.current_column];
        ghost_object7.removeClass("scared_ghost");
        ghost_object7.removeClass("hidden_pellet");
        ghost_object7.addClass("ghosts");
        ghost_object7.attr("src", "ghost_image7.png");
        o=0;
        ghost_nodes[6]=convert_cell_to_node(ghost_object7.cell);
        to_nodes[6] = convert_cell_to_node(pacman_object.cell);
        paths[6] = shortest_path(ghost_nodes[6], to_nodes[6]);
      }

      else{
       if(9>level && level>=7){
          life_lost=true;
         clearInterval(timer1);
         clearInterval(timer2);
         clearInterval(timer3);
         clearInterval(timer4);
         clearInterval(timer5);
         clearInterval(timer6);
         clearInterval(timer7);
         clearInterval(timer8);
       clearInterval(timers);
     }
   }
     }
    if(ghost_object8.cell == pacman_object.cell) {
      if(ghost_object8.hasClass("scared_ghost")){
        pacman_object.score+=50;
        ghost_object8.addClass("hidden_pellet");
        ghost_object8.css("left", "553.8461538px");
        ghost_object8.css("top", "553.8461538px");
        ghost_object8.current_column=12;
        ghost_object8.current_row=12;
        ghost_object8.cell = mezze.grid
        [ghost_object8.current_row][ghost_object8.current_column];
        ghost_object8.removeClass("scared_ghost");
        ghost_object8.removeClass("hidden_pellet");
        ghost_object8.addClass("ghosts");
        ghost_object8.attr("src", "ghost_image8.png");
        p=0;
        ghost_nodes[7]=convert_cell_to_node(ghost_object8.cell);
        to_nodes[7] = convert_cell_to_node(pacman_object.cell);
        paths[7] = shortest_path(ghost_nodes[7], to_nodes[7]);
      }

      else{
       if(level>=9){
         life_lost = true;
         clearInterval(timer1);
         clearInterval(timer2);
         clearInterval(timer3);
         clearInterval(timer4);
         clearInterval(timer5);
         clearInterval(timer6);
         clearInterval(timer7);
         clearInterval(timer8);
       clearInterval(timers);
     }
   }
     }
     if(life_lost==true){
           $(document).off("keydown");
           lives-=1;
           if(lives==0){
             game_over=true;
         }
       }

  if(pellets_eaten == 167*level){
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(timer4);
      clearInterval(timer5);
      clearInterval(timer6);
      clearInterval(timer7);
      clearInterval(timer8);
      clearInterval(timers);
      $(document).off("keydown");
      level+=1;
      level_gained=true;
    }
  }, 10
  )

  $(".start").off("click");
}

$(".start").on("click", start_game);

let check = setInterval(function(){
  if(game_over){
    clearInterval(check);
    $(".lives_heading").text("Lives : "+lives);
  }
  else if(life_lost==true){
    life_lost=false;
    $(".lives_heading").text("Lives : "+lives);
    setTimeout(function(){
      pacman_object.css("left", "0px");
      pacman_object.css("top", "0px");
      for(let i=0; i<ghost_objects.length; i++){
      ghost_objects[i].css("left", "553.8461538px");
      ghost_objects[i].css("top", "553.8461538px");
    }
      starting_position_ghost();
      starting_position_pac();
      start_game();
    }, 300);
  }
  else if(level_gained==true){
    divisor+=1;
    if(speed>=150){
    speed -= 10;
  }
    level_gained=false;
    $(".level_heading").text("Level "+level);
    setTimeout(function(){
      pacman_object.css("left", "0px");
      pacman_object.css("top", "0px");
      ghost_object.css("left", "553.8461538px");
      ghost_object.css("top", "553.8461538px");
      if(ghost_object.hasClass("scared_ghost")){
      ghost_object.removeClass("scared_ghost");
      ghost_object.attr("src", "ghost_image.png");
    }
      for(let i=1; i<ghost_objects.length; i++){
      ghost_objects[i].css("left", "553.8461538px");
      ghost_objects[i].css("top", "553.8461538px");
      if(ghost_objects[i].hasClass("scared_ghost")){
      ghost_objects[i].removeClass("scared_ghost");
      ghost_objects[i].attr("src", "ghost_image"+String(i+1)+".png");
    }
    }
      starting_position_ghost();
      starting_position_pac();
      for(let i=0; i<pellet_objects.length;i++){
        pellet_objects[i].removeClass("hidden_pellet");
      }
      pacman_object.score+=0.5;
      start_game();
      pacman_object.score-=0.5;
    }, 300);
  }
}, 50
);
