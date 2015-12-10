"use strict";

(function () {

  function BuscarCancion(texto) {
    alertify.success('Buscando: ' + texto);
    BuscarSoundCloud(texto);
    BuscarYoutube(texto);
    BuscarSpotify(texto);
  }

  function noReconocido() {
    alertify.error('Disculpa, no entendí.');
  }

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      '*cancion': function (cancion) {
        BuscarCancion(cancion);
      },

      ':nomatch': function (message) {
        noReconocido();
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    $('#voz').click(function(){
        annyang.start({ autoRestart: false });
        alertify.success('Escuchando...');
    });
    
  }

})();
