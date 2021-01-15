const SelectedFractal = {
	type: ""
};

function kochSelectCheck(nameSelect)
{
    var val = nameSelect.options[nameSelect.selectedIndex].value;
    document.getElementById("KochDivCheck").style.display = val == '0' ? "block" : 'none';
	document.getElementById("Dragon_curve").style.display = val == '1' ? "block" : 'none';


	switch (val) {
		case '0':
			SelectedFractal.type = "koch";
		break;
		case '1':
			SelectedFractal.type = "dragon";
		break;
	}
}

//FOR CLEAR BUTTON
var canvas;
var ctx;

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("main-canvas");
    ctx = canvas.getContext("2d");
});

const Width = 513;
const Height = 513;
var MagnitudeMult = 1;
const MaxColor = 359;

window.ClearClick = () => {
	ctx.fillStyle = "#6C5CE7";
	ctx.fillRect(0, 0, Width, Height);
}


window.Render = () => {
	switch (SelectedFractal.type) {
		case "koch":
			 if (document.querySelector("#KochDivCheck>#IFS_choice").checked) {
				drawIFS(1);
			}
		break;

		case "dragon":
		 if (document.querySelector("#Dragon_curve>#IFS_choice").checked) {
				drawIFS(2);
			}
		break;
	}
}

document.getElementById('opacity-slider').addEventListener('input', function (e) {
	document.body.style.opacity = this.value;
});