<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="Tower Defense">
    <meta name="author" content="Taneli Kärkkäinen">
    <title>Tower Defense</title>
    <link href="css/tdstyles.css" rel="stylesheet">
    <script type="text/javascript" src="classes/Enemy.js"></script>
    <script type="text/javascript" src="classes/Tower.js"></script>
  </head>
  <body>
  	<div id="mainwindow"onclick="startGame();">
      <div id="maintitle"><p>Click to start the game.</p></div>
  		<canvas id="game" width="800" height="600"></canvas>
  		<div id="gamewindow">
  			<div>Towers</div>
  			<div>
  				<div id="graytower" class="tower gray">Normal(100g)</div>
  				<div id="redtower" class="tower red">Hot(200g)</div>
  				<div id="bluetower" class="tower blue">Chill(150g)</div>
  			</div>
  		</div>
  	</div>
  </body>
<script type="text/javascript" src="td.js"></script>
</html>