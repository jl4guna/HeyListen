"use strict";
function Actualizar() {
	var id = localStorage["a8d7f0a88sdfa7s0d8"];
	var url = 'http://heylistenapi.azurewebsites.net/usuarios/' + id;
	var formulario = {};
    formulario.usuarios = {};
	formulario.usuarios.id = id;
	formulario.usuarios.nombre = $('#username').val();
	formulario.usuarios.contrasena = $('#password').val();
	formulario.usuarios.correo = $('#email').val();
	var data = JSON.stringify(formulario);
    console.log(data);
	$.ajax({
		url: url,
		type: 'PUT',
		data: data,
		contentType: "application/json;chartset=utf-8",
		statusCode: {
			success: function () {

			},
			error: function () {
				alertify.error("Ocurrio un error");
			}
		}
	});
	alertify.success("Informacion Actualizada");
}

function  Cargar() {
	var nombre = localStorage["465fg65f7g6d8s8s6a8s"];
	var url = 'http://heylistenapi.azurewebsites.net/usuarios/login/' + nombre;
	$.ajax({
		url: url,
		type: 'GET',
		contentType: "application/json;chartset=utf-8",
		success: function(usuarios){
            var usuario = usuarios.usuarios[0];
			$('#username').val(usuario.nombre);
			$('#password').val(usuario.contrasena);
			$('#email').val(usuario.correo);
		},
	});
}


var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
$("#btnActualizar").click(function (event){
	event.preventDefault();
	if( $("#username").val() == "" ){
		$("#username").focus().after(alertify.error("Ingresa un nombre de usuario"));
		return false;
	}else if( $("#email").val() == "" || !emailreg.test($("#email").val()) ){
		$("#email").focus().after(alertify.error("Ingresa un correo valido"));
		return false;
	}else if( $("#password").val() == ""){
		$("#password").focus().after(alertify.error("Ingresa una contraseña"));
		return false;
	}else if ($('#password').val() != $('#password2').val()) {
		$("#password2").focus().after(alertify.error("Las contraseñas no coinciden"));
		return false;
	}
	Actualizar();

});

$(document).ready(function() {
	Cargar();
});
