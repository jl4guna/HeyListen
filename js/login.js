"use strict";
function Entrar(username,password){
	var url = 'http://heylistenapi.azurewebsites.net/usuarios/login/' + username;
	$.ajax({
		url: url,
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		success: function(usuarios){

				var usuario = usuarios.usuarios[0];
				if(username === usuario.nombre && password === usuario.contrasena)
				{
					localStorage["a8d7f0a88sdfa7s0d8"] = usuario.id;
                    localStorage["465fg65f7g6d8s8s6a8s"] = usuario.nombre;
					window.location.href = "canciones.html";
				}else{
					$('#errorContraseña').empty();
					$('#errorContraseña').append('<li class="rojo">Usuario y/o Contraseña incorrecta</li>');
				}
		}
	});

}

$('#entrar').click(function(event) {
	event.preventDefault();
	var username = $('#username').val();
	var password = $('#password').val();
	if (username != '' && password != '') {
		Entrar(username,password);
	}else {
		alertify.error("Rellena todos los campos");
	}

});
$(document).ready(function() {
	if (localStorage["a8d7f0a88sdfa7s0d8"]) {
		window.location.href = "lista.html";
	}
});
