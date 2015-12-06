function  Cargar() {
	var id = localStorage["usuario"];
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios/'+id;
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(tracks){
				$('#listaCanciones').empty();
				var canciones = "";
				$.each(tracks.cancion, function(i , track)
				{
						canciones += '<li class="estiloListas stroke" cancion="'+ track.CancionID +'"><img class="icon" src="images/scico.png"/><a href="'+ track.url +'">'+track.nombre+'</a></li><button cancion="'+ track.CancionID +'" class="guardar btnGuardar">Eliminar</button>';
				})
				$('#listaCanciones').html(canciones);
      },
	});
}

function Eliminar(id) {
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/cancions/'+id;
	$.ajax({
			url: url,
			type: 'DELETE',
			contentType: "application/json;chartset=utf-8",
			statusCode: {
					200: function () {
							console.log('Cancion Eliminada');
							$('li[cancion='+id+'],button[cancion='+id+']').remove();
					},
					400: function () {
							console.log('No se pudo eliminar');
					}
			}
	});
}

$('ul').on('click', 'button', function(event) {
	event.preventDefault();
	var id = $(this).attr('cancion');
	Eliminar(id);
});

$(document).ready(function() {
  Cargar();
});
