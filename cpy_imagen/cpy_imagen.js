var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;


document.getElementById('cargar').addEventListener('change', ponerImagen);


function prepararResultados()
{ 
	lienzoResultado = document.getElementById('canvas2');
  	ctxResultado = lienzoResultado.getContext('2d');
  	lienzoResultado.height = lienzoOrigen.height;
  	lienzoResultado.width = lienzoOrigen.width;
  	imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height); 
  	imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}


function ponerImagen(e)
{      
	var archivo = e.target.files[0];
  	if(archivo)
	{        
    		var lector = new FileReader();
    		lector.readAsDataURL(archivo);         
    		lector.onload = function(event)
		{
			ponerImgEnCanvas(event.target.result);
    		}
  	}
}


function ponerImgEnCanvas(datosImg)
{  
	var img = new Image();
  	img.src = datosImg;
  	img.onload = function()
	{
    		lienzoOrigen = document.getElementById('canvas');
    		ctxOrigen = lienzoOrigen.getContext('2d');
    		lienzoOrigen.width=img.width;
    		lienzoOrigen.height=img.height;
    		ctxOrigen.drawImage(img, 0, 0);
    		prepararResultados();
  	}
}


function copiar()
{   
	var i;

  	for (i = 0; i < imgOrigen.data.length; i+=4)
	{
		imgResultado.data[i+0] = imgOrigen.data[i+0];
      		imgResultado.data[i+1] = imgOrigen.data[i+1];
      		imgResultado.data[i+2] = imgOrigen.data[i+2];
      		imgResultado.data[i+3] = imgOrigen.data[i+3];
  	}
	ctxResultado.putImageData(imgResultado, 0, 0);
}


function CanalRojo()
{  
	var i;

	for (i = 0; i < imgOrigen.data.length; i+=4)
	{

        	imgResultado.data[i+0] = imgOrigen.data[i+0];
	        imgResultado.data[i+1] = 0;
     	 	imgResultado.data[i+2] = 0;
     	 	imgResultado.data[i+3] = imgOrigen.data[i+3];
  	}
	ctxResultado.putImageData(imgResultado, 0, 0);
}


function CanalVerde(){   
  var i;

	for (i = 0; i < imgOrigen.data.length; i+=4){

      		imgResultado.data[i+0] = 0;
		imgResultado.data[i+1] = imgOrigen.data[i+1];
      		imgResultado.data[i+2] = 0;
      		imgResultado.data[i+3] = imgOrigen.data[i+3];
  	}
  	ctxResultado.putImageData(imgResultado, 0, 0);

}


function CanalAzul()
{   
	var i;

	for (i = 0; i < imgOrigen.data.length; i+=4)
	{
		imgResultado.data[i+0] = 0;
      		imgResultado.data[i+1] = 0;
      		imgResultado.data[i+2] = imgOrigen.data[i+2];
      		imgResultado.data[i+3] = imgOrigen.data[i+3];
  	}
  	ctxResultado.putImageData(imgResultado, 0, 0);
}


function EscalaGrises()
{   
	var i;
  
	for (i = 0; i < imgOrigen.data.length; i+=4)
	{
		var promedio = (imgOrigen.data[i+0]+imgOrigen.data[i+1]+imgOrigen.data[i+2])/3;

           	imgResultado.data[i+0] = promedio;
           	imgResultado.data[i+1] = promedio;
           	imgResultado.data[i+2] = promedio;
           	imgResultado.data[i+3] = imgOrigen.data[i+3];
      	}
  	ctxResultado.putImageData(imgResultado, 0, 0);

}


function BlancoNegro()
{
	var i;
  
	for (i = 0; i < imgOrigen.data.length; i+=4)
	{
		var promedio = (imgOrigen.data[i+0]+imgOrigen.data[i+1]+imgOrigen.data[i+2])/3;
		
		if (promedio < 127)
		{
           		imgResultado.data[i+0] = 0;
           		imgResultado.data[i+1] = 0;
           		imgResultado.data[i+2] = 0;
           		imgResultado.data[i+3] = imgOrigen.data[i+3];
		}

		else if(promedio >= 127)
		{
           		imgResultado.data[i+0] = 255;
           		imgResultado.data[i+1] = 255;
           		imgResultado.data[i+2] = 255;
           		imgResultado.data[i+3] = imgOrigen.data[i+3];
		}
      	}
  	ctxResultado.putImageData(imgResultado, 0, 0);
	
}



//para escala de grises una tecnica es sacar promedio de los tres colores
//si hay la misma cantidad es los tres canales es un tipo de gris
