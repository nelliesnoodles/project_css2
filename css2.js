// JavaScript source code
/*  For Chingu solo project Tier 2
 *
 *
 */
//----------- game objects ---------//

let my_canvas;
let ctx;
let ship_image;
let enemy_image;
let tile_height;
let tile_width;
let enemy_tile_w;
let enemy_tile_h;
let max_right;
let max_left;
let max_up;
let max_down;
const enemy_speed = 1;
var current_player_x;
var current_player_y;
/* Enemy arrays for movement/image placement */
var first_wave = {};
var second_wave = {};
var third_wave = {};
/* direction variable helps determine the horizontal direction the enemies move*/
var direction_first = 1
var direction_second = -1
var direction_third = 1
/* potions, or attack method items */
let potions = []
let GAME;
let PAUSED = false;
var score = 0



//-------- Set up functions ----------

function set_DOM() {
    my_canvas = document.getElementById("myCanvas");

    tile_height = 20;
    tile_width = 30;
    enemy_tile_h = 15;
    enemy_tile_w = 15;
    ctx = my_canvas.getContext("2d");
    max_right = my_canvas.width - tile_width; // width - width of player tile
    max_left = 0;
    max_up = 100;
    max_down = my_canvas.height - tile_height;
    current_player_x = max_right / 2
    current_player_y = 110
    for (i = 0; i < 5; i++) {
        var new_enemy = 'new_enemy' + i
        first_wave[new_enemy] = []
        second_wave[new_enemy] = []
        third_wave[new_enemy] = []

    }
    //stackoverflow link: https://stackoverflow.com/questions/21139826/requestanimationframe-method-is-not-working
    window.requestAnimationFrame =
           window.requestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.msRequestAnimationFrame;


}



//--------------------------------------//
//---------animate functions------------//

/*  --- Enemy tiles ---  */
function set_enemy_arrays() {
    // set the initial coordinates in arrays
    // coordinates will be altered to create shifting motion
    var spacing = (enemy_tile_w * 2)

    // y, or the height/vertical is not altered in this code
    var y1 = 5
    var y2 = y1 + enemy_tile_h + 5
    var y3 = y2 + enemy_tile_h + 5

    // x, horizontal/width will be altered by this code
    let center = my_canvas.width / 2
    let first_offset = center - spacing * 2
    var x1 = first_offset
    var x2 = first_offset - spacing
    var x3 = first_offset + spacing


    for (var item in first_wave) {
        // set coordinates in array
        var array_item = first_wave[item]
        array_item[0] = x1
        array_item[1] = y1
        x1 += spacing
    };
    for (var item in second_wave) {
        var array_item2 = second_wave[item]
        array_item2[0] = x2
        array_item2[1] = y2
        x2 += spacing
    };
    for (var item in third_wave) {
        var array_item3 = third_wave[item]
        array_item3[0] = x3
        array_item3[1] = y3
        x3 += spacing
    };


}

function update_score(){
  let element = document.getElementById("Score")
  score += 42
  element.innerHTML = score

}

function isEmpty(obj){
  var alist = Object.keys(obj)
  if(alist.length > 0){
    return false
  }
  return true
}

function win(){
  let element_hidden = document.getElementById("hidden")
  let element_main = document.getElementById("main")
  element_hidden.style.display = 'flex';
  element_main.style.display = 'none';

}

function check_win(){
  let first = isEmpty(first_wave)
  let second = isEmpty(second_wave)
  let third = isEmpty(third_wave)
  //console.log(`empty arrays: ${first} , ${second}, ${third}`)

  if(first && second && third){
    win()

  }
}

function check_collision(enemy_x, enemy_y){
  let size = potions.length
  for(var i = 0; i < size; i++){
    let potion = potions[i]
    let potion_x = potion[0]
    let potion_y = potion[1]
    let collision = new Collision(enemy_x, enemy_y, potion_x, potion_y)
    collision.set_range(10, 10)
    if(collision.check_collide_y() && collision.check_collide_x()){
      potions.splice(i, 1)
      update_score()

        return true
      }

    };
    return false

}

function draw_enemy1() {

    let contact = false

    enemy = new Image()
    enemy.src = 'images/virus1.png'
    let obj;
    let w = enemy_tile_w;
    let h = enemy_tile_h;



    //clear_screen_first_wave()
    enemy.onload = () => {
        for (var item in first_wave) {

            var coordinates = first_wave[item]
            var x = coordinates[0]
            var y = coordinates[1]
            var collide = check_collision(x, y)

            if(!collide){
            ctx.drawImage(enemy, x, y, w, h)
            //window.requestAnimationFrame(draw_enemy1)
            }
            else{
              contact = true
              obj = item
              //console.log(`contact detected: ${obj}`)
            }
            };
            if(contact){
              //console.log(`deleting ${obj}`)
              delete first_wave[obj]
              check_win()
            }
    }

}

