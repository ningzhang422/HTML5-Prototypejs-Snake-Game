// JavaScript Document
var Food = Class.create(Tools,{
 
  initialize: function(w,h) {
    this.width_of = 10;
	this.length_of = 1;
	this.x = Math.round(Math.random()*(w-this.width_of)/this.width_of);
	this.y = Math.round(Math.random()*(h-this.width_of)/this.width_of);
	
	this.body_of = [];
  }
});