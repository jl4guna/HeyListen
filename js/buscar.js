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
						canciones += '<li class="estiloListas stroke"><img class="icon" src="images/sc.ico"/><a href="'+ track.permalink_url +'"><img src="'+ track.artwork_url +'" />'+track.title+'</a></li><button cancion="'+ track.title +'" url="'+ track.permalink_url +'" class="guardar btnGuardar">Guardar</button>';
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
						canciones +='<li class="estiloListas stroke"><img class="icon" src="images/ftyt.png"/><a href="https://www.youtube.com/watch?v='+ track.id.videoId +'"><img src="'+track.snippet.thumbnails.medium.url+'" />'+track.snippet.title+'</a></li><button cancion="'+ track.snippet.title +'" url="https://www.youtube.com/watch?v='+ track.id.videoId +'" class="guardar btnGuardar">Guardar</button>';
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
					 canciones +=	'<li class="estiloListas stroke"><img class="icon" src="images/spotifyLogo.png"/><a href="'+ track.external_urls.spotify+'">'+ track.name +'</a></li><button cancion="'+ track.name +'" url="'+ track.external_urls.spotify +'" class="guardar btnGuardar">Guardar</button>';
				});
				$('#listaCancionesSP').html(canciones);
      },
	});
}

function Guardar(id,titulo) {
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/cancions';
	var usuario = localStorage["usuario"];
	var data = {
		nombre : titulo,
		url : id,
		UsuarioID : usuario
		}

	$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			contentType: "application/json;chartset=utf-8",
			statusCode: {
					201: function () {
							alertify.success("Cancion guardada");
					},
					400: function () {
							alertify.error("No se pudo guardar");
					}
			}
	});
}

$('ul').on('click', 'button', function(event) {
	event.preventDefault();
	var id = $(this).attr('url');
	var titulo = $(this).attr('cancion').substring(0,50);
	Guardar(id,titulo);
});

$(document).on('keyup', '#busqueda', function() {
  var texto = $('#busqueda').val();
	if (texto != "") {
		BuscarSoundCloud(texto);
		BuscarYoutube(texto);
		BuscarSpotify(texto);
	}
});
