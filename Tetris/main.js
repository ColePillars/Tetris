(function(){
var canvas = document.getElementById('canvas');
//var canvas2 = document.getElementById('canvas2');
var context = canvas.getContext('2d');
//var context2 = canvas2.getContext('2d');
var grid;			//Tetris Grid
var prevGrid;			//Previous Grid
prevGrid = new Array(10);
for (var i = 0; i < 23; i++) {
	prevGrid[i] = new Array(23);
}
var block1 = 6;		//Next block
var block2 = 6;		//Next next block
var color = 1; 			//Type of block
var currentRotation = -1; 	//Orientation of current block
var counter = 1;
var move = 0;
createGrid();
setInterval(update, 1);

//Updates board
function update() {
	setTimeout(userInput, 1);
	
	if (move == 37) {
		moveLeft();
		//document.body.innerHTML = "";
		display();
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				prevGrid[x][y] = grid[x][y];
			}
		}
	}
	if (move == 38) {
		rotateDirection(1);
		//document.body.innerHTML = "";
		display();
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				prevGrid[x][y] = grid[x][y];
			}
		}
	}
	if (move == 39) {
		moveRight();
		//document.body.innerHTML = "";
		display();
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				prevGrid[x][y] = grid[x][y];
			}
		}
	}
	if (move == 40) {
		makeSolid();
		moveDown(1, 22);
		lossCondition();
		clearLines(); 
		newBlock(); 
		//document.body.innerHTML = "";
		display();
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				prevGrid[x][y] = grid[x][y];
			}
		}
	}
	
	if (counter%200 == 0) {
		makeSolid();
		moveDown(1, 22);
		lossCondition();
		clearLines(); 
		newBlock(); 
		//document.body.innerHTML = "";
		display();
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				prevGrid[x][y] = grid[x][y];
			}
		}
	}
	counter++;
}

//Grid 10x23, top 2 rows and bottom row will be hidden
function createGrid() {
	grid = new Array(10);
	for (var i = 0; i < 23; i++) {
		grid[i] = new Array(23);
	}
	for (var y = 0; y < 23; y++) {	
		for (var x = 0; x < 10; x++) {
			if (y == 22) {
				grid[x][y] = 9;
			}
			else {
				grid[x][y] = 0;
				drawPic(0, 24*x, 24*y);
			}
			prevGrid[x][y] = grid[x][y];
		}
	}
}

//Displays Grid
function display() {
	//document.write("<br>");
	for (var y = 0; y < 23; y++) {
		for (var x = 0; x < 10; x++) {
			if(grid[x][y] != prevGrid[x][y] || grid[x][y] == 1) {
				if (grid[x][y] == 0) {
					drawPic(0, 24*x, 24*y);
					//document.write(grid[x][y] + " ");
				}
				if (grid[x][y] == 8) {
					drawPic(8, 24*x, 24*y);
					//document.write("<b>" + grid[x][y] + " </b>");
				}
				if (grid[x][y] == 1) {
					//context1.clearRect (x*24, y*24, 24, 24);
					drawPic(color, 24*x, 24*y);
					//document.write("<b>" + color + " </b>");
				}
			}
		}
		//document.write("<br>");
	}
	//document.write("Next blocks:<br>");
	//blockInfo(block1, 1);
	//blockInfo(block2, 2);
}

function drawPic (colorType, x, y) {
	//context.clearRect (0, 0, 240, 552);
	var imageObj = new Image();
	switch (colorType) {
		case 0:
			imageObj.onload = function() {
				context.drawImage(imageObj, x, y);
			};
			imageObj.src = 'Tetris/assets/white.png';
			break;
	 	case 1:
	 		
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/teal.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 2:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/yellow.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 3:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/purple.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 4:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/green.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 5:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/red.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 6:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/blue.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 7:
	 		imageObj.onload = function() {
	 			context.drawImage(imageObj, x, y);
	 		};
	 		imageObj.src = 'Tetris/assets/orange.png';
	 		//context2.clearRect (x, y, 24, 24);
	 		break;
	 	case 8:
	 		imageObj.onload = function() {
				context.drawImage(imageObj, x, y);
			};
			imageObj.src = 'Tetris/assets/gray.png';
			break;
		case 9:
			imageObj.onload = function() {
				context.drawImage(imageObj, x, y);
			};
			imageObj.src = 'Tetris/assets/black.png';
			break;
      	}
}

