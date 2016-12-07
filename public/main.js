window.onload = function () {

var track = new Audio('track.mp3');
track.type= 'audio/mpeg';

document.getElementById("button").onclick =  function ( e ) {

	console.log('play')

	setInterval(draw, 33);

	setTimeout( function () {
		track.play();
	}, 3000);

	e.target.style.opacity = 0;

	setTimeout( function () {
		e.target.parentNode.removeChild(e.target);
	}, 10000);

};

track.oncanplay = function ( e ) {
	console.log('can play')
	button.style.color = "white"
}


	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 50; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: (Math.random() -1)*H, //y-coordinate
			r: Math.random()*40+40, //radius
			d: Math.random()*mp, //density
			a: Math.random()*0.7+0.3
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
		    ctx.fillStyle = 'rgba(225,225,225,'+ p.a + ')';
			ctx.font = p.r + "px serif";
			ctx.fillText("*", p.x, p.y);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += ( Math.cos(angle+p.d) + 1 + p.r/2 ) * 0.1;
			p.x += Math.sin(angle) * 2 + Math.sin(angle*3) * 2 / 3 + Math.sin(angle*5) * 2 / 5;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+80 || p.x < -80 || p.y > H+80)
			{
				if(i%20 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -80, r: p.r, d: p.d, a: p.a};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, a: p.a};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, a: p.a};
					}
				}
			}
		}
	}

}