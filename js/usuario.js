function Actualizar() {
	var id = localStorage["usuario"];
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios/'+id;
	var formulario = {};
	formulario.UsuarioID = id;
	formulario.username = $('#username').val();
	formulario.password = $('#password').val();
	formulario.email = $('#email').val();
	console.log(formulario);
	var data = JSON.stringify(formulario);
	console.log(data);
	$.ajax({
			url: url,
			type: 'PUT',
			data: data,
			contentType: "application/json;chartset=utf-8",
			statusCode: {
					204: function () {
							window.location.href = "canciones.html";
					},
					400: function () {
							console.log('error');
					}
			}
	});
}

function  Cargar() {
	var id = localStorage["usuario"];
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios/'+id;
	$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json;chartset=utf-8",
			success: function(usuario){
				$('#username').val(usuario.username);
				$('#password').val(usuario.password);
				$('#email').val(usuario.email);
      },
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

$('#btnActualizar').click(function(event) {
	event.preventDefault();
	if ($('#username').val() != '' && $('#email').val() != '' && $('#password').val() != '') {
			Actualizar();
	}else {
		console.log('rellena todos los campos');
	}

});

$(document).ready(function() {
  Cargar();
});
