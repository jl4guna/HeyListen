function Registrar() {
	var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios';
	$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify($('#formulario').serializeObject()),
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

$('#btnRegistrar').click(function(event) {
	event.preventDefault();
	if ($('#username').val() != '' && $('#email').val() != '' && $('#password').val() != '') {
		if ($('#password').val() === $('#password2').val()) {
			Registrar();
		}else {
			alertify.error("Las contraseñas no coinciden");
		}
	}else {
		alertify.error("Llena todos los campos");
	}

});
