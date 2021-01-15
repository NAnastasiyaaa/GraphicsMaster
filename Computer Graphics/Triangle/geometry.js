function Draw(){ 

  var x1=document.getElementById("x1").value;
  var y1=document.getElementById("y1").value;
  var x2=document.getElementById("x2").value;
  var y2=document.getElementById("y2").value;
  var x3=document.getElementById("x3").value;
  var y3=document.getElementById("y3").value;
  

  var koef1=document.getElementById("koef1").value;
  var koef2=document.getElementById("koef2").value;


  console.log(x1,y1,x2,y2,x3,y3);


  var my_triangle_matrix = [ [x1, y1, 1],
                             [x2, y2, 1],
                             [x3, y3, 1]
                           ];

 
  var mirror_matrix_triangle = getPointsOfTriangle(my_triangle_matrix,koef1,koef2);


  var myTriangele = { 
    x: [my_triangle_matrix[0][0], my_triangle_matrix[1][0], my_triangle_matrix[2][0], my_triangle_matrix[0][0]],
    y: [my_triangle_matrix[0][1], my_triangle_matrix[1][1], my_triangle_matrix[2][1], my_triangle_matrix[0][1]],
    name: 'Triangle',
    type: 'scatter',
    marker: {
      color: 'rgb(161, 35, 73)',
    },
    
  };


  var mirrorTriangle = { 
    x: [mirror_matrix_triangle[0][0], mirror_matrix_triangle[1][0], mirror_matrix_triangle[2][0], mirror_matrix_triangle[0][0]],
    y: [mirror_matrix_triangle[0][1], mirror_matrix_triangle[1][1], mirror_matrix_triangle[2][1], mirror_matrix_triangle[0][1]],
    name: 'MirrorTriangle',
    type: 'scatter',
    marker: {
      color: 'rgb(12, 130, 61)',
    }
  };
  var data = [myTriangele, mirrorTriangle];


 var layout = {
  
  width: 600,
  height: 500,

 
  margin: {
    l: 40,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  paper_bgcolor: '#9086dd',
  
};

  Plotly.newPlot('myDiv', data, layout);

}


function getPointsOfTriangle(my_triangle_matrix, x_zoom, y_zoom)
{
    var mirror_matrix = [ [ -1, 0, 0],
                  [ 0, -1, 0],
                  [ 0, 0,  1]
              ];

    var zoom_matrix = [ [ x_zoom, 0, 0],
                [ 0, y_zoom, 0],
                    [ 0,   0,    1]
                  ];

    var transformation_matrix = multipleMatrixes(mirror_matrix ,zoom_matrix);
    var mirror_matrix_triangle = multipleMatrixes(my_triangle_matrix, transformation_matrix);
    
    return mirror_matrix_triangle;

    function multipleMatrixes( firstMatrix, secondMatrix )
    {
            var result = [[],[],[]];
            result[0][0] = firstMatrix[0][0]*secondMatrix[0][0] + firstMatrix[0][1]*secondMatrix[1][0] + firstMatrix[0][2]*secondMatrix[2][0];  
            result[0][1] = firstMatrix[0][0]*secondMatrix[0][1] + firstMatrix[0][1]*secondMatrix[1][1] + firstMatrix[0][2]*secondMatrix[2][1];
            result[0][2] = firstMatrix[0][0]*secondMatrix[0][2] + firstMatrix[0][1]*secondMatrix[1][2] + firstMatrix[0][2]*secondMatrix[2][2];

            result[1][0] = firstMatrix[1][0]*secondMatrix[0][0] + firstMatrix[1][1]*secondMatrix[1][0] + firstMatrix[1][2]*secondMatrix[2][0];  
            result[1][1] = firstMatrix[1][0]*secondMatrix[0][1] + firstMatrix[1][1]*secondMatrix[1][1] + firstMatrix[1][2]*secondMatrix[2][1];
            result[1][2] = firstMatrix[1][0]*secondMatrix[0][2] + firstMatrix[1][1]*secondMatrix[1][2] + firstMatrix[1][2]*secondMatrix[2][2];

            result[2][0] = firstMatrix[2][0]*secondMatrix[0][0] + firstMatrix[2][1]*secondMatrix[1][0] + firstMatrix[2][2]*secondMatrix[2][0];  
            result[2][1] = firstMatrix[2][0]*secondMatrix[0][1] + firstMatrix[2][1]*secondMatrix[1][1] + firstMatrix[2][2]*secondMatrix[2][1];
            result[2][2] = firstMatrix[2][0]*secondMatrix[0][2] + firstMatrix[2][1]*secondMatrix[1][2] + firstMatrix[2][2]*secondMatrix[2][2];

            return result;
    }
}