function draw_enemy2() {

    enemy2 = new Image()
    enemy2.src = 'images/virus2.png'
    contact = false

    let w = enemy_tile_w;
    let h = enemy_tile_h;



    //clear_screen_second_wave()
    enemy2.onload = () => {
        for (var item in second_wave) {
            var coordinates = second_wave[item]

            var x = coordinates[0]
            var y = coordinates[1]

            var collide = check_collision(x, y)
            if(!collide){
            ctx.drawImage(enemy, x, y, w, h)
            //window.requestAnimationFrame(draw_enemy1)
            }
            else{
              contact = true
              obj = item
              //console.log(`contact detected: ${obj}`)
            }
            };

            if(contact){
              //console.log(`deleting ${obj}`)
              delete second_wave[obj]
              check_win()
            }




    }

}

function draw_enemy3() {



    enemy3 = new Image()
    enemy3.src = 'images/virus3.png'
    contact = false

    let w = enemy_tile_w;
    let h = enemy_tile_h;



    //clear_screen_third_wave()
    enemy3.onload = () => {
        for (var item in third_wave) {
            var coordinates = third_wave[item]
            var x = coordinates[0]
            var y = coordinates[1]

            var collide = check_collision(x, y)
            if(!collide){
            ctx.drawImage(enemy, x, y, w, h)
            //window.requestAnimationFrame(draw_enemy1)
            }
            else{
              contact = true
              obj = item
              //console.log(`contact detected: ${obj}`)
            }

        };
        if(contact){
          //console.log(`deleting ${obj}`)
          delete third_wave[obj]
          check_win()
        }

    }

}
/*  -----Player tile ----*/

function draw_ship() {
    //clear_screen_ship()
    my_canvas = document.getElementById("myCanvas")
    ctx = my_canvas.getContext("2d")
    ship_image = new Image()
    ship_image.src = 'images/wbc2.png'
    let x = current_player_x
    let y = current_player_y
    let w = tile_width;
    let h = tile_height;
    ship_image.onload = () => {
        ctx.drawImage(ship_image, x, y, w, h);
        //window.requestAnimationFrame(draw_ship)
    }

}

/*  THESE items removed from use in favor of a complete screen redraw */
/* ------------ Clear screen for wbc -----------*/
function clear_screen_ship() {
    var y = max_up - tile_height / 2

    //ctx.clearRect(0, max_up, my_canvas.width, my_canvas.height);
}

/*   ---------  Clear screen for enemy ----- */
function clear_screen_first_wave() {

    var y = first_wave['new_enemy0'][1] + enemy_tile_h

    //ctx.clearRect(0, 0, my_canvas.width, y);
}

function clear_screen_second_wave() {
    var y1 = first_wave['new_enemy0'][1] + enemy_tile_h
    var y2 = second_wave['new_enemy0'][1]
    //ctx.clearRect(0, y1, my_canvas.width, y2)

}

function clear_screen_third_wave() {
    var y1 = second_wave['new_enemy0'][1] + enemy_tile_h
    var y2 = third_wave['new_enemy0'][1] - enemy_tile_h
    //ctx.clearRect(0, y1, my_canvas.width, y2)
}

/*  --- player movement ---- */

function move_up() {

    if (current_player_y > max_up) {
        current_player_y -= 5;

    }
    //update_game()
}

function move_down() {
    if (current_player_y < max_down) {
        current_player_y += 5
    }
  //  update_game()
}

function move_right() {

    if (current_player_x < max_right) {
        current_player_x += 5
    }
  //  update_game()
}

function move_left() {
    if (current_player_x > max_left) {
        current_player_x -= 5;
    }
  //  update_game()
}


class Collision {
    /*
     * item_x, item_y
     * item2_x, item2_y
     * Check if the coordinates are within range of each other, or collide     *
     */
    constructor(item_x, item_y, item2_x, item2_y) {
        this.item_x = item_x
        this.item_y = item_y
        this.item2_x = item2_x
        this.item2_y = item2_y
    }

    set_range(range_x, range_y) {
        this.range_x = range_x
        this.range_y = range_y
    }

    check_collide_x() {
        /*
         * If the x, y of the class items are within range of each other,
         * return a True for collision detected, False if they are not within range
         */
        var check_x = Math.abs(this.item_x - this.item2_x)

        if (check_x <= this.range_x) {
            return true
        }
        return false
    }

