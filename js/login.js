		function Entrar(username,password){
			var url = 'http://heylisten20151203051142.azurewebsites.net/api/usuarios';
			 $.ajax({
					url: url,
					type: 'GET',
					contentType: "application/json; charset=utf-8",
					success: function(usuarios){
						$.each(usuarios, function(i , usuario)
						{
							if(username == usuario.username && password == usuario.password)
							{
                localStorage["usuario"] = usuario.UsuarioID;
								window.location.href = "lista.html";
							}else{
								$('#errorContraseña').empty();
								$('#errorContraseña').append('<li class="rojo">Usuario y/o Contraseña incorrecta</li>');
							}
						});
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
	if (localStorage["usuario"]) {
		window.location.href = "lista.html";
	}
});
