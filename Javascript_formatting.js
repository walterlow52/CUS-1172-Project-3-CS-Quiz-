document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
  
    var question1_Str = JSON.stringify(question_1);
    console.log(question1_Str);
    
  /*document.addEventListener('click', function(event) {
  element = event.target;
  if (element.idName === 'remove') {
    
  }*/
    
   /* function get_API_data () {
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
    
    function updateDOM(data) {
      let image = data.results[0].picutre.large;
      let email = data.results[0].email;
      let HTMLstring = `<img src = "${image}"> <br> Email: ${email}`;
      document.querySelector("#data").innerHTML = HTMLstring;
    }*/
    
    //var template = Handlebars.template(templateSpec);
};
});