//Clears lines which have all 8's in them
function clearLines() {
	//Eventual scoring rules: 40*(n+1)	100*(n+1)	300*(n+1)	1200*(n+1)
	//n is the level number	  1 line	2 lines		3 lines		4 lines
	var line1 = -1;
	var line2 = -1;
	var line3 = -1;
	var line4 = -1;
	for (var y = 22; y >= 0; y--) {
		var bool = true;
		for (var x = 0; x < 10; x++) {
			if (grid[x][y] != 8) {
				bool = false;
			}
		}
		if (bool) {
			if (line1 != -1 && line2 != -1 && line3 != -1 && line4 == -1) {
				line4 = y;
			}
			if (line1 != -1 && line2 != -1 && line3 == -1) {
				line3 = y;
			}
			if (line1 != -1 && line2 == -1) {
				line2 = y;
			}
			if (line1 == -1) {
			 	line1 = y;
			}
			/*
			for (var x = 0; x < 10; x++) {
				grid[x][y] = 0;
			} */
		}
	}
	if (line4 != -1) {
		moveDown(8, line4);
	}
	if (line3 != -1) {
		moveDown(8, line3);
	}
	if (line2 != -1) {
		moveDown(8, line2);
	}
	if (line1 != -1) {
		moveDown(8, line1);
	}
}

function userInput() {
	move = 0;
	document.addEventListener('keydown', function(event) {
			if (event.keyCode == 37) {
				move = 37;
			}
			if (event.keyCode == 38) {
				move = 38;
			}
			if (event.keyCode == 39) {
				move = 39;
			}
			if (event.keyCode == 40) {
				move = 40;
			}
	}, false);
}

function moveLeft() {
	var bool = true;
	for (var y = 0; y < 23; y++) {
		for (var x = 0; x < 10; x++) {
			if (grid[x][y] == 1) {
				if (x == 0) {
					bool = false;
				}
				else if (grid[x-1][y] == 8) {
					bool = false;
				}
			}
		}
	}
	if (bool) {
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 23; y++) {
				if (grid[x+1][y] == 1) {
					grid[x][y] = 1;
				}
				else if (grid[x][y] == 1) {
					grid[x][y] = 0;
				}
			}
		}
	}
}

function moveRight() {
	var bool = true;
	for (var y = 0; y < 23; y++) {
		for (var x = 0; x < 10; x++) {
			if(grid[x][y] == 1) {
				if (x == 9) {
					bool = false;
				}
				else if (grid[x+1][y] == 8){
					bool = false;
				}
			}
		}
	}
	if (bool) {
		for (var x = 9; x >= 0; x--) {
			for (var y = 0; y < 23; y++) {
				if (x == 0 && grid[x][y] == 1) {
					grid[x][y] = 0;
				}
				else if (x != 0  && grid[x-1][y] == 1) {
					grid[x][y] = 1;
				}
				else if (x != 0 && (grid[x-1][y] == 0 || grid[x-1][y] == 8) && grid[x][y] == 1) {
					grid[x][y] = 0;
				}	
			}
		}
	}
}

function rotateDirection(direction) {
	var bool = false;
	var ypos;
	var xpos;
	for (var y = 0; y < 23; y++) {
		for (var x = 0; x < 10; x++) {
			if (!bool && grid[x][y] == 1) {
				ypos = y;
				xpos = x;
				bool = true;
			}
		}
	}
	if (bool) {
		blockInfo(color, ypos, xpos, 1, 0);
	}
}	

//Adds New Block to the board
function newBlock() {
	if (block1 == -1 && block2 == -1 && color == -1) {
		var rng  = Math.floor((Math.random() * 7) + 1);
		color = rng;
		block1 = rng;
		rng  = Math.floor((Math.random() * 7) + 1);
		block2 = rng;
	}
	var bool = true;
	for (var y = 0; y < 23; y++) {	
		for (var x = 0; x < 10; x++) {
			if (grid[x][y] == 1) {
				bool = false;
			}
		}
	}
	if (bool) {
		blockInfo(block1, 0, -1, 0, 0);
		var rng  = Math.floor((Math.random() * 7) + 1);
		block1 = block2
		block2 = rng;
	}
}

