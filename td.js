var FRAMERATE = 1000 / 60;
var enemyArr = new Array();
var board = new Array();
var towers = new Array();
var mouseFlashX = 0;
var mouseFlashY = 0;
var number_of_enemies = 30;
window.onmousemove = mouseOnBoard;
window.onmousedown = todoklikki;
var mouseFlashColor="rgba(174,28,15, 0.5)";
var buildingTower=false;
var currentTower;
var red_area_board = new Array(0,1,10,11,12,13,14,15,156,157,158,159,16,160,161,162,163,164,17,173,174,175,176,177,178,179,18,180,181,182,183,184,185,186,187,188,189,19,190,199,20,200,201,202,203,204,205,206,207,208,209,21,210,211,212,213,214,214,215,216,22,225,226,227,227,228,229,23,230,231,232,233,24,240,241,242,25,251,252,253,266,267,268,277,278,279,292,293,294,3,303,304,305,318,319,320,320,321,322,323,324,325,326,327,328,329,329,330,331,344,345,346,347,348,349,350,351,352,353,354,355,355,356,356,357,370,371,372,373,374,375,376,377,378,379,380,381,382,383,4,5,6,7,8,9,109,130,26,52,78,104,130,234,260,286,312,338,364,390,416,442,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,467,441,415,389,363,337,310,311,285,259,155,129,103,77,51);
for (var a = 0; a <= 600; a+=32) {
	for (var i = 0; i <= 800; i+=32) {
		board.push(new Array(i,a));
	};
};
for (var i = 0; i < 30; i++) {
	enemyArr.push(new Enemy(i));
};
var clock = 0;
var gamestarted = false;
var canvas = document.getElementById("game").getContext("2d");

function gameLoop() {
  canvasClear();
  drawBoard();
  if (buildingTower) flashBox();
  for (var i = 0; i < number_of_enemies; i++) {
    if (clock>(i*100))
      drawEnemies(enemyArr[i]);
  };
  shootEnemies();
  drawTowers();
  clock++;
}

function drawEnemies(enemy){
  if (enemy.isLive()===true){
    canvas.fillStyle = "rgba(220,75,113, 0.5)";
    canvas.fillRect (enemy.getX(), enemy.getY(), enemy.height, enemy.width);
  
    if (enemy.getX()>=0 && enemy.getX()<=207)
      enemy.move('right');
    if (enemy.getX()>=207 && enemy.getY()>=210 && enemy.getY()<=397 && enemy.getX()<=557)
      enemy.move('down');
    if (enemy.getX()>=207 && enemy.getX()<=557 && enemy.getY()>=397)
      enemy.move('right');
    if (enemy.getX()>=557 && enemy.getY()>=210)
      enemy.move('up');
    if (enemy.getX()>=557 && enemy.getY()<=210)
      enemy.move('right');
    enemy.animate();
    drawEnemyHealth(enemy);
  }
}

function drawBoard(){
  canvas.fillStyle = "#7195A3";
  canvas.fillRect (0, 200, 200, 50);
  canvas.fillRect (200, 200, 50, 200);
  canvas.fillRect (200, 390, 350, 50);
  canvas.fillRect (550, 200, 50, 240);
  canvas.fillRect (550, 200, 300, 50);
}

function canvasClear(){
	canvas.clearRect(0, 0, 800, 600);
}

function startGame(){
	if ( gamestarted===false ){
		setInterval( gameLoop, FRAMERATE );
		gamestarted=true;
    document.getElementById('maintitle').style.display = "none";
	}
}

function mouseOnBoard(event){
  if (buildingTower){
  	var x = event.clientX;
  	var y = event.clientY;
  	for (var i = 0; i < board.length; i++) {
  		if ( x>=board[i][0] && x<=(board[i][0]+32) && y>=board[i][1] && y<=(board[i][1]+32) ){
  			mouseFlashX=board[i][0]-16;
  			mouseFlashY=board[i][1]-16;

        if (red_area_board.indexOf(i)>(-1))
  				mouseFlashColor="rgba(174,28,15, 0.5)";
  			else
  				mouseFlashColor="rgba(99,140,82, 0.5)";
  		}
  	};
  }
}