    check_collide_y() {
        var check_y = Math.abs(this.item_y - this.item2_y)
        if (check_y <= this.range_y) {
            return true
        }
        return false

    }
  }



  function add_potion(){
    let size = potions.length
    //potion size is 20 by 20
    let new_x = current_player_x + tile_width / 2
    let new_y = current_player_y - 25 //potion height + 5
    if(size < 5){


      let new_potion = [new_x, new_y]
      potions.push(new_potion)

    }
  }

  function draw_potions() {
       let size = potions.length
       if(size > 0){
       for(var i = 0; i < size; i ++){
         let current = potions[i]
         let potion_x = current[0]
         let potion_y = current[1]
         var potion_image = new Image()
         potion_image.src = "images/potion.png"
         potion_image.onload = () =>
         ctx.drawImage(potion_image, potion_x, potion_y, 20, 20)
       }
     }
    }

function move_check_potions(){
    let min = 20
    if(potions.length > 0){

    for(let i = 0; i < potions.length; i++){
      let potion = potions[i]
      if(potion[1] <= 0){
        potions.splice(i, 1)
      }
      else{
        potion[1] -= 5
      }

    };
    draw_potions()
  }

}

/*  ----- Enemy Movement ----*/
function alter_first_wave() {

    /*
    * The enemy will only move slightly left and right, horizontally across the
    * game board.
    */
    var spacing = (enemy_tile_w * 2)
    //let speed = 15
    //copied from the set_enemy_arrays() function:
    let center = my_canvas.width / 2
    let first_offset = center - spacing * 2
    //var x1 = first_offset
    //var x2 = first_offset - spacing
    //var x3 = first_offset + spacing
    /*----figure out when the entire row will meet the boundary--*/
    var initial_row_end = first_offset + spacing * 4
    //console.log(`Initial row end for red daleks = ${initial_row_end}`)
    var max_movement = my_canvas.width - enemy_tile_w

    /*---get current 5th item's x position ---*/
    //var new_enemy = 'new_enemy' + i
    current_first_x = null
    current_last_x = null
    let count = 0
    for(let item in first_wave){
      var current = first_wave[item]
      if(count==0){
        current_first_x = current[0]
      }
      current_last_x = current[0]
      count += 1

    }
    /*  Check the math */
    //console.log(`Last known dalek position on x axis = ${current_last_x}`)
    //console.log(`Maximum calculated movement available = ${max_movement}`)
    //console.log(`Row width of canvas = ${my_canvas.width}`)


    if (current_last_x >= max_movement - 5) {
        direction_first = -1
    }
    else if (current_first_x <= 10) {
        direction_first = 1
    }

    for (item in first_wave) {
        x_coordinate = first_wave[item]
        x_coordinate[0] += direction_first * enemy_speed
    };

    //draw_enemy1()


}

function alter_second_wave() {

    var spacing = (enemy_tile_w * 2)
    //let speed = 15

    let center = my_canvas.width / 2
    let first_offset = center - spacing * 2

    var x2 = first_offset - spacing
    //console.log("SECOND WAVE ON THE MOVE!")
    /*----figure out when the entire row will meet the boundary--*/
    var initial_row_end = x2 + spacing * 4
    //console.log(`Initial row end for red daleks = ${initial_row_end}`)
    var max_movement = my_canvas.width - enemy_tile_w
    /*---get current 5th item's x position ---*/
    //var new_enemy = 'new_enemy' + i
    current_first_x = null
    current_last_x = null
    let count = 0
    for(let item in second_wave){
      var current = second_wave[item]
      if(count==0){
        current_first_x = current[0]
      }
      current_last_x = current[0]
      count += 1

    }
    /*  Check the math */
    //console.log(`Last known virus position on x axis = ${current_last_x}`)
    //console.log(`Maximum calculated movement available = ${max_movement}`)
    //console.log(`Row width of canvas = ${my_canvas.width}`)


    if (current_last_x >= max_movement - 5) {
        direction_second = -1
    }
    else if (current_first_x <= 10) {
        direction_second = 1
    }

    for (item in second_wave) {
        x_coordinate = second_wave[item]
        x_coordinate[0] += direction_second * enemy_speed
    };

    //draw_enemy2()

}


function alter_third_wave() {
    /* A virus will seek out cells to invade, and it's the white blood cells job
     * To recognize a virus, envolop it and destroy it.
     * But these ones will shoot lasers.
   */
    var spacing = (enemy_tile_w * 2)
    //let speed = 15

    let center = my_canvas.width / 2
    let first_offset = center - spacing * 2
    var x3 = first_offset + spacing


    /*----figure out when the entire row will meet the boundary--*/
    var initial_row_end = x3 + spacing * 4
    //console.log(`Initial row end for red daleks = ${initial_row_end}`)
    var max_movement = my_canvas.width - enemy_tile_w
    /*---get current 5th item's x position ---*/
    //var new_enemy = 'new_enemy' + i
    current_first_x = null
    current_last_x = null
    let count = 0
    for(let item in third_wave){
      var current = third_wave[item]
      if(count==0){
        current_first_x = current[0]
      }
      current_last_x = current[0]
      count += 1

    }
    /*  Check the math */
    //console.log(`Last known enemy position on x axis = ${current_last_x}`)
    //console.log(`Maximum calculated movement available = ${max_movement}`)
    //console.log(`Row width of canvas = ${my_canvas.width}`)


    if (current_last_x >= max_movement - 5) {
        direction_third = -1
    }
    else if (current_first_x <= 10) {
        direction_third = 1
    }

    for (item in third_wave) {
        x_coordinate = third_wave[item]
        x_coordinate[0] += direction_third * enemy_speed
    };

    //draw_enemy3()

}

