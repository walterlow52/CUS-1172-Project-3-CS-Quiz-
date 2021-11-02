document.addEventListener('DOMContentLoaded', function() {
  document.querySelector("#project").onsubmit = function() {
    let first_name = document.querySelector('#fname').value;
    let last_name = document.querySelector('#lname').value;
    //alert(first_name + last_name);
    fetch_data(1);
    user_view();
};
});

/*const fetch_data = async () => {
  const data = await fetch("https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3/db")
  const model_ = await data.json()
  const html_element = template_view(model_, '#view_intro')
  document.querySelector("#fetchData").innerHTML = html_element;
}*/

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
      document.querySelector("#view_intro").innerHTML = html;
    }
    
  const fetch_data = async () => {
  const data = await fetch("https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3/db")
  const module = await data.json()
  const html_element = template_view(module, '#view_intro')
  document.querySelector("#fetchData").innerHTML = html_element;
   // display(module);
  }
  
  /*function display() {
    let quiz_text = module.choices[0].question;
    let quiz_pick = module.choices[0].choices;
    let quiz_answer = module.choices[0].answer;
    let HTMLstring = `<h3> ${quiz_text} <br> </h3> <h4> ${quiz_pick} <br> ${quiz_answer} </h4>`;
    document.querySelector("#showdata").innerHTML = HTMLstring;*/
  }

    const quiz_application = {
      view: "#view_intro",
      question_i: -1,
      model: {}
    }
    
    //const quiz_questions = JSON.parse('{"questions": ["type", "question", "answer", "choices"] }');
    
document.addEventListener('DOMContentLoaded', function() {
  quiz_application.view = "#view_intro";
  quiz_application.model = {
    action : "start"
  }
  update(quiz_application);
  document.querySelector("#quiz_view").onclick = (e) => {
      handle_quiz(e)
  }
});

function handle_quiz(e) {
  if (quiz_application.view == "#view_intro") {
    if (e.target.dataset.action == "start") {
     quiz_application.question_i = 0
      quiz_application.model = JSON.parse(questions[quiz_application.question_i]);
      question_view(quiz_application);
      update(quiz_application);
    }
  }
  
  if (quiz_application.view == "#true/false_view") {
    if (e.target.dataset.action == "answer") {
      correct = check_answer(e.target.dataset.answer, quiz_application.model);
      quiz_application.question_i = quiz_application.question_i + 1;
      quiz_application.model = JSON.parse(questions[quiz_application.question_i]);
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
  
  if (quiz_application.view == "MC_view") {
    if (e.target.dataset.action == "answer") {
      correct = check_answer(e.target.dataset.answer, quiz_application.model);
      quiz_application.question_i = quiz_application.question_i + 1;
      quiz_application.model = JSON.parse(questions[quiz_application.question_i]);
      question_view(quiz_application);
      update(quiz_application);
    }
  }
  
  if (quiz_application.view == "#completion") {
    if (e.target.dataset.action == "start_again") {
      quiz_application.view = "#view_intro";
      quiz_application.model = {
        action : "start"
      }
      update(quiz_application);
    }
  }
  
}

function check_answer (answer, model) {
  if (answer == model.answer) {
    return true;
  }
  return false;
}

function update_question (quiz_application) {
  if (quiz_application.question_i < questions.length - 1) {
    quiz_application.question_i = quiz_application.question_i + 1;
    quiz_application.model = JSON.parse(questions[quiz_application.question_i]);
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
  else if (quiz_application.model.type == "text") 
    quiz_application.view = "#text_view";
  else if (quiz_application.model.type == "MC")  
    quiz_application.view = "#MC_view";
    
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

