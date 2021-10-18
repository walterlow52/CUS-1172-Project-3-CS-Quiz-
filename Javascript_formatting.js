document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    
    function get_API_data () {
      fetch('https://my-json-server.typicode.com/%3Cwalterlow52%3E/%3CCUS-1172-Project-3%3E').then(
        (response) => {
         return response.json();   
        }
        ).then(
        (data) => {
         updateDOM(data); 
        }
        
        ).catch(
          (err) => {
           console.error(err); 
          }
        )
    }
    
    var template = Handlebars.template(templateSpec);
};
});

