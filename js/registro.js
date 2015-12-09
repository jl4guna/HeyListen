function Registrar() {
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios';
	var formulario = {};
	formulario.username = $('#username').val();
	formulario.password = $('#password').val();
	formulario.email = $('#email').val();
	var data = JSON.stringify(formulario);
	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		contentType: "application/json;chartset=utf-8",
		statusCode: {
			201: function () {
				window.location.href = "index.html";
			},
			400: function () {
				alertify.error("Ocurrio un error");
			}
		}
	});
}

$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};


//Expresion regular para comprobar el email
var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
$("#btnRegistrar").click(function (event){
	event.preventDefault();
	//Comprueba que el campo nombre no este vacio
	if( $("#username").val() == "" ){
		$("#username").focus().after(alertify.error("Ingresa un nombre de usuario"));
		return false;
	}else if( $("#email").val() == "" || !emailreg.test($("#email").val()) ){ //comprueba que el campo email no este vacio y sea valido
		$("#email").focus().after(alertify.error("Ingresa un correo valido"));
		return false;
	}else if( $("#password").val() == ""){ //comprueba que el campo contraseña no este vacio
		$("#password").focus().after(alertify.error("Ingresa una contraseña"));
		return false;
	}else if ($('#password').val() != $('#password2').val()) { //comprueba que las contraseñas existan
		$("#password2").focus().after(alertify.error("Las contraseñas no coinciden"));
		return false;
	}
	Registrar();

});
