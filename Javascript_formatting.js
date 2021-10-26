document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    //alert(first_name + last_name);
      
};
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#fetch").onsubmit = () => {
    fetch('https://www.ixl.com/math/grade-4/identify-place-value-names').then(
    (response) => {
      return response.json()
    }
  ).then((data) => {
      updateDOM(data);
  }
).catch( (err) => {
  console.error(err);
}
)
      
    /*function updateDOM(data) {
     let image = data.results[0].picture.large;
     let email = data.results[0].email;
     let HTMLstring = `<img src = "${image}"> <br> Email: ${email}`;
     document.querySelector("#showdata").innerHTML = HTMLstring;
    }*/
  }
});

 var quiz_model = [
      {
        name: "Quiz 1",
        message: "Welcome to Quiz 1! You may begin!"
      },
      {
        name: "Quiz 2",
        message: "Welcome to Quiz 2! You may begin!"
      }
    ];
    
    var user_view = (quiz_id, quiz_model_Index) => {
      console.log("Take Quiz view");
      var srce = document.querySelector(quiz_id).innerHTML;
      var quiz_template = Handlebars.compile(srce);
      var html = quiz_template(quiz_model[quiz_model_Index]);
      document.querySelector("#view_quiz").innerHTML = html;
    }
