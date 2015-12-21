"use strict";
function  Cargar() {
	var id = localStorage["a8d7f0a88sdfa7s0d8"];
	var url = 'http://heylistenapi.azurewebsites.net/canciones/'+id;
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(tracks){
				$('#listaCanciones').empty();
				var canciones = "";
				$.each(tracks.canciones, function(i , track)
				{
						canciones += '<li class="estiloListas stroke" cancion="'+ track.id +'"><a href="'+ track.url +'">'+track.nombre+'</a></li><button cancion="'+ track.id +'" class="guardar btnGuardar">Eliminar</button>';
				})
				$('#listaCanciones').html(canciones);
      },
	});
}

function Eliminar(id) {
	var url = 'http://heylistenapi.azurewebsites.net/canciones/'+id;
	$.ajax({
			url: url,
			type: 'DELETE',
			contentType: "application/json;chartset=utf-8",
			statusCode: {
					success: function () {
							$('li[cancion='+id+'],button[cancion='+id+']').remove();
					},
					error: function () {
							alertify.error("No se puedo eliminar");
					}
			}
	});
    $('li[cancion='+id+'],button[cancion='+id+']').remove();
	alertify.success("Cancion eliminada");
}

$('ul').on('click', 'button', function(event) {
		event.preventDefault();
		var id = $(this).attr('cancion');
		alertify.confirm("¿Estas seguro?", function (e) {
	    if (e) {
	      	Eliminar(id);
	    }
		});

});

$(document).ready(function() {
  Cargar();
});
