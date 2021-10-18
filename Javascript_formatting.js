document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    
    function get_API_data () {
      fetch('https://randomuser.me/api/').then(
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

