function Tower(type, posX, posY) {
  if (type=="normal"){
  	this.price=100;
  	this.damage=10;
    this.coloring="rgba(173,187,191,0.5)";
  }
  if (type=="chill"){
  	this.price=150;
  	this.damage=15;
    this.coloring="rgba(91,154,255,0.5)";
  }
  if (type=="hot"){
  	this.price=200;
  	this.damage=30;
    this.coloring="rgba(255,99,87,0.5)";
  }
  this.height=32;
  this.width=32;
  this.range=75;
  this.posX=posX;
  this.posY=posY;
  this.live=true;
  this.selected=false;
  this.speed=3;
  this.bulletX = posX+16;
  this.bulletY = posY+16;
  this.bullet_on_air = false;
  this.locked_on = -1;
  this.collision = false;
  this.bullet_on_fly = false;
}

Tower.prototype.setX = function(x)
{
  this.posX=x;
};

Tower.prototype.getX = function()
{
  return this.posX;
};

Tower.prototype.setY = function(y)
{
  this.posY = y;
};

Tower.prototype.getY = function()
{
  return this.posY;
};

Tower.prototype.setSelected = function(selected)
{
  this.selected = selected;
};

Tower.prototype.getSelected = function()
{
  return this.selected;
};

Tower.prototype.getColor = function(){
  return this.coloring;
}

Tower.prototype.getHeight = function(){
  return this.height;
}

Tower.prototype.getWidth = function(){
  return this.width;
}

Tower.prototype.animate = function(){

}

Tower.prototype.getBulletLock = function(){
  return this.locked_on;
}

Tower.prototype.setBulletLock = function(enemy_id){
  this.locked_on = enemy_id;
}

Tower.prototype.setBulletOnTheFly = function(bullet_on_fly){
  return this.bullet_on_fly = bullet_on_fly;
}

Tower.prototype.getBulletOnTheFly = function(){
  return this.bullet_on_fly;
}

Tower.prototype.getDamage = function(){
  return this.damage;
}

Tower.prototype.resetBullets = function(){
  this.bulletX = this.posX+16;
  this.bulletY = this.posY+16;
  this.setBulletLock(-1);
}