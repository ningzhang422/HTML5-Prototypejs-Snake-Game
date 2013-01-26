// JavaScript Document
/*
*Class Snake
* 11 Property by default (length,speed,direction ...)
* 2 Functions by default (Eat and Move)
*TO DO
* 1. Add diffrent type food, for example : 
* red cell will be poison who can reduce snake's health value. snake will be 
* dead if its health value less than or equel 0.
* green cell will by Antidote who can cure snake
* 2. Using HTML5 localstorage to keep the best score.
*/
var Snake = Class.create(Tools,{
 
  initialize: function(ctx,w,h,cs) {
	// ctx, object ground canvas.
	// cs, if = true, speed well be faster.  
	
	if(cs){
		if(!this.dead){
			if(typeof loop != "undefined") clearInterval(loop);
			loop = setInterval(function(){this.move(ctx,food.x,food.y);}.bind(this), this.speed);
		}	
	}else{
		
		this.name = 'snake';
    	this.width_of = 10; // width and height one cell (our snake is made by many cells)
		this.length_of = 5; // init value for length of snake. 5 cells
		this.direction = "right"; // init direction movement 
		this.health = 100; // init health of snake. !!! TODO
		this.dead = false; // a baby snake is alive didn't it ?
		this.speed = 200; // To move forward every 200 ms 
		this.w = w; // snake's ground width
		this.h = h; // snake's ground height
		this.score = 0; // how many cells snake has eaten.
	
		this.body_of = []; // member of cells, snake body show !!!
	
		// Event listener, we can cange the direction of snake by this function
		document.observe('keydown', function(e) {
			this.turn_around(e);
		}.bindAsEventListener(this))
		
		
		// snake body composition 
		for(var i = 0; i<this.length_of;i++){
			this.body_of.push({pos_X: i, pos_Y:0});
		}
		
		// init one food 'cell' for snake
		food = new Food(this.w,this.h);
	
	    // function move will be called automatically in every x ms. x = speed
		if(!this.dead){
			if(typeof loop != "undefined") clearInterval(loop);
			loop = setInterval(function(){this.move(ctx,food.x,food.y);}.bind(this), this.speed);
		}
	}
  },
  eat: function(x,y) {
	head = {pos_X:x,pos_Y:y};
    this.body_of.unshift(head);
  },
  move: function(ctx,food_x,food_y) {
	
	next_X = this.body_of[this.body_of.length-1].pos_X;
	next_Y = this.body_of[this.body_of.length-1].pos_Y;

	if(this.direction == "right") next_X++;
		else if(this.direction == "left") next_X--;
		else if(this.direction == "up") next_Y--;
		else if(this.direction == "down") next_Y++;
		
	for(i=0;i<this.body_of.length;i++){
		if(i == this.body_of.length-1){
			this.body_of[i] = {pos_X:next_X,pos_Y:next_Y};
		}else{
			this.body_of[i] = this.body_of[i+1];
		}
	}
	
	if(next_X == food_x && next_Y == food_y){
			this.eat(next_X,next_Y);
			this.score+= 10;
			this.speed = this.speed-10;
			this.initialize(ctx,this.w,this.h,true);
			food = new Food(this.w,this.h);
	}
	
	if(next_X == -1 || next_X == this.w/this.width_of || next_Y == -1 || next_Y == this.h/this.width_of || this.killself(next_X, next_Y, this.body_of)){
			this.dead = true;
			this.initialize(ctx,this.w,this.h,false);
	}
	
	this.draw(ctx,"#ffffff",this.w,this.h,food_x,food_y,this.score);
	
  }

});