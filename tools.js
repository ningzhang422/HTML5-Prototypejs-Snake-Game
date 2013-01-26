// define a module
var Tools = {
  draw_cell: function(ctx,x,y) {
	  
	//ctx.clearRect(x*this.width_of, y*this.width_of, this.width_of, this.width_of);
    ctx.fillStyle = "blue";
	ctx.fillRect(x*this.width_of, y*this.width_of, this.width_of, this.width_of);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x*this.width_of, y*this.width_of, this.width_of, this.width_of);
  },
  turn_around: function(event) {
	 //console.log(event.keyCode);
	 switch(event.keyCode) {
		case 37:	//Left
			if(this.direction != "right") this.direction = 'left';
			break;
		case 38:		//Up
			if(this.direction != "down") this.direction = 'up';
			break;
		case 39:		//Right
			if(this.direction != "left") this.direction = 'right';
			break;
		case 40:		//Down
			if(this.direction != "up") this.direction = 'down';
			break;
	}
  },
  wound: function(hp) {
    this.health -= hp;
    if (this.health < 0) this.kill();
  },
  kill: function() {
    this.dead = true;
  },
  draw: function(ctx,color,w,h,food_x,food_y,score){
	  
	  ctx.fillStyle = "green";
	  ctx.fillRect(0, 0, w, h);
	  ctx.strokeStyle = "black";
	  ctx.strokeRect(0, 0, w, h);
	  
	  ctx.fillStyle = "white";
	  
	  for(var i=0;i<this.body_of.length;i++){
			this.draw_cell(ctx,this.body_of[i].pos_X,this.body_of[i].pos_Y);
	  }
	  
	  this.draw_cell(ctx,food_x,food_y);
	  var score_text = "Score: " + score;
	  ctx.fillText(score_text, 5, h-5);
  },
  restart: function(ctx,dead) {
  	  if(dead){
		  
		  ctx.font = "bold 24px Georgia";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", 80, 130);
             
            ctx.font = "normal 12px Arial";
            ctx.fillStyle = "blue";
            ctx.fillText("Please refresh the page to replay", 55, 150); 
	  }
  },
  killself: function(x, y, array){
	  for(var i = 1; i < array.length-2; i++)
		{
			if(array[i].pos_X == x && array[i].pos_Y == y)
			 return true;
		}
		return false;
  }
};