function clear_loop(){
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
  ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
}

function move_virus() {
    //setInterval(alter_first_wave, 1000)
    //setInterval(alter_second_wave, 1100)
    //setInterval(alter_third_wave, 800)
    alter_first_wave()
    alter_second_wave()
    alter_third_wave()
}

function update_enemy() {
    if(!PAUSED){
    draw_enemy1()
    draw_enemy2()
    draw_enemy3()
  }

}

function update_game() {
    clear_loop()
    draw_ship()
    move_virus()
    update_enemy()
    move_check_potions()


}
//---  reset game ---//
function reset(){
location.reload();
return false;
};
//--- pause game --//
function pause(){
  PAUSED = true;
  clearInterval(GAME)
}

//--- RUN GAME ----------//
function run_game() {
    set_DOM()
    set_enemy_arrays()
    GAME = setInterval(update_game, 150)
}
function resume(){
  PAUSED = false;
  GAME = setInterval(update_game, 150)
}



//-------------------------------------//
//--------onload functions-------------//
function checksize() {
    var size = window.innerWidth;
    //console.log(window.innerWidth)
    if (size < 800) {
        tile_height = 30;
        tile_width = 25;
        enemy_tile_h = 20;
        enemy_tile_w = 15;
    }
    else {
        tile_height = 35;
        tile_width = 20;
        enemy_tile_h = 25;
        enemy_tile_w = 20;
    }
    //console.log(`tile width = ${tile_width}`)
    //console.log(`tile height = ${tile_height}`)
}

function checkKey(e) {
    if(!PAUSED){

    e = e || window.event;
    //console.log("keydown event")

    if (e.code === 'ArrowUp') {
        move_up()
    }
    else if (e.code === 'ArrowDown') {
        move_down()
    }
    else if (e.code === 'ArrowRight') {
        move_right()
    }
    else if (e.code === 'ArrowLeft') {
        move_left()
    }
    else if (e.key === 'f'){
        add_potion()
    }


    else {
        //console.log(`${e.code} ${e.key}`)
    }
  }

}

//         -----              //
//-------- TESTS ------------//
//         -----              //

function test_it(){
  //win()
}

function test_keydown() {
    console.log("KEY DOWN")

}

function test_load() {
    console.log("Page is loaded.")
    set_DOM()
    draw_ship()
    draw_enemy()
}

function test_enemy_arrays() {
    for (item in first_wave) {
        var array_item1 = first_wave[item]
        console.log('first wave')
        console.log(array_item1[0], array_item1[1])
    };
    for (item in second_wave) {
        var array_item2 = second_wave[item]
        console.log('second wave')
        console.log(array_item2[0], array_item2[1])
    };
    for (item in third_wave) {
        var array_item3 = third_wave[item]
        console.log('third wave')
        console.log(array_item3[0], array_item3[1])
    };
}

function test_collison() {
    let test1 = new Collision(2, 3, 8, 10)
    test1.set_range(6)
    console.log(test1.test_)

}
/* accessability */
function change_scale(){
  let element = document.getElementById('body')
  let mode = element.value
  let toggle = document.getElementById('toggle')
  //console.log(mode)
  if(mode == 'ON'){
    //MDN : div.classList.add("anotherclass");
    element.classList.add('grey_scale')
    element.value = 'OFF'
    toggle.className = ''
    toggle.classList.add("fas", "fa-toggle-off", "fa-2x")

  }
  else{
    element.classList.remove('grey_scale')
    element.value = 'ON'
    toggle.className = ''
    //<i class="fas fa-toggle-on"></i>
    toggle.classList.add("fas", "fa-toggle-on", "fa-2x")

  }
}

//---------- EVENT listeners, PAGE load -----------//
function set_EventListeners() {
    //start button
    //pause button
    //stop button
    let adaptor = document.getElementById('color_adapt')

    document.addEventListener('keydown', checkKey);
    window.addEventListener('resize', checksize);
    adaptor.addEventListener('click', change_scale);




}




window.addEventListener('load', (event) => {
    //set_DOM() <-- Moved to <run_game()>
    set_EventListeners()
    run_game()
});
