Math.SQRT3 = Math.sqrt(3);
Math.SQRT2=Math.sqrt(2);

var barnsley = [
    [0, 0, 0, 0.16, 0, 0, 0.01], // p = density
    [0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85], // B, -C = angle; // F = length // p = density
    [0.2,-0.26, 0.23, 0.22, 0, 1.6, 0.07], // F = length
    [-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07] // F = length
];
          

var koch = [
    [1/3, 0, 0, 1/3, 0, 0, 0.25],
    [1/6, -Math.SQRT3 / 6, Math.SQRT3 / 6, 1/6, 1/3, 0, 0.25],
    [1/6, Math.SQRT3 / 6, - Math.SQRT3 / 6, 1/6, 1/2, Math.SQRT3 / 6, 0.25],
    [1/3, 0, 0, 1/3, 2/3, 0, 0.25]
];


var dragon = [
    [1/2, -1/2, 1/2, 1/2, 0, 0, 0.5],
    [-1/2, -1/2, 1/2, -1/2, 1, 0, 0.5],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

var ferns = [barnsley, koch, dragon];

var affines = []; // An array of matrices. Goes with the probs array
var points; // The actual points that are plotted
var Fractal; // Fractal values
var c, ctx; // The canvas and context objects
var probs; // Array of cumulative probabilities, for each of the matrices in affines.

var f = {}; //Fractal object

var FractalType = 2;
var NumOfPoints = 100000;

window.drawIFS = function(type) {
	FractalType = type;
	switch (type) {
		case 0:
			this.NumOfPoints = 100000;
		break;
		case 1:
			NumOfPoints = Number.parseFloat($("koch_param").value);
		break;
		case 2:
			NumOfPoints = Number.parseFloat($("dragon_param").value);
		break;
	}
	init();
	MakeFractal();
	GeneratePoints();
}

function $(id) {
    	return (document.getElementById(id));
}

function ScaleArray(a, Multiplier) {
	let i, j=a.length;
	for (i=0; i<j; i++) {
		a[i] = a[i]*Multiplier;	
	}
}

function MakeFractal() {
	f.xmin = 0;
	f.xmax = 0;
	f.ymin = 0;
	f.ymax = 0;
	let i, j, r;

	Fractal = [[0, 0]];
	MakeMatrices();

	let options = probs.length -1;
	f.npoints = NumOfPoints;

	for (i = 1; i < f.npoints; ++i) {
		r=Math.random();
		for (j=0; j<options; ++j) {
            if (probs[j]<=r && r<probs[j+1]) {
                AffineTransform(affines[j]);
                //Fractal[i][2] = probs[j+1];
                break;
            }
        }
		if(Fractal[i][0] < f.xmin) {f.xmin = Fractal[i][0];}
		if(Fractal[i][1] < f.ymin) {f.ymin = Fractal[i][1];}
		if(Fractal[i][0] > f.xmax) {f.xmax = Fractal[i][0];}
		if(Fractal[i][1] > f.ymax) {f.ymax = Fractal[i][1];}
	}
}

function init() { //Gets things ready.
	c = $("main-canvas");
	ctx = c.getContext("2d");

	c.width = 513;
	c.height = 513;
}

function GeneratePoints() { //Turns the fractal into an array of points to plot, called 'points'
	"use strict";

	let x, y, k, l = f.npoints;

	let coords = [];
	points = [];
	for (let i = 0; i < c.width ; i++) {
	    coords[i] = [];
	}
	
	console.log(`${f.ymax}; ${f.ymin}`);

	if (FractalType == 0) {
		f.ymax = 12;
	}

	let fwidth = f.xmax - f.xmin;
	let fheight = f.ymax - f.ymin;

	let xratio = (c.width / fwidth);
	let yratio = (c.height / fheight);
	let xmid = f.xmin + fwidth/2;

	let factor = (xratio < yratio) ? xratio : yratio;

	for (k=0 ; k<l; k++) {
		x = Math.round((Fractal[k][0] - xmid) * factor + (c.width/2) );
		y = Math.round((Fractal[k][1] - f.ymin) * factor);
		
        if (0 <= x && x < c.width && 0 <= y && y < c.height) {
            !(coords[x][y]) ? coords[x][y] = 1 : coords[x][y]++;
        }
	}

	let i, j = coords.length, m = 0;
	for (i = 0; i < j; i++) {
		let k = coords[i].length;
		if (k == 0) continue;
		for (l=0; l < k; l++) {
			if (coords[i][l]) {points[m] = [i,l]; m++;}
		}
	} 

	PlotPoints();
}

function PlotPoints() {
    ctx.fillStyle = "#454599";
    ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "white";

	let i, j = points.length;
	for (i=0; i < j; i++) {
		ctx.fillRect(points[i][0], c.height - points[i][1], 1 , 1);
	}
}


function AffineTransform(Matrix){ //Uses the last element of the fractal array and the matrix to make a new element
    /*
    [a, b] X [x[i-1]] + [e] = x[i]
    [c, d]   [y[i-1]]   [f]   y[i]
    */

	let i = Fractal.length;
	Fractal[i] = [
        (Matrix[0]*Fractal[i-1][0]) + (Matrix[1]*Fractal[i-1][1]) + Matrix[4],
        (Matrix[2]*Fractal[i-1][0]) + (Matrix[3]*Fractal[i-1][1]) + Matrix[5]
    ];
}


function MakeMatrices() { // Init matrices
	"use strict";

	probs = [0];
    
    for (let i = 0; i < 4; ++i) {
        affines[i] = new Array();
        for (let j = 0; j < 6; ++j) {
            affines[i][j] = ferns[FractalType][i][j];
        }
        probs[i+1] = probs[i] + ferns[FractalType][i][6];
	}
	

}

