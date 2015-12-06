$('#logout').on('click', function(event) {
  event.preventDefault();
  console.log('logout');
  localStorage.clear();
  window.location.href = "index.html";
});
