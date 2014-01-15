function Enemy(id) {
  this.health=100;
  this.speed=1;
  this.height=32;
  this.width=32;
  this.posX=0;
  this.posY=210;
  this.decrement=false;
  this.increment=true;
  this.animationSpeed=0.4;
  this.live=true;
  this.id=id;
}

Enemy.prototype.setX = function(x)
{
  this.posX=x;
};

Enemy.prototype.setY = function(y)
{
  this.posY=y;
};


Enemy.prototype.getX = function(x)
{
  return this.posX;
};

Enemy.prototype.getY = function(y)
{
  return this.posY;
};

Enemy.prototype.getSpeed = function(){
	return this.speed;
}

Enemy.prototype.animate = function(){
	if (this.height<30){
		this.increment=true;
		this.decrement=false;
	}
	if (this.height>35){
		this.decrement=true;
		this.increment=false;
	}
	if (this.increment){
		this.height+=this.animationSpeed;
		this.width+=this.animationSpeed;
	}
	if (this.decrement){
		this.height-=this.animationSpeed;
		this.width-=this.animationSpeed;
	}
}

Enemy.prototype.move = function(direction){
	if (direction=="up")
		this.posY--;
	if (direction=="down")
		this.posY++;
	if (direction=="left")
		this.posX--;
	if (direction=="right")
		this.posX++;
}

Enemy.prototype.reduceHealth = function(dmg){
	this.health-=dmg;
}

Enemy.prototype.getHealth = function(){
	return this.health;
}

Enemy.prototype.isLive = function(){
	if (this.health<=0)
		return false;
	else
		return true;
}

Enemy.prototype.getId = function(){
	return this.id;
}