function todoklikki(event){
  var thetower = {};
      thetower["graytower"] = "normal";
      thetower["redtower"]  = "hot";
      thetower["bluetower"] = "chill";
  var x = event.clientX;
  var y = event.clientY;
  if (event.target.className.indexOf("tower")>(-1) ){
    buildingTower=true;
    currentTower=thetower[event.target.id];
  }
  if (buildingTower===true && mouseFlashColor=="rgba(99,140,82, 0.5)" && x<800)
  {
    buildTower(x, y);
  }
}

function flashBox(){
	canvas.fillStyle = mouseFlashColor;
	canvas.fillRect (mouseFlashX, mouseFlashY, 32, 32);
  canvas.fillStyle = "gray";
  canvas.beginPath();
  canvas.arc(mouseFlashX+16,mouseFlashY+16,150,0,2*Math.PI);
  canvas.stroke();
}

function drawTowers(){
  for (var i = 0; i < towers.length; i++) {
    canvas.fillStyle = towers[i].getColor();
    canvas.fillRect (towers[i].getX(), towers[i].getY(), towers[i].getHeight(), towers[i].getWidth());
  };
}

function buildTower(x,y){
      for (var i = 0; i < board.length; i++) {
      if ( x>=board[i][0] && x<=(board[i][0]+32) && y>=board[i][1] && y<=(board[i][1]+32) ){
        towers.push( new Tower(currentTower, board[i][0]-16, board[i][1]-16) );
        red_area_board.push(i);
        buildingTower=false;
        return;
      }
    };
}

function shootEnemies(){
  for(var i=0; i<towers.length; i++){
    var priority_enemy;
    var lowest_health = 100;
    var closest_distance = 151;
    for (var a = 0; a < enemyArr.length; a++) {
      if (enemyArr[a].isLive()===true){
        var distX = towers[i].bulletX - (enemyArr[a].getX()+16);
        var distY = towers[i].bulletY - (enemyArr[a].getY()+16);
        var towerdistX = (towers[i].getX()+16) - (enemyArr[a].getX()+16);
        var towerdistY = (towers[i].getY()+16) - (enemyArr[a].getY()+16);
        var dist = Math.sqrt((distX * distX) + (distY * distY));
        var towerdist  = Math.sqrt((towerdistX * towerdistX) + (towerdistY * towerdistY));

        if (dist<closest_distance){
          priority_enemy = enemyArr[a];
          closest_distance = dist;
        }
      }

      if (towers[i].getBulletLock()==enemyArr[a].getId() && enemyArr[a].isLive()===false)
        towers[i].resetBullets();
    }

    if (closest_distance<=150){
      shootTo(towers[i], priority_enemy);
      towers[i].setBulletOnTheFly(true);
    }

  }

}

function shootTo(tower, enemy){

  if (tower.getBulletLock()<0)
    tower.setBulletLock(enemy.id);
  if (tower.getBulletLock()==enemy.id || tower.getBulletOnTheFly()){
    var dx = tower.bulletX - (enemy.getX()+16);
    var dy = tower.bulletY - (enemy.getY()+16);
    var collision = dx<4 && dx>-4 && dy<4 && dy>-4 ? true : false;

      if (dx>0)
        tower.bulletX-=tower.speed;
      if (dx<0)
        tower.bulletX+=tower.speed;
      if (dy>0)
        tower.bulletY-=tower.speed;
      if (dy<0)
        tower.bulletY+=tower.speed;
      
      canvas.beginPath();
      canvas.fillStyle=tower.getColor();
      canvas.arc(tower.bulletX,tower.bulletY,10,0,2*Math.PI);
      canvas.closePath();
      canvas.fill();
    
    if (collision){
      tower.bulletX=tower.posX+(tower.width/2);
      tower.bulletY=tower.posY+(tower.width/2);
      tower.setBulletOnTheFly(false);
      enemy.reduceHealth( tower.getDamage() );
      tower.setBulletLock(-1);
    }
  }

}


function drawEnemyHealth(enemy){
  canvas.fillStyle = "green";
  if (enemy.getHealth()<30)
    canvas.fillStyle = "red";
  canvas.fillRect (enemy.getX(), enemy.getY()-5, ((enemy.width*enemy.getHealth())/100), 3);
}
