$('#logout').on('click', function(event) {
  event.preventDefault();
  alertify.success("Hasta luego :)");
  localStorage.clear();
  window.location.href = "index.html";
});
