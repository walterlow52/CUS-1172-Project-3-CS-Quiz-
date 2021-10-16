document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#new").onsubmit = function task_list() {
    let users_name = document.querySelector('#name').value;
    alert(users_name);
  }
});
});
