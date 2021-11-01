document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    //alert(first_name + last_name);
};
});

document.addEventListener('DOMContentLoaded', function() {
  fetch_data(1)
});

const fetch_data = async () => {
  const data = await fetch("https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3/db")
  const model_ = await data.json()
  const html_element = template_view(model_, '#view_quiz')
  document.querySelector("#fetchData").innerHTML = html_element;
}

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
    
    function display(data) {
      let question_type = data.questions[0].question;
      let question_answers = data.questions[0].choices;
      let HTMLstring = `<h3> ${question_type} </h3> <br> <h4> ${question_answers} </h4>`;
      document.querySelector("#showdata").innerHTML = HTMLstring;
    }

    const quiz_application = {
      view: "#view_quiz",
      question_i: -1,
      model: {}
    }
    
    //const quiz_questions = JSON.parse('{"questions": ["type", "question", "answer", "choices"] }');
    
document.addEventListener('DOMContentLoaded', () => {
  quiz_application.view = "#view_quiz";
  quiz_application.model = {
    action : "start"
  }
  update(quiz_application);
  document.querySelector("#quiz_view").onclick = (e) => {
      handle_quiz(e)
  }
});

function handle_quiz(e) {
  if (quiz_application.view == "#view_quiz") {
    if (e.target.dataset.action == "start") {
     quiz_application.question_i = 0
      quiz_application.model = data[quiz_application.question_i];
      question_view(quiz_application);
      update(quiz_application);
    }
  }
  
  if (quiz_application.view == "#true/false_view") {
    if (e.target.dataset.action == "answerChoice") {
      correct = check_answer(e.target.dataset.answer, quiz_application.model);
      quiz_application.question_i = quiz_application.question_i + 1;
      quiz_application.model = questions[quiz_application.question_i];
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
      quiz_application.view = "#view_quiz";
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

function update_question (quiz_application) {
  if (quiz_application.question_i < questions.length-1) {
    quiz_application.question_i = quiz_application.question_i + 1;
    quiz_application.model = questions[quiz_application.question_i];
  }
  else {
    quiz_application.question_i = -2;
    quiz_application.model = {};
  }
}

function question_view(quiz_application) {
  if (quiz_application.question_i == -2) {
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
  const html_element = template_view(quiz_application.model, quiz_application.view)
  document.querySelector("#quiz_view").innerHTML = html_element;
}

const template_view = (model, view) => {
  template_src = document.querySelector(view).innerHTML
  var template = Handlebars.compile(template_src);
  var html_template = template({...model, ...quiz_application})
  return html_template
}
