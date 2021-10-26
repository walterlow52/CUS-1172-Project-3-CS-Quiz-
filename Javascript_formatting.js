document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    //alert(first_name + last_name);
      
};
});

/*document.addEventListener('DOMContentLoaded', () => {
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
      
    function updateDOM(data) {
     let image = data.results[0].picture.large;
     let email = data.results[0].email;
     let HTMLstring = `<img src = "${image}"> <br> Email: ${email}`;
     document.querySelector("#showdata").innerHTML = HTMLstring;
    }
  }
});*/

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
    
    var user_view = (quiz_id, quiz_model_Index, Model_, View_) => {
      console.log("Take Quiz view");
      var srce = document.querySelector(quiz_id).innerHTML;
      var quiz_template = Handlebars.compile(srce);
      var html = quiz_template(quiz_model[quiz_model_Index]);
      document.querySelector("#view_quiz").innerHTML = html;
      template_src = document.querySelector(View_).innerHTML
      var template = Handlebars.compile(template_src);
      var html_template = template({...Model_, ...quiz_application})
      return html_template
    }
    
    const quiz_application = {
      view: "#quizView",
      question: -1,
      model: {}
    }
    
document.addEventListener('DOMContentLoaded', () => {
  quiz_application.view = "#quizView";
  quiz_application.model = {
    action : "start"
  }
  update(quiz_application);
  document.querySelector("#quiz_view").onclick = (e) => {
      handle_quiz(e)
  }
});

function handle_quiz(e) {
  if (quiz_application.view == "#quizView") {
    if (e.target.dataset.action == "start") {
     quiz_application.question = 0
      quiz_application.model = questions[quiz_application.question];
      question_view(quiz_application);
      update(quiz_appplication);
    }
  }
  
  if (quiz_application.view == "#true/false_view") {
    if (e.target.dataset.action == "answerChoice") {
      correct = check_answer(e.target.dataset.answer, quiz_application.model);
      quiz_application.question = quiz_application.question + 1;
      quiz_application.model = questions[quiz_application.question];
      question_view(quiz_application);
      update(quiz_application);
    }
  }
  
  if (quiz_application.view == "#text_view") {
       if (e.target.dataset.action == "submit") {
     
           response = document.querySelector(`#${quiz_application.model.answerId}`).value;
           correct = check_answer(e.target.dataset.answerChoice, quiz_application.model);
           update_question(quiz_application);
           question_view(quiz_application);
           update(quiz_application);
       }
    }
  
  if (quiz_application.view == "#completion") {
    if (e.target.dataset.action == "start_again") {
      quiz_application.view = "#quizView";
      quiz_application.model = {
        action : "start"
      }
      update(quiz_application);
    }
  }
  
}

function check_answer (user_answer, user_model) {
  if (user_answer == user_model.answer) {
    return true;
  }
  return false;
}

function update_question () {
  if (quiz_application.question < questions.length-1) {
    quiz_applcation.question = quiz_application.question + 1;
    quiz_applicatoin.model = questions[quiz_application.question];
  }
  else {
    quiz_application.question = -2;
    quiz_application.model = {};
  }
}

function question_view(quiz_application) {
  if (quiz_application.question == -2) {
    quiz_application.view  = "#completion";
    return
  }

  if (quiz_application.model.type == "true_false")
    quiz_application.view = "#true/false_view";
  else if (quiz_application.model.type == "text") {
    quiz_application.view = "#text_view";
  }
}

function update(quiz_application) {
  const html_element = user_view(quiz_application.model, quiz_application.view)
  document.querySelector("#quiz_view").innerHTML = html_element;
}

/*const template_view = (Model_, View_) => {
  template_src = document.querySelector(View_).innerHTML
  var template = Handlebars.compile(template_src);
  var html_template = template({...Model_, ...quiz_application})
  return html_template
}*/
