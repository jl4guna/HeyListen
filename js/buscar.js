"use strict";
function  BuscarSoundCloud(texto) {
	var url = 'http://api.soundcloud.com/tracks.json?client_id=a6c32f43a9c86c747d79943a65c389e5&q='+texto+'&limit=10';
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(tracks){
				$('#listaCancionesSC').empty();
				var canciones = "";
				$.each(tracks, function(i , track)
				{
						canciones += '<li class="estiloListas stroke"><img class="icon" src="http://lpdelche.com/hl/images/orange.png"/><a href="'+ track.permalink_url +'"><img onerror="imgRespaldo('+track.artwork_url+')" src="'+ track.artwork_url +'" />'+track.title+'</a></li><button thumbnail="'+ track.artwork_url +'" cancion="'+ track.title +'" url="'+ track.permalink_url +'" servicio="sc" class="guardar btnGuardar">Guardar</button>';
				});
				$('#listaCancionesSC').html(canciones);
      },
	});
}

function  BuscarYoutube(texto) {
	var url = 'https://www.googleapis.com/youtube/v3/search?q=' + texto + '&part=snippet&type=video&key=AIzaSyALOIAA9DP1cGxWMAmQYxFXX65lf6lfsbY';
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(tracks){
				$('#listaCancionesYT').empty();
				var canciones = "";
				$.each(tracks.items, function(i , track)
				{
						canciones +='<li class="estiloListas stroke"><img class="icon" src="http://lpdelche.com/hl/images/ftyt.png"/><a href="https://www.youtube.com/watch?v='+ track.id.videoId +'"><img onerror="imgRespaldo('+track.snippet.thumbnails.medium.url+')" src="'+track.snippet.thumbnails.medium.url+'" />'+track.snippet.title+'</a></li><button thumbnail="'+ track.snippet.thumbnails.medium.url +'" cancion="'+ track.snippet.title +'" url="https://www.youtube.com/watch?v='+ track.id.videoId +'" servicio="yt" class="guardar btnGuardar">Guardar</button>';
				});
				$('#listaCancionesYT').html(canciones);
      },
	});
}

function  BuscarSpotify(texto) {
	var url = 'https://api.spotify.com/v1/search?q='+ texto +'&type=track&market=MX&limit=10';
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(tracks){
				$('#listaCancionesSP').empty();
				var canciones = "";
				$.each(tracks.tracks.items, function(i , track)
				{
					 canciones +=	'<li class="estiloListas stroke"><img class="icon" src="http://lpdelche.com/hl/images/spotifyLogo.png"/><a href="'+ track.external_urls.spotify+'"><img src="'+track.album.images[1].url+'" />'+ track.name +'</a></li><button thumbnail="'+ track.album.images[1].url +'" cancion="'+ track.name +'" url="'+ track.external_urls.spotify +'" servicio="sp" class="guardar btnGuardar">Guardar</button>';
				});
				$('#listaCancionesSP').html(canciones);
      },
	});
}

function Guardar(id,titulo,powerBy, imagenSrc) {
	var url = 'http://heylistenapi.azurewebsites.net/canciones';
	var usuario = localStorage["a8d7f0a88sdfa7s0d8"];
	var data = {
		nombre : titulo,
		url : id,
		idUsuario : usuario,
		servicio : powerBy,
        imagen : imagenSrc
		}
	$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			contentType: "application/json;chartset=utf-8",
			statusCode: {
					success: function () {

					},
					error: function () {
							alertify.error("No se pudo guardar");
					}
			}
	});
    alertify.success("Cancion guardada");
}

function imgRespaldo(url){
	$('img[src='+url+']').attr('src', 'http://lpdelche.com/hl/images/ftyt.png');
}

$('ul').on('click', 'button', function(event) {
	event.preventDefault();
	var id = $(this).attr('url');
	var powerBy = $(this).attr('servicio');
	var titulo = $(this).attr('cancion').substring(0,50);
    var imagenSrc = $(this).attr('thumbnail');
	Guardar(id,titulo,powerBy, imagenSrc);
});

$(document).on('keyup', '#busqueda', function() {
  var texto = $('#busqueda').val();
	if (texto != "") {
		BuscarSoundCloud(texto);
		BuscarYoutube(texto);
		BuscarSpotify(texto);
	}
});