//Moves all of a certain block down or to the side a space
function moveDown(block, lowerBound) {
	for (var y = lowerBound; y >= 0; y--) {	
		for (var x = 0; x < 10; x++) {
			if (grid[x][y-1] == block ) {
				grid[x][y] = block;
			}
			if (grid[x][y-1] != block && grid[x][y] == block) {
				grid[x][y] = 0;
			}
		}
	}
}

//Checks if a 1 is on top of a 8 or 8, then changes all 1's to 8's if their is
function makeSolid() {
	var bool = false;
	for (var y = 0; y < 23; y++) {	
		for (var x = 0; x < 10; x++) {
			if ((grid[x][y] == 8 || grid[x][y] == 9) && grid[x][y-1] == 1) {
				bool = true;
			}
		}
	}
	if (bool) {
		for (var y = 0; y < 23; y++) {	
			for (var x = 0; x < 10; x++) {
				if (grid[x][y] == 1) {
					grid[x][y] = 8;
				}
			}
		}
	}
}

//Resets game if their is an 8 on top 2 rows
function lossCondition() {
	for (var y = 0; y < 2; y++) {	
		for (var x = 0; x < 10; x++) {
			if (grid[x][y] == 8) {
				createGrid();
			}
		}
	}
}

function blockInfo(block, ypos, xpos, rotation, info) {
	//info = 0 -> add blocks to grid
	//info = 1 -> print first block
	//info = 2 -> print 2nd block
	if (info == 2) {
		document.write("<br>");
	}
	switch (block) {
		case 1: //Line
			//x
			//x
			//x
			//x
			if (info == 0) {
				color = 1;
				var rng  = Math.floor((Math.random() * 2));
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 7));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 3) < 10 && 
						(rng + xpos + 0) >= 0 && 
						ypos < 22 &&
						ypos >= 0 &&
						grid[rng + xpos + 0][ypos] != 8 &&
						grid[rng + xpos + 1][ypos] != 8 &&
						grid[rng + xpos + 2][ypos] != 8 &&
						grid[rng + xpos + 3][ypos] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos] = 1;
						grid[rng + xpos + 1][ypos] = 1;
						grid[rng + xpos + 2][ypos] = 1;
						grid[rng + xpos + 3][ypos] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 10));
					if (xpos >= 0) {
						rng = 0;
						xpos++;
						xpos++;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos) < 10 && 
						(rng + xpos) >= 0 && 
						(ypos + 3) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos][ypos + 0] != 8 &&
						grid[rng + xpos][ypos + 1] != 8 &&
						grid[rng + xpos][ypos + 2] != 8 &&
						grid[rng + xpos][ypos + 3] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos][ypos + 0] = 1;
						grid[rng + xpos][ypos + 1] = 1;
						grid[rng + xpos][ypos + 2] = 1;
						grid[rng + xpos][ypos + 3] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 7));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						xpos--;
						ypos++;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 3) < 10 && 
						(rng + xpos + 0) >= 0 && 
						ypos < 22 &&
						ypos >= 0 &&
						grid[rng + xpos + 0][ypos] != 8 &&
						grid[rng + xpos + 1][ypos] != 8 &&
						grid[rng + xpos + 2][ypos] != 8 &&
						grid[rng + xpos + 3][ypos] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos] = 1;
						grid[rng + xpos + 1][ypos] = 1;
						grid[rng + xpos + 2][ypos] = 1;
						grid[rng + xpos + 3][ypos] = 1;
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 10));
					if (xpos >= 0) {
						rng = 0;
						xpos++;
						ypos--;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos) < 10 && 
						(rng + xpos) >= 0 && 
						(ypos + 3) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos][ypos + 0] != 8 &&
						grid[rng + xpos][ypos + 1] != 8 &&
						grid[rng + xpos][ypos + 2] != 8 &&
						grid[rng + xpos][ypos + 3] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos][ypos + 0] = 1;
						grid[rng + xpos][ypos + 1] = 1;
						grid[rng + xpos][ypos + 2] = 1;
						grid[rng + xpos][ypos + 3] = 1;
						currentRotation = -1;
					}
				}
				
			}
			if (info == 1) {
				document.write("1<br>1<br>1<br>1<br>---");
			}
			if (info == 2) {
				document.write("1<br>1<br>1<br>1<br>");
			}
			break;
		case 2: //Square
			//xx
			//xx
			if (info == 0) {
				color = 2;
				var rng  = Math.floor((Math.random() * 9));
				if (xpos >= 0) {
					rng = 0;
				}
				else {
					xpos = 0;
				}
				grid[rng + xpos + 0][ypos + 0] = 1;
				grid[rng + xpos + 0][ypos + 1] = 1;
				grid[rng + xpos + 1][ypos + 0] = 1;
				grid[rng + xpos + 1][ypos + 1] = 1;
				currentRotation = 0;
			}
			if (info == 1) {
				document.write("1-1<br>1-1<br>---");
			}
			if (info == 2) {
				document.write("1-1<br>1-1<br>")
			}
			break;
		case 3: //T-Block
			//x-
			//xx
			//x-
			if (info == 0) {
				color = 3;
				var rng  = Math.floor((Math.random() * 4));
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1; 
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = -1;
					}
				}
			}
			if (info == 1) {
				document.write("1-0<br>1-1<br>1-0<br>---");
			}
			if (info == 2) {
				document.write("1-0<br>1-1<br>1-0<br>");
			}
			break;
		case 4: //Right snake
			//-xx
			//xx-
			if (info == 0) {
				color = 4;
				var rng  = Math.floor((Math.random() * 2));
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						ypos++;
						xpos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1;
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = -1;
					}
				}
			}
			if (info == 1) {
				document.write("0-1-1<br>1-1<br>---");
			}
			if (info == 2) {
				document.write("0-1-1<br>1-1<br>");
			}
			break;
		case 5: //Left snake
			//xx-
			//-xx
			if (info == 0) {
				color = 5;
				var rng  = Math.floor((Math.random() * 2));
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						xpos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						xpos--;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						currentRotation = -1;
					}
				}
			}
			if (info == 1) {
				document.write("1-1<br>0-1-1<br>---");
			}
			if (info == 2) {
				document.write("1-1<br>0-1-1<br>");
			}
			break;
		case 6: //Left gun
			//xxx
			//--x
			if (info == 0) {
				color = 6;
				var rng  = Math.floor((Math.random() * 4));
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						xpos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = -1;
						
					}
				}
			}
			if (info == 1) {
				document.write("1-1-1<br>0-0-1<br>---");
			}
			if (info == 2) {
				document.write("1-1-1<br>0-0-1<br>");
			}
			break;
		case 7: //Right gun
			//xxx
			//x--
			var rng  = Math.floor((Math.random() * 8));
			if (info == 0) {
				color = 7;
				var rng  = Math.floor((Math.random() * 4));
				rng = 0;
				if (rotation != 0) {
					rng = currentRotation + rotation;
				}
				if (rng == 0) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8 &&
						grid[rng + xpos + 2][ypos + 1] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1;
						grid[rng + xpos + 2][ypos + 1] = 1;
						currentRotation = 0;
					}
				}
				else if (rng == 1) {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 0][ypos + 2] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 0][ypos + 2] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = 1;
					}
				}
				else if (rng == 2) {
					rng  = Math.floor((Math.random() * 8));
					if (xpos >= 0) {
						rng = 0;
						xpos--;
						ypos++;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 2) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 1) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 0][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 2][ypos + 0] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 0][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 2][ypos + 0] = 1;
						currentRotation = 2;
					}
				}
				else {
					rng  = Math.floor((Math.random() * 9));
					if (xpos >= 0) {
						rng = 0;
						ypos--;
					}
					else {
						xpos = 0;
					}
					if (	(rng + xpos + 1) < 10 && 
						(rng + xpos + 0) >= 0 && 
						(ypos + 2) < 22 &&
						(ypos + 0) >= 0 &&
						grid[rng + xpos + 0][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 0] != 8 &&
						grid[rng + xpos + 1][ypos + 1] != 8 &&
						grid[rng + xpos + 1][ypos + 2] != 8) {
						for (var y = 0; y < 23; y++) {
							for (var x = 0; x < 10; x++) {
								if (grid[x][y] == 1) {
									grid[x][y] = 0;
								}
							}
						}
						grid[rng + xpos + 0][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 0] = 1;
						grid[rng + xpos + 1][ypos + 1] = 1;
						grid[rng + xpos + 1][ypos + 2] = 1;
						currentRotation = -1;
					}
				}
			}
			if (info == 1) {
				document.write("1-1-1<br>1<br>---");
			}
			if (info == 2) {
				document.write("1-1-1<br>1<br>")
			}
			break;	
	}		
}})();