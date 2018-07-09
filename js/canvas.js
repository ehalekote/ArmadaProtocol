var canvas = document.querySelector('canvas');
var ctx;
var image = new Image();

//------------------------Particle Background

var SEPARATION = 40, AMOUNTX = 130, AMOUNTY = 35;

var container;
var camera, scene, renderer;
/*

if (window.WebGLRenderingContext){
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	}
else {
	renderer = new THREE.CanvasRenderer();
	}
*/

var particles, particle, count = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

	init();
	animate();




// ctx = canvas.getContext('2d');
// ctx.font="20pt 'Roboto', sans-serif";
// ctx.textAlign = "center";
// ctx.fillStyle = "#302D2A";
// image.src = "/ArmadaProtocol/img/logo.png";
//ctx.fillText("Bundling the world's digital assets",window.innerWidth/2,415);
//
// image.onload = function(){
// 	ctx.drawImage(image, window.innerWidth/2-223, 75);
// };
//
// window.onresize= function(event){
// 	image.onload = function(){
// 		//ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		//ctx.drawImage(image, window.innerWidth/2-223, 75);
// 		//ctx.fillText("Bundling the world's digital assets",window.innerWidth/2,415);
// 	}
// };


function init() {
	container = document.createElement( 'div' );


	document.body.appendChild( container );
	if(container) {
    	container.className += container.className ? ' waves' : 'waves';
	}

	camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.y = 150; //changes how far back you can see i.e the particles towards horizon
	camera.position.z = 100; //This is how close or far the particles are seen

	camera.rotation.x = 0.35;

	scene = new THREE.Scene();

	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial( {

		color: 0x000000, //changes color of particles // gray:0x919191 // gold: E0A838
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 0.1, 0, PI2, true );
			context.fill();

		}

	} );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i ++ ] = new THREE.Sprite( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) - 10 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xffffff, 1);

	canvas = renderer.domElement;

	container.appendChild( renderer.domElement );

	var buttonDiv = document.createElement( 'div' );
	buttonDiv.className = 'buttonContainer';

	var downloadButton = document.createElement('button');
	downloadButton.type = 'button';
	downloadButton.className = 'btn btn-outline-warning titleButton downloadButton';
	downloadButton.innerHTML = "View One-Pager"
	downloadButton.style.marginLeft = '0px';
	downloadButton.style.marginRight = '40px';


	var EAButton = document.createElement('button');
	EAButton.type = 'button';
	EAButton.className = 'btn btn-outline-warning titleButton EAButton';
	EAButton.innerHTML = "Get Early Access"
	EAButton.style.marginRight = '0px';
	EAButton.style.marginLeft = '40px';

	var buttonHouse = document.createElement( 'div');
	buttonHouse.className = 'buttonHouse';

	buttonHouse.appendChild(EAButton);
	buttonHouse.appendChild(downloadButton);

	var mainText = document.createElement( 'div' );
	mainText.className = 'mainText';
	mainText.innerHTML = "Bundling the world's digital assets.";

	var mainLogo = document.createElement( 'div');
	mainLogo.className = 'mainLogo';
	var imgmainLogo = document.createElement( 'img' );
	imgmainLogo.src = "/ArmadaProtocol/img/logo.png";
	mainLogo.appendChild(imgmainLogo);

  buttonDiv.appendChild(mainLogo);
	buttonDiv.appendChild(mainText);
	buttonDiv.appendChild(buttonHouse);
	container.appendChild(buttonDiv);

	EAButton.onclick = function(){
  	$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		document.getElementById("exampleInputEmail1").focus();
	}

	downloadButton.onclick = function(){
		window.open("https://docs.google.com/document/d/1s7N_is68dbARNeZNjw0EAZyYc2W5d9AkaFWP1Bhl8wM/edit");
	}

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.5 ) * 20 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 20 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 2 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

		}

	}

	renderer.render( scene, camera );

	// This increases or decreases speed
	count += 0.2;

}




//------------------------
