document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#new").onsubmit = function() {
    let users_name = document.querySelector('#name').value;
    alert(users_name);
});
